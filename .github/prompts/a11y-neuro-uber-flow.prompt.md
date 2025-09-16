---
mode: 'agent'
description: 'Orchestrated neuro-inclusive accessibility mega audit (static code + content + cognitive flows + synthesis)'
tools: ['codebase', 'usages', 'problems', 'openSimpleBrowser', 'fetch', 'todos']
outputs: ['overviewReport','staticCodeFindings','contentFindings','flowReport','consolidatedRiskMatrix','actionPlan','metricsGapReport','issuesBacklog']
---
# Neuro-Inclusive Accessibility Mega Audit ("Uber Flow")

## Purpose
Provide an end‑to‑end consolidated audit that sequences: Overview → Static Code → Content & Microcopy → Cognitive Multi‑Step Flows → Synthesis & Risk → Action & Metrics. Leverages and embeds the existing specialized prompts (overview, static code, content, cognitive flow) into a single deterministic output for executive + implementation consumption.

NEW: After generating the full 15-section report, also generate a structured remediation Issues Backlog suitable for direct GitHub issue creation.


### Spec Reference Index (Anchor for §6–§23)
| Section | Theme (Concise) | Notes |
|---------|-----------------|-------|
| §6 | Structural & Predictability Foundations | Landmarks, spatial stability, reserved space |
| §7 | Copy & Label Clarity | Naming, icon textual alternatives |
| §8 | Keyboard & Focus Mechanics | Operability, traps, order, initial focus |
| §9 | Motion & Sensory Modulation | prefers-reduced-motion, intensity gating |
| §10 | Semantic Integrity | Native elements, ARIA correctness |
| §11 | State & Feedback Continuity | Status roles, live regions |
| §12 | Recovery & Reversibility | Undo, drafts, soft deletes |
| §13 | Error Communication | Persistent, actionable, mapped fields |
| §14 | Progressive Disclosure | Chunking, section scoping |
| §15 | Working Memory Offload | Recaps, summaries, anchored indices |
| §16 | Cognitive Load Reduction | Grouping, format consistency |
| §17 | Flow Stability & Transitions | Step boundaries, handoff predictability |
| §18 | Notification Persistence & Accessibility | Durable vs ephemeral signals |
| §19 | Personalization & Preferences | Mode toggles (focus, reduced stimuli) |
| §20 | Data Density & Legibility | Spacing, contrast triggers |
| §21 | Instrumentation & Metrics | Telemetry mapping & gaps |
| §22 | Critical Anti‑Patterns | Blocking violations (e.g., keyboard traps) |
| §23 | Governance & Exception Handling | Deferred mitigation logging |

### Optional Configuration Inputs (Advanced)
Add any of these (optional) after Required Inputs to control output:
```
OUTPUT_FORMAT: markdown|json|hybrid (default: markdown)
MAX_EXEC_SUMMARY_BULLETS: <int> (default: 10)
INCLUDE_GOVERNANCE: true|false (default: true)
INCLUDE_CHANGE_IMPACT: true|false (default: true)
MIN_METRIC_GAP_COUNT: <int> (default: 3)
RISK_AGGREGATE_WEIGHTS: {"High":1.0,"Medium":0.6,"Low":0.3} (override accepted)
RISK_AGGREGATE_THRESHOLDS: {"High":>=0.75,"Medium":>=0.45,"Low":>=0.15}
SKIP_EMPTY_SECTIONS: true|false (default: false)
INCLUDE_FOOTER_DISCLAIMER: true|false (default: true)
OMIT_DIMENSIONS: ["InteractiveDensity"] (optional array to treat as informational only)
MERGE_EVIDENCE_MAX_LEN: 400 (truncate evidence concatenation beyond)
ACTION_EFFORT_SCALE: XS|S|M|L|XL (default set applied)
```

If `OUTPUT_FORMAT=json` produce ONLY a final JSON object conforming to `UnifiedAuditJSON` schema (see below). If `hybrid`, produce normal markdown THEN append a JSON block.

If `OUTPUT_FORMAT` is `markdown` or `hybrid`, append an "Issues Backlog" section AFTER Section 15 (or supply as separate top-level JSON array when `json`) describing one issue per distinct risk plus any composite remediation actions (so that each `risk.id` appears in ≥1 issue). See "Issue Backlog Specification" below.

