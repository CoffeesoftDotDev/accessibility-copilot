---
mode: 'agent'
description: 'Content / microcopy audit for clarity, cognitive load & semantic accessibility (TSA/ADHD focus)'
tools: ['search','codebase','runTests','usages']
outputs: ['contentFindings','readabilityStats']
---
# Content & Microcopy Neuro-Inclusive Audit

## Objective
Assess textual surface for clarity, structure, cognitive load minimization, and semantic accessibility.

## Targets
- Headings & outline consistency
- Sentence length & reading level approximation
- Ambiguous / idiomatic phrasing
- Error messages (cause + resolution pattern)
- Action labels (verb-first, context-sufficient)
- Redundant or decorative aria-label misuse
- Change summary presence after batch actions

## Method
1. Enumerate all `.md`, `.vue`, `.tsx?`, `.html` content-bearing files.
2. Extract headings, button/link text, error strings, notification messages.
3. Flag: sentences > 25 words, ambiguous labels (Go, Here, Click, OK), metaphorical idioms.
4. Validate hierarchical outline (no level jumps without rationale).
5. Identify missing change summaries where bulk operations exist.

## Output Format
Sections:
1. Outline Integrity Findings
2. Label & Action Text Issues
3. Error Message Consistency
4. Cognitive Load Risks (long sentences, dense blocks)
5. Change Feedback Gaps
6. Summary Table

### Summary Table
| Category | Count | High Severity | Notes |
|----------|-------|---------------|-------|
| Long Sentences | 0 | 0 |  |
| Ambiguous Labels | 0 | 0 |  |
| Missing Error Cause/Resolution | 0 | 0 |  |
| Outline Level Skips | 0 | 0 |  |
| Missing Change Summaries | 0 | 0 |  |

## Constraints
- Do not rewrite content, only audit.
- Literal phrasing; no speculative tone.

## Acceptance Criteria
- Every target addressed explicitly.
- Counts are accurate and non-negative.
- Each high severity item references spec section (§7, §17, §22).
