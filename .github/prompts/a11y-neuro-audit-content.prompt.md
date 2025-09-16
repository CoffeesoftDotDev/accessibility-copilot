---
mode: 'agent'
description: 'Microcopy & surface text audit – cognitive load optimization (ASD / ADHD) + semantic accessibility'
tools: ['codebase', 'usages', 'todos']
outputs: ['contentFindings','readabilityStats','cognitiveHeuristics']
---

# Content & Microcopy Audit – Neuro-Inclusive Orientation (ASD / ADHD)

## Objective
Evaluate interface text and structural patterns for: reduction of extraneous cognitive load, spatial & temporal predictability, attention stability, sensory load moderation, working memory support, clarity of action intent, lexical consistency, and semantic accessibility.

## Target Axes (Summary)
1. Hierarchy & anchors (sequential headings, orientation anchors, short logical sections)
2. Readability & segmentation (sentence length, lexical density, visual breaks, avoidance of verb clusters)
3. Labels & action text (explicit verb + clear object, no ambiguity, avoidance of “here / ok / more”)
4. Error & feedback messages (cause + effect + resolution path; persistence until resolved)
5. Post‑operation summaries (non-volatile confirmation; recap of resulting state)
6. Visual / sensory stimuli (animations, motion, transitions, auto-dismiss messages)
7. Temporal predictability (timeouts, silent redirects, implied duration)
8. Working memory support (recaps, recent history, logical grouping, fragmentation avoidance)
9. Lexical coherence / i18n (language mixing, unjustified synonyms, inconsistent capitalization)
10. Destructive / irreversible actions (undo availability, pre-confirmation, anxiety mitigation)
11. Context switching load (state changes without anchoring focus / heading reassertion)
12. Icon-only & affordances (symbolic controls without accessible name or expansion)
13. Block density (paragraph size, absent lists where serial semantics exist)
14. Non-functional redundancy (duplicate text inflating scan cost)
15. Procedural terminology (chains of imperatives without segmentation)
16. Sequential reading support (one logical H1 per view; no skipped heading levels; appropriate ARIA)
17. Transient state indication (loading, busy, partial progress signaled and persistent)

## Detailed Targets
- Headings & outline: progressive (h1→h2→h3; no h1→h3 jump without justification)
- Sentences: length >25 words = risk; >32 words = high severity (sequential parsing penalty)
- Blocks: >140–160 characters without internal punctuation = density risk
- Ambiguous labels (strict list): `OK`, `Go`, `Here`, `More`, `+`, `-`, `×`, `▶`, `...`, icon-only controls
- Timeouts: any message disappearing <8s without alternative persistence = flag
- Animations: unconditioned by `prefers-reduced-motion` or a “focus mode” = sensory risk
- Redirects: automatic navigation without pre-announcement + recap = high severity
- History: absence of accessible history for >1 critical sequential action = working memory deficit
- Duplication: identical text block repeated without functional distinction = scan overhead
- Icon-only: interactive element lacking explicit role + accessible name = high severity
- Error: missing triplet (concise cause + impact + user action) = incomplete
- Undo: destructive action without ≥5s reversal opportunity = flag
- Cumulative silent transitions: ≥2 state changes (e.g., closing panel + opening modal) without signaling = high severity

## Method
1. Enumerate content-bearing files: `.md`, `.vue`, `.tsx?`, `.html`, inline UI strings (buttons, links, toasts, alerts, validation messages).
2. Extract:
   - Heading structure (order, depth)
   - Action / button / link / CTA labels
   - Error / status / confirmation messages
   - Transient text (toasts, overlays, alerts)
   - Icon-only interactive fragments
3. Compute:
   - Sentence lengths (token approximation or punctuation splitting)
   - Long sentence ratio (% >25 words)
   - Verb-first label ratio
   - Duplication density (hash identical normalized blocks)
   - Feedback volatility (detect `setTimeout`, `duration=`, `alert(...)`)
4. Detect:
   - Auto-dismiss patterns (`duration\\s*[:=]`, `setTimeout`)
   - CSS animations / transitions lacking reduced-motion conditioning
   - Symbol-only or SVG-only clickable regions without accessible naming
   - Mixed-language paragraphs (heuristic English tokens amid primary non-English or vice versa)