### UnifiedAuditJSON (Minimal Schema for Automation)
```
{
  "meta": {"date":"<DATE_AS_OF>","targetScope":"...","personas":["TSA","ADHD"],"config":{ /* applied overrides */ }},
  "summary": {"highRiskCount": <int>, "mediumRiskCount": <int>, "lowRiskCount": <int>, "topDimensions": ["Keyboard","Recovery"]},
  "risks": [ {"id":"Keyboard-cart-icon-1","dimension":"Keyboard","severity":"High","evidence":"...","recommendation":"...","refs":["§8"],"personas":["TSA","ADHD"]} ],
  "actionPlan": [ {"priority":"P1","action":"Add dialog semantics","riskIds":["Semantics-dialogs-1"],"effort":"M"} ],
  "metricsGaps": [ {"signal":"undo_action","present":false,"priority":"High"} ],
  "governance": [ {"component":"Checkout","ruleRelaxed":"Autosave immediate","justification":"Security review pending"} ],
  "method": {"dataSources":["static-code","content"],"normalization":"severity escalate highest","version":"1.1"}
}
```
Keys must remain deterministically ordered (as shown) unless adding new optional top-level fields after `method`.

### Risk Aggregate Formula (Optional Explanation)
If included, compute per-dimension aggregate score:
`score = (HighCount * wHigh + MediumCount * wMedium + LowCount * wLow) / (IssueCount * wHigh)` with default weights (1.0, 0.6, 0.3). Classify via thresholds in config. Report in Risk Matrix as supplemental column only if `OUTPUT_FORMAT` not strictly `json`.

## When To Use
Use this mega prompt when you need a holistic maturity snapshot and prioritized roadmap in ONE run instead of invoking four separate audits. Suitable for pre‑release readiness, quarterly baseline, or large refactor validation.

## Required Inputs
Supply (fill placeholders):
- `TARGET_SCOPE`: Path(s) or URL(s) to audit (repo subfolders, deployed pages) 
- `TECH_STACK`: Framework + build mode (SSR/SPA/microfrontend) + design system (if any)
- `PRIMARY_FLOWS`: ≥2 critical user journeys (e.g., Checkout, Onboarding)
- `PERSONA_SET`: Choose at least two (TSA Analytical, ADHD Creative, Hybrid)
- `KNOWN_METRICS`: CLS, LCP, draft restore %, undo usage, motion toggle adoption (if available)
- `DATE_AS_OF`: Audit date stamp

Example (replace):
```
TARGET_SCOPE: src/, /public, https://example.app
TECH_STACK: Vue 3 + Vite + Tailwind + SSR edge
PRIMARY_FLOWS: Checkout, Profile Setup
PERSONA_SET: TSA Analytical, ADHD Creative
KNOWN_METRICS: CLS p75=0.12, Undo usage=3.1% sessions, Draft restore=92%
DATE_AS_OF: 2025-09-16
```

## Phase Orchestration
1. Phase A – Context Normalization: Capture & echo inputs; identify coverage boundaries; note exclusions.
2. Phase B – High-Level Overview (embed logic of `a11y-neuro-audit-overview.prompt.md`).
3. Phase C – Static Code Structural & Semantic Scan (embed logic of `a11y-neuro-audit-static-code.prompt.md`).
4. Phase D – Content & Microcopy Cognitive Load Audit (embed logic of `a11y-neuro-audit-content.prompt.md`).
5. Phase E – Cognitive Multi-Step Flow Evaluation (embed logic of `a11y-neuro-audit-cognitive-flow.prompt.md`).
6. Phase F – Cross-Phase Synthesis & Consolidated Risk Matrix (merge severities & dimensions; de‑duplicate items by canonical signature).
7. Phase G – Prioritized Action Plan (P1 blockers, P2 near term, P3 backlog) with spec references.
8. Phase H – Metrics & Instrumentation Gap Mapping (spec §21 alignment; propose telemetry events, not implementation code).
9. Phase I – Governance & Exception Log Seeds (pre-populate candidate exception entries if mitigation deferred).
10. Phase J – Executive Summary & Appendix.

## Canonical Dimensions (Unified Key Set)
Use these dimension identifiers across phases for cross-referencing:
| Key | Description | Source Phase |
|-----|-------------|--------------|
| Predictability | Spatial/temporal stability | Overview / Flows |
| CognitiveLoad | Memory & parsing burden | Content / Flows |
| Recovery | Undo, drafts, resume | Static / Flows |
| Semantics | Native elements, ARIA correctness | Static |
| Keyboard | Focus order & operability | Static / Overview |
| Sensory | Motion, animation moderation | Overview / Flows |
| Feedback | Visibility & persistence of state change | Content / Flows |
| WorkingMemory | Offload surfaces, recaps | Content / Flows |
| InteractiveDensity | Control count per view/step | Flows |
| CopyClarity | Label/action literal quality | Content |
| RiskAggregate | Normalized severity composite | Synthesis |

## Normalized Severity Scale
Map all contributing severities (High/Medium/Low or 0–5) into:
- High: Blocking / violates spec §22 anti-pattern or persona critical friction; score ≥4 or explicit High.
- Medium: Material cognitive or semantic risk; score 2–3.
- Low: Optimization; score 1 or stylistic gap.

