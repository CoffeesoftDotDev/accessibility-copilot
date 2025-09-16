---
mode: 'agent'
description: 'Conduct a neuro-inclusive accessibility audit overview (WCAG 2.2 + TSA/ADHD cognitive model)'
tools: ['search','codebase','editFiles','runTests','problems','terminalLastCommand','usages','changes']
outputs: ['report','checklist','riskMatrix']
---
# Neuro-Inclusive Accessibility Audit (Overview)

## Objective
Produce a high-level status report of accessibility & neuro-inclusion maturity (Autistic Analytical, ADHD Creative, Hybrid) across: Structure, Interaction, Cognitive Support, Content, Feedback, Recovery.

## Inputs Required
- Target scope path or URL(s)
- Tech stack summary (framework, SSR/SPA, design system if any)
- Known user journeys (at least 2 multi-step flows)
- Existing metrics (if available): CLS, LCP, draft restore success, undo usage

## Method (Phases)
1. Inventory: List pages / views / primary components.
2. Landmark & Heading Scan: Confirm single <main>, stable nav order, hierarchical h* outline.
3. Interaction Layer: Identify composite widgets (menus, tabs, dialogs, grids). Map keyboard patterns.
4. Cognitive Load Factors: Count interactive elements in initial viewport; note progressive disclosure use.
5. Feedback & Recovery: Check presence of notification log, undo, autosave/drafts.
6. Motion & Sensory: Detect non-essential animations, confirm motion toggle & media query respect.
7. Persona Tension Review: For top 2 flows, list friction vs mitigation per persona (TSA, ADHD, Hybrid).
8. Metrics & Telemetry Gap: Identify missing instrumentation signals (see a11y spec §21).
9. Risk Scoring: Assign severity (High/Med/Low) on: Predictability, Load, Recovery, Sensory, Semantics.
10. Action Matrix: Prioritize (P1 immediate blockers, P2 near-term, P3 backlog) referencing spec sections.

## Output Format
Return sections in order:
1. Executive Summary (bullets ≤ 8)
2. Coverage Snapshot Table
3. Landmark & Structure Findings
4. Cognitive & Flow Findings
5. Feedback / Recovery & Safety Nets
6. Motion & Sensory Summary
7. Persona Friction Matrix
8. Metrics & Instrumentation Gaps
9. Risk Matrix
10. Prioritized Recommendations
11. Appendix: Raw Observations

## Tables
### Coverage Snapshot
| Area | Status | Notes | Ref Section |
|------|--------|-------|-------------|
| Landmarks | Pending |  | §6 |
| Keyboard | Pending |  | §8 |
| Cognitive Scaffolding | Pending |  | §2/§17 |
| Motion Control | Pending |  | §6/§9 |
| Recovery | Pending |  | §8/§12 |
| Content Clarity | Pending |  | §7 |
| Notifications | Pending |  | §18 |

### Persona Friction Matrix (Example)
| Flow | Persona | Friction | Mitigation Present? | Gap | Ref |
|------|---------|----------|---------------------|-----|-----|
| Checkout Wizard | TSA | Hidden total steps | Partially (step text missing count) | Add explicit Step X/Y | §17 |

### Risk Matrix
| Dimension | Severity | Rationale | Recommended Mitigation | Ref |
|-----------|----------|-----------|------------------------|-----|
| Predictability | High | Layout shift on async cards | Reserve space skeletons | §6 |

## Constraints
- Use deterministic section order.
- Plain, literal phrasing; avoid metaphors.
- Max 20 words per sentence (soft target).
- Summarize changes or gaps as bullet lists.

## Acceptance Criteria
- All sections returned (even if empty with "None Found").
- Each recommendation references spec section (e.g., §6, §17, §22).
- Persona matrix includes at least 2 flows.
- No speculative claims without observation note.