5. Classify severity:
   - High: impairs orientation / elevates anticipatory anxiety / removes anchoring
   - Medium: elevates extraneous load (duplication, isolated long sentence)
   - Low: optimization opportunity (style/consistency)
6. Produce standardized output sections (see Format) + quantified summary.
7. No rewriting; factual audit only.

## Output Format
Sections (fixed order):
1. Outline Integrity Findings
2. Label & Action Text Issues
3. Error & Feedback Message Consistency
4. Cognitive Load & Sentence Density
5. Sensory & Temporal Predictability Risks
6. Working Memory & State Continuity Gaps
7. Change Feedback & Undo Coverage
8. Icon-only & Affordance Gaps
9. Redundancy / Duplication
10. Terminology / Language Mixing
11. Summary Table

### Summary Table (Extended Columns)
| Category | Count | High Severity | Medium | Low | Notes |
|----------|-------|--------------|--------|-----|-------|
| Long Sentences | 0 | 0 | 0 | 0 | |
| Ambiguous / Icon-only Labels | 0 | 0 | 0 | 0 | |
| Missing Error Cause/Resolution | 0 | 0 | 0 | 0 | |
| Outline Level Skips | 0 | 0 | 0 | 0 | |
| Volatile Feedback (Timeout) | 0 | 0 | 0 | 0 | |
| Missing Undo (Destructive) | 0 | 0 | 0 | 0 | |
| Silent Redirects | 0 | 0 | 0 | 0 | |
| Sensory Risk (Unconditioned Animations) | 0 | 0 | 0 | 0 | |
| Non-Functional Duplication | 0 | 0 | 0 | 0 | |

### Additional Computed Fields
- `sentenceLongRatio` (%)
- `verbFirstLabelRatio` (%)
- `avgHeadingGap` (mean line distance between successive headings)
- `duplicationBlocks` (number of groups >1)
- `transientFeedbackCount`
- `iconOnlyInteractiveCount`
- `mixedLanguageOccurrences`

## Severity Rule References (§§)
- §7: Interactive control without accessible name / contextual label
- §17: Critical feedback absent (cause + action) / missing post-change recap
- §22: Linguistic density / sequential overload / extended sentences

(Do not rename internal section references; used for cross-linking.)

## Constraints
- NO rewriting of source content.
- Literal observation; no speculative remediation language.
- Counts non-negative.
- Each High Severity item cites reference (§7, §17, or §22).

## Acceptance Criteria
- All 17 axes covered.
- Summary table populated.
- Ratios present if calculable (source >0 relevant items).
- High Severity justifications include code or literal text snippet reference.
- No imperative refactor suggestions (only nature of risk).

## Glossary (Neuro-Specific)
- Extraneous load: Non-goal-related information increasing executive effort.
- Temporal predictability: Ability to anticipate duration / sequence (reduces anxiety & impulsive task-switching).
- Anchor point: Stable element (heading, focus target) enabling rapid mental reset.
- Feedback volatility: Disappearance before working memory consolidation.
- Context fragmentation: Chain of micro-changes lacking cohesive signaling.
- Sensory overstimulation: Accumulated transitions / motion without regulation.

## Heuristics (Internal)
| Heuristic | Trigger |
|-----------|---------|
| H-A1 | >25% labels not verb-first |
| H-A2 | >10% feedback messages volatile without persistence |
| H-C1 | >15% sentences >25 words |
| H-M1 | 0 recap after destructive action |
| H-S1 | ≥1 continuous animation unconditioned |
| H-O1 | Redirect without prior message |

## Implementation Notes (Automation Potential)
- Multi-pass regex extraction (headings, buttons, icon containers)
- Simple tokenization: split on whitespace / punctuation
- Duplication hashing: normalize whitespace + SHA1
- Language mixing heuristic: threshold >5 English tokens in predominantly non-English paragraph (or reverse)
- Icon-only detection: clickable element containing only SVG / symbol / single char + missing `aria-label` or `title`

End of prompt.