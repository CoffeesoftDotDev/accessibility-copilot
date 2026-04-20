---
description: "Scheduled neuro-inclusive accessibility audit of the full repository"

on:
  workflow_dispatch:
    inputs:
      target_url:
        description: "URL to audit with Playwright (leave empty to skip E2E)"
        required: false
        type: string
      target_scope:
        description: "Directory scope to audit (default: src/)"
        required: false
        type: string
        default: "src/"
      primary_flows:
        description: "Comma-separated user flows to analyze (e.g., Checkout, Profile Setup)"
        required: false
        type: string
  schedule: weekly on monday
  reaction: "rocket"
  status-comment: true

permissions:
  contents: read
  issues: read

tools:
  github:
    toolsets: [repos, issues]
  playwright:
  edit:
  bash: ["cat", "ls", "find", "grep", "head", "tail", "wc", "sort", "date"]
  web-fetch:

safe-outputs:
  create-issue:
    title-prefix: "[A11Y Audit] "
    labels: [neurodiversity-check, accessibility, audit-report]
    max: 20
    group: true
    close-older-issues: true
---

# Full Repository Neuro-Inclusive Accessibility Audit

You are a neuro-inclusive accessibility auditor. Perform a comprehensive audit of this repository, producing a structured report and actionable backlog issues.

## Context & References

Read these files for your audit framework:
- `.github/instructions/a11y.instructions.md` — canonical accessibility specification
- `.github/resources/a11y-rules.md` — TDAH and Autism accessibility rules
- `.github/prompts/a11y-neuro-uber-flow.prompt.md` — audit orchestration (sections A→L)
- `.github/prompts/a11y-neuro-audit-static-code.prompt.md` — static code audit criteria
- `.github/prompts/a11y-neuro-audit-content.prompt.md` — content & microcopy criteria
- `.github/prompts/a11y-neuro-audit-cognitive-flow.prompt.md` — cognitive flow criteria
- `.github/prompts/a11y-neuro-audit-overview.prompt.md` — overview & risk matrix criteria
- `.github/prompts/a11y-backlog.prompt.md` — backlog & issue card generation criteria

## Configuration

- **Target scope**: `${{ github.event.inputs.target_scope || 'src/' }}`
- **Target URL**: `${{ github.event.inputs.target_url || '' }}`
- **Primary flows**: `${{ github.event.inputs.primary_flows || '' }}`
- **Personas**: TSA (Autistic Analytical), ADHD (Creative), HYB (Hybrid)

## Audit Sequence

Follow the orchestration sequence from the uber-flow prompt:

### Phase 1: Static Code Audit
Scan the target scope for structural & semantic deviations:
- Landmarks, heading hierarchy, skip links
- Keyboard operability, focus order, composite widgets
- Motion handling, `prefers-reduced-motion`
- ARIA correctness, native element preference
- Form labels, error patterns, help text associations

### Phase 2: Content & Microcopy Audit
Evaluate all user-facing text:
- Reading level (≤ CEFR B1), sentence length (≤ 25 words)
- Label clarity: verb-first, no ambiguous text
- Error message pattern: cause + impact + resolution
- Feedback persistence: no critical auto-expiring toasts
- Lexical consistency, no unjustified language mixing

### Phase 3: Cognitive Flow Audit
For each identified user flow (or flows from input):
- Map steps with interactive density counts
- Score orientation, predictability, memory relief, focus control, recovery (0–5)
- Build persona friction matrix (TSA/ADHD per step)
- Identify missing undo/draft/autosave mechanisms

### Phase 4: Playwright E2E (if URL provided)
If `target_url` is provided:
- Navigate to the URL using Playwright
- Test identified user flows
- Capture screenshots at each major interaction
- Check keyboard navigation, focus management, motion
- Verify error states and recovery mechanisms

If no URL: skip and note "E2E skipped — no target URL provided."

### Phase 5: Overview & Risk Matrix
Synthesize all findings into:
- Executive summary (≤ 10 bullets, ≤ 18 words each)
- Coverage snapshot (Completed / Partial / Gap per area)
- Risk matrix by dimension (Predictability, CognitiveLoad, Recovery, Sensory, Semantics, Keyboard, Feedback, WorkingMemory)
- Persona friction matrix

## Output: Create Issues

Create structured issues following the backlog format. Apply these rules:

### Summary Issue (always create first)
Create one summary issue containing:
- Executive summary with High / Medium / Low totals
- Top dimensions with most findings
- Coverage snapshot table
- Risk matrix table
- Links to individual finding issues (they will be sub-issues)

### Finding Issues
Create individual issues for **High and Medium** findings only:
- **Deduplicate**: One issue per distinct problem
- **Priority**: P1 (High + critical persona impact), P2 (Medium + multi-dimension), P3 (Low — mention in summary only, do not create issue)
- **Max 15 issues** beyond the summary

**Issue format**:
```markdown
## Problem
[Description with file:line evidence]

## Severity & Dimensions
- **Priority**: P1 | P2
- **Dimensions**: [list]
- **Personas**: TSA, ADHD, HYB

## Why (≤ 18 words)
[Impact statement]

## Recommended fix pattern
[Generic pattern, not exact code]

## Acceptance criteria
- [ ] Criterion 1
- [ ] Criterion 2

## Telemetry
[Suggested event name or N/A]

## References
- Spec: §X
- WCAG: X.X.X
```

## Constraints

- **DO NOT modify any code.** Audit only.
- Every finding must cite file path, line, or screenshot as evidence.
- No speculative findings — only observable issues.
- Write all output in English.
- Use risk ID format: `Dimension-slug-n` (e.g., `Keyboard-cart-icon-1`).
