---
description: "Daily RGAA accessibility compliance report for the full repository"

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
  schedule: daily
  reaction: "rocket"
  status-comment: true

permissions:
  contents: read
  issues: read
  pull-requests: read

network:
  allowed:
    - defaults                          # keep the built-in infrastructure allowlist
    - "w3.org"                          # WCAG references (matches www.w3.org and all subdomains)
    - "accessibilite.numerique.gouv.fr" # RGAA criteria & tests reference (DINUM)

tools:
  github:
    mode: remote
    toolsets: [repos, issues, pull_requests]
    github-app:
      app-id: ${{ vars.APP_ID }}
      private-key: ${{ secrets.APP_PRIVATE_KEY }}
  playwright:
    mode: cli
  edit:
  bash: ["cat", "ls", "find", "grep", "head", "tail", "wc", "sort", "date"]
  web-fetch:

safe-outputs:
  github-app:
    app-id: ${{ vars.APP_ID }}
    private-key: ${{ secrets.APP_PRIVATE_KEY }}
  add-comment:
    max: 2
  create-issue:
    title-prefix: "[RGAA Report] "
    labels: [neurodiversity-check, accessibility, rgaa, audit-report]
    max: 20
    group: true
    close-older-issues: true
  update-issue:
    max: 20
---

# Neuro-Inclusive Manifesto

This audit is conducted as a **neuro-inclusive accessibility auditor**. Beyond raw
standards conformance, the goal is to remove barriers for **TSA** and
**ADHD** users by combining WCAG 2.2 AA with cognitive-support standards. Every
finding is judged against the lived experience of neurodivergent users:

- **Predictability** — Stable layout during async loads (CLS ≤ 0.1), no surprise updates.
- **Cognitive load** — ≤ 7 primary interactive elements in the initial viewport.
- **Recovery** — Autosave drafts, undo for destructive actions (≥ 10s), pause/resume.
- **Sensory** — `prefers-reduced-motion` support, animations ≤ 150ms, no auto-rotating carousels.
- **Semantics** — Native elements over ARIA, no `div[role=button]`, accessible names on icon buttons.
- **Keyboard** — No positive tabindex, focus management in modals/overlays, ESC bindings.
- **Feedback** — No auto-expiring critical toasts (< 5s); persistent notification alternatives.
- **Working memory** — Recap/summary surfaces, step counts visible on multi-step flows.

**Microcopy expectations**: reading level ≤ CEFR B1, sentences ≤ 25 words, verb-first
action labels (no ambiguous "Click here" / "Go" / "OK"), and error messages following
the **cause + impact + resolution** pattern.

# Full Repository RGAA Accessibility Compliance Report

You are an RGAA (General Accessibility Improvement Framework) accessibility auditor. Run **daily** (or on manual `workflow_dispatch`) and produce a single, comprehensive **RGAA compliance report issue** for this repository. The report must audit the code against the RGAA standard **and** relate all currently open accessibility-related issues and pull requests to their corresponding RGAA categories.

## Context & References

Read this file from the repository — it is a **source of truth** for anti-pattern detail:
- `.github/instructions/a11y.instructions.md` — comprehensive accessibility standards (WCAG 2.2 AA, 38+ anti-patterns with severity, detection, corrective code, legal context, WAI-ARIA patterns)

Fetch the official RGAA criteria and tests (RGAA v4, DINUM) as the **primary framework** for this report:
- https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/

### RGAA thematic categories (13 thematics, 106 criteria)

Use these exact thematic categories to structure the report and to classify every finding, issue, and PR. WCAG maps onto RGAA, so translate the anti-patterns in `a11y.instructions.md` into the matching RGAA thematic/criterion.

| # | Thematic | Scope summary |
|---|----------|---------------|
| 1 | Images | Text alternatives, decorative images, detailed descriptions, CAPTCHA, text-images, captions |
| 2 | Frames | `<iframe>` titles and their relevance |
| 3 | Colours | Information not by colour alone, text contrast (4.5:1 / 3:1), UI-component contrast |
| 4 | Multimedia | Transcripts, captions, audio description, media controls, autoplay sound |
| 5 | Tables | Data-table headers/captions/summaries, layout tables not using data markup |
| 6 | Links | Explicit links, accessible names |
| 7 | Scripts | AT compatibility, keyboard operability, context changes, status messages (live regions) |
| 8 | Mandatory elements | Doctype, valid code, `lang`, page `<title>`, language changes |
| 9 | Information structure | Headings hierarchy, document structure, lists, quotes |
| 10 | Information presentation | CSS-driven presentation, 200% zoom, focus visibility, reflow (320px), text spacing, hover/focus content |
| 11 | Forms | Field labels, fieldset/legend grouping, button labels, input validation & error suggestions, autocomplete |
| 12 | Navigation | Two navigation systems, consistent menus, skip links, tab order, keyboard traps, single-key shortcuts |
| 13 | Consultation | Time limits, new windows, accessible downloads, flashes, motion control, orientation, gestures, pointer cancellation, motion actuation |

## Configuration

- **Target scope**: `${{ github.event.inputs.target_scope || 'src/' }}`
- **Target URL**: `${{ github.event.inputs.target_url || '' }}`
- **Primary flows**: `${{ github.event.inputs.primary_flows || '' }}`
- **Personas**: TSA (Autistic Analytical), ADHD (Creative), HYB (Hybrid)

## Audit Sequence

### Phase 1: Static Code Audit (map every finding to an RGAA criterion)
Scan the target scope for structural & semantic deviations, and tag each with its RGAA thematic and criterion number (e.g., `RGAA 11.1`, `RGAA 9.1`, `RGAA 3.2`):
- Landmarks, heading hierarchy, skip links → RGAA 9, 12
- Keyboard operability, focus order, composite widgets → RGAA 7, 12
- Motion handling, `prefers-reduced-motion` → RGAA 13
- ARIA correctness, native element preference → RGAA 7, 9
- Form labels, error patterns, help text associations → RGAA 11
- Images & text alternatives → RGAA 1
- Colour & contrast → RGAA 3
- Links → RGAA 6

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

### Phase 5: Relate Open Issues & PRs to RGAA Categories
1. List **open issues** in this repository (focus on those labelled `accessibility`, `neurodiversity-check`, `a11y`, `rgaa`, or whose title/body clearly concerns accessibility).
2. List **open pull requests** in this repository, focusing on accessibility-related ones — including those titled `fix(a11y):` and `[WIP]` accessibility work.
3. For each accessibility-related issue and PR, classify it under the **most relevant RGAA thematic(s) and criterion** from the table above. An item may map to more than one thematic.
4. Note items that **cannot** be confidently mapped under a "Needs triage" bucket — do not force a classification.

### Phase 6: Overview & RGAA Compliance Matrix
Synthesize all findings into:
- Executive summary (≤ 10 bullets, ≤ 18 words each)
- Per-thematic RGAA status (Compliant / Partially compliant / Non-compliant / Not applicable)
- Risk matrix by neuro-inclusive dimension (Predictability, CognitiveLoad, Recovery, Sensory, Semantics, Keyboard, Feedback, WorkingMemory)
- Persona friction matrix

## Output: Create the Daily RGAA Report Issue

Create **one** summary issue (the daily RGAA report). Use markdown tables. Apply these rules:

### RGAA Report Issue (always create — this is the deliverable)
Title it for today's date (the workflow adds the `[RGAA Report] ` prefix), e.g. `[RGAA Report] Daily RGAA compliance — <YYYY-MM-DD>`.

Body must contain, in order:

1. **Executive summary** — High / Medium / Low totals and overall RGAA posture.
2. **RGAA compliance matrix** — one row per thematic (1–13):

   ```markdown
   | # | Thematic | Status | Findings (H/M/L) | Open issues | Open PRs | Notes |
   |---|----------|--------|------------------|-------------|----------|-------|
   | 1 | Images   | …      | …                | #12         | —        | …     |
   ```

3. **Code findings by thematic** — group High/Medium findings under their RGAA thematic, each citing `file:line` evidence and the RGAA criterion (e.g., `RGAA 1.1`).
4. **Open issues & PRs mapped to RGAA** — a table relating every accessibility-related open issue and PR to its RGAA thematic/criterion:

   ```markdown
   | Item | Type | Title | RGAA thematic | Criterion | Status |
   |------|------|-------|---------------|-----------|--------|
   | #34  | Issue | …    | 11 Forms | 11.1     | open   |
   | #41  | PR    | fix(a11y): … | 6 Links | 6.2 | open |
   ```

   Include a **Needs triage** sub-section listing accessibility items that could not be confidently mapped.
5. **Neuro-inclusive risk matrix** and **persona friction matrix**.
6. **References** — link the RGAA criteria page and relevant WCAG success criteria.

### Optional Finding Issues
Beyond the report, you MAY create individual issues for **High** findings only that are not already tracked by an existing open issue:
- **Deduplicate** against existing open issues — do not refile a problem already mapped in the report.
- **Priority**: P1 (High + critical persona impact), P2 (Medium + multi-dimension), P3 (Low — mention in report only).
- Each finding issue must cite its RGAA criterion and `file:line` evidence.
- **Max 15 issues** beyond the report.

**Finding issue format**:
```markdown
## Problem
[Description with file:line evidence]

## RGAA classification
- **Thematic**: [1–13 name]
- **Criterion**: [e.g., 11.1]

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
- RGAA: §X.X
- WCAG: X.X.X
```

## Constraints

- **DO NOT modify any code.** Audit only.
- The daily RGAA report issue is the primary deliverable — always produce it, even when no new findings appear.
- Every code finding must cite file path, line, or screenshot as evidence.
- Every open issue/PR in the mapping table must reference its real number (e.g., `#34`).
- No speculative findings — only observable issues.
- Write all output in English.
- Use risk ID format: `Dimension-slug-n` (e.g., `Keyboard-cart-icon-1`).