Provide each item as structured object:
```
{
  "id": "DIM:short-slug",
  "dimension": "Predictability",
  "severity": "High",
  "personas": ["TSA","ADHD"],
  "evidence": "Multiple layout shifts on async card load (CatalogGrid.vue lines 42–58)",
  "impact": "Anxiety spike + reorientation cost",
  "recommendation": "Reserve skeleton slots; enforce fixed min-height; instrument layout_shift_feedback",
  "refs": ["§6","§17"],
  "sourcePhases": ["Overview","StaticCode"]
}
```

## De‑Duplication Rules
Items describing the same root cause (same file + element role + dimension) MUST merge; concatenate evidence succinctly; preserve all refs.

## Output Section Order (Deterministic)
1. Executive Summary (≤10 bullets) – DO NOT include implementation minutiae.
2. Context & Scope Inputs (echo & confirm).
3. Coverage Snapshot Table (merged from Overview + actual phases; mark Completed / Partial / Not Assessed).
4. Phase B Overview Findings (verbatim structured subsections from original prompt spec – ensure all required tables even if empty).
5. Phase C Static Code Findings (JSON block + recommendation table).
6. Phase D Content & Microcopy Findings (all mandated sections + summary table).
7. Phase E Cognitive Flow Findings (all mandated tables, heatmap, scores summary).
8. Consolidated Metrics & Instrumentation Gaps (Phase F/H fusion) – list existing vs missing signals.
9. Unified Risk Matrix (dimension consolidated view).
10. Prioritized Action Plan (P1/P2/P3 table; each row maps to ≥1 risk id).
11. Persona Friction Synthesis (aggregate across phases, highlight overlaps per flow).
12. Governance & Exception Candidates (pre-filled table rows if mitigation deferred >1 release).
13. Change Impact Forecast (qualitative ROI & risk reduction per top 5 actions).
14. Appendix A: Raw Observations (phase-tagged).
15. Appendix B: Method & Normalization Notes.
16. (Added) Issues Backlog (GitHub-ready) – only for markdown or hybrid; for json include under key `issuesBacklog`.

## Coverage Snapshot (Template)
| Area | Status | Notes | Ref Section |
|------|--------|-------|-------------|
| Landmarks | Pending |  | §6 |
| Keyboard | Pending |  | §8 |
| Cognitive Scaffolding | Pending |  | §2/§17 |
| Motion Control | Pending |  | §6/§9 |
| Recovery | Pending |  | §8/§12 |
| Content Clarity | Pending |  | §7 |
| Notifications | Pending |  | §18 |
| Working Memory | Pending |  | §2/§17 |
| Undo/Draft | Pending |  | §8/§12 |

Replace Status with: Completed | Partial | Gap.

## Action Plan Table (Unified)
| Priority | Action | Dimension(s) | Severity | Personas | Evidence Ref (IDs) | Spec Refs | Expected Impact | Effort (Est) |
|----------|--------|--------------|----------|----------|--------------------|-----------|-----------------|--------------|

Rules:
- P1 = High severity + persona critical OR spec blocker (§22, §6 baseline violation).
- P2 = Medium severity affecting ≥2 dimensions or multi-persona friction.
- P3 = Low severity optimizations / polish.

## Metrics & Instrumentation Mapping
Produce table:
| Signal | Present? | Source | Gap Rationale | Suggested Event Name | Priority |
|--------|----------|--------|---------------|----------------------|----------|
Signals list seeds: draft_restored, undo_action, layout_shift_feedback, reduced_motion_toggle_used, autosave_attempt, autosave_failure, notification_persist_open.

## Governance & Exception Candidates
| Date (Placeholder) | Component / Area | Rule Relaxed | Justification (Proposed) | Mitigation | Owner (TBD) |
|--------------------|------------------|--------------|--------------------------|-----------|-------------|

Only populate when an item is deferred beyond P2.

## Issue Backlog Specification (New)
Provide a machine-parseable list of issues to create. Each issue must map at least one `risk.id`. Combine closely related risks into one issue only when implementation logically shares the same code touch points (e.g., keyboard + semantics for the same control). Otherwise keep one issue per risk.

Markdown Format (table AND enumerated detail cards):

### Issues Backlog Table
| Issue Key | Title | Mapped Risk IDs | Priority (P1/P2/P3) | Effort | Spec Refs | Personas | Acceptance Criteria (Condensed) |
|-----------|-------|-----------------|---------------------|--------|-----------|----------|----------------------------------|

Detail Card Template (one per issue, following the table):
```
#### Issue: <Issue Key> – <Title>
Linked Risks: <risk ids>
Priority: P1
Effort: S|M|L (copy from action plan or derived)
Spec References: §8, §10
Personas Impacted: TSA, ADHD

Problem
<Short paragraph summarizing evidence merging referenced risk.evidence values (truncate if >400 chars).>

Why It Matters
<Persona-focused impact statement referencing dimensions.>

Acceptance Criteria
- [ ] Bullet criteria (#1)
- [ ] Bullet criteria (#2)
Telemetry (If Applicable)
- Suggested Signal(s): <signal names>

Dependencies
- (Optional list)

Out-of-Scope
- (Optional) Items intentionally excluded.
```

