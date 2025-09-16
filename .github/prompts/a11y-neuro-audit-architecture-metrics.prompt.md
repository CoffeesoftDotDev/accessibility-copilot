---
mode: 'agent'
description: 'Infrastructure & telemetry audit for accessibility + neuro-inclusive metrics'
tools: ['search','codebase','runTasks','terminalLastCommand','runTests']
outputs: ['metricGaps','infraFindings']
---
# Architecture & Metrics Accessibility Audit

## Objective
Assess architecture & telemetry readiness for supporting neuro-inclusive a11y instrumentation and performance stability.

## Focus Areas
| Area | Goal | Signals / Evidence |
|------|------|--------------------|
| Performance Stability | Smooth interaction (low jank) | Lighthouse budgets (CLS, TBT, LCP) |
| Progress Preservation | Draft/undo persistence | Local storage usage, API endpoints, event names |
| Notification System | Non-ephemeral log presence | Log component, durable store |
| Motion Control | Central toggle & media query respect | Global state flag, CSS var gating |
| Error Observability | Traceable validation & recovery | Structured error events |
| Metrics Emission | Coverage of §21 signals | Event dispatch code, analytics wrapper |
| Configuration Safety | Feature flags predictable | Deterministic rollout strategy |

## Data Collection Steps
1. Inspect performance config (build tooling, lazy-loading strategy, code splitting).
2. Search for metric events: `draft_restored`, `undo_action`, `layout_shift_feedback`, correlation IDs.
3. Identify storage strategies (localStorage/session/cache) for drafts.
4. Check global motion toggle implementation & fallback for `prefers-reduced-motion`.
5. Enumerate notification components & storage model (in-memory vs persisted).
6. Analyze error handling middleware / interceptors for semantic tagging.
7. Detect queue/backlog or task snapshot mechanism (Hybrid persona support).
8. Evaluate resilience: idempotent operations, retry logic, offline tolerance.

## Output Format
Sections:
1. Performance & Stability
2. State Persistence & Recovery
3. Motion & Sensory Controls
4. Notification & Feedback Architecture
5. Metrics / Telemetry Coverage Table
6. Risk & Gap Matrix
7. Recommendations (Prioritized)

### Metrics Coverage Table
| Metric | Implemented? | Evidence (file/ref) | Gap Note | Ref |
|--------|--------------|---------------------|----------|-----|
| draft_restored | Pending |  |  | §21 |
| undo_action | Pending |  |  | §21 |
| layout_shift_feedback | Pending |  |  | §21 |
| async_retrigger_rate | Pending |  |  | §21 |

### Risk & Gap Matrix
| Area | Severity | Description | Suggested Mitigation | Ref |
|------|----------|------------|----------------------|-----|

## Constraints
- No code mutation; read-only assessment.
- Cite file paths where possible.
- Use literal language.

## Acceptance Criteria
- All focus areas addressed.
- Each risk has a recommended mitigation referencing spec section.
- Metrics table includes all §21 metrics even if missing (mark Missing / None).