Issue Key Pattern: `A11Y-<increment>` starting at 1 (e.g., A11Y-1). Deterministic ordering: P1 issues first (sort by risk id), then P2, then P3.

JSON Mode (`OUTPUT_FORMAT=json`): Provide an `issuesBacklog` array of objects:
```
{
  "issueKey": "A11Y-1",
  "title": "Make cart icon keyboard accessible",
  "riskIds": ["Keyboard-cart-icon-1","Semantics-cart-icon-1"],
  "priority": "P1",
  "effort": "S",
  "specRefs": ["§8","§10"],
  "personas": ["TSA","ADHD"],
  "acceptanceCriteria": ["Cart trigger is a native button with aria-label","Focus visible outline present","Enter/Space activates cart"],
  "telemetrySignals": ["add_to_cart"],
  "problem": "...",
  "whyItMatters": "..."
}
```

Rules:
- Every risk id must appear in ≥1 issue.
- Each P1 risk must have a dedicated or combined issue (not merged with unrelated code domains).
- Acceptance criteria must be testable statements (start with a verb, no conjunctions that hide multiple conditions).
- Telemetry signals only if previously listed in metrics gaps mapping.

Effort Inference:
- If actionPlan specifies effort, reuse.
- If not, map severity High->M (unless trivial), Medium->M/S depending on scope, Low->S/XS.

Failure Handling:
- If a risk has no clear remediation path, still create an issue with placeholder acceptance criterion: "Remediation approach defined and approved".

## Constraints
- MUST include every mandated section even if empty → write "None Found" or "(empty)".
- Sentence soft limit 20 words (executive + recommendations); technical evidence can exceed.
- No remediation code; describe patterns only.
- Deterministic ordering of keys in JSON blocks.
- Every recommendation references at least one spec section (§6–§23) AND at least one evidence id.
- Do not invent telemetry; only suggest if gap logically tied to dimension.

## Acceptance Criteria
1. All 15 Output Sections present.
2. ≥2 flows analyzed (Phase E); if fewer provided, mark Blocked in Coverage.
3. Persona friction synthesis covers each supplied persona OR states "No significant friction observed".
4. Unified Risk Matrix includes every distinct dimension even if no High items (mark severity "None").
5. Action Plan: every P1 links to at least one High severity risk id.
6. No duplicate risk ids; ids stable pattern `DIM-kebab-slug-n`.
7. Metrics table lists at least 3 Present?=false gaps if instrumentation clearly absent in code scan.
8. No speculative architectural claims; each evidence cites file, component, or literal snippet.
9. JSON in Static Code section validates (syntactic structure, quoted keys & strings).
10. Executive Summary ≤10 bullets, each ≤18 words.
11. Issues Backlog produced: every risk.id mapped; table plus detail cards (markdown) or `issuesBacklog` array (json); no missing spec refs.

## Normalization & Merging Algorithm (Guidance for Agent Internals)
1. Collect raw finding objects from phases (treat each row or bullet as candidate).
2. Create signature: lowercased(dimension + primary file path + primary element/role if any).
3. Merge duplicates: union refs, concatenate distinct evidence fragments separated by `; `.
4. Recompute severity: if any merged item High → High; else if any Medium → Medium.
5. Populate Risk Matrix sorted by: High first, then Medium, then Low, then None.
6. Build Action Plan by grouping risks: one action can address multiple risk ids (list all ids in Evidence Ref).

## Example Unified Risk Matrix (Schema)
| Dimension | Severity | Risk IDs | Rationale (Condensed) | Recommended Mitigation Pattern | Spec Refs |

## Example Executive Summary Bullet Patterns
- Layout shifts in async catalog grid increase reorientation cost (High Predictability).
- Missing skip link reduces rapid navigation bypass (High Keyboard/Structure).
- Autosave absent in multi-step profile flow (High Recovery).

## Persona Mapping Legend
| Abbrev | Persona |
|--------|---------|
| TSA | Autistic Analytical |
| ADHD | ADHD Creative |
| HYB | Hybrid |

## Invocation Notes
If running sub-prompts independently first, you may supply their outputs inlined; otherwise the agent SHOULD internally perform equivalent extraction adhering to each embedded prompt's Acceptance Criteria.

## Appendix B – Method Notes (Expect in Output)
Explain: data sources (file scan patterns, heuristics), de-duplication logic, severity normalization approach, limitations (dynamic runtime behaviors not observable statically).

End of uber prompt.
