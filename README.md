# Neuro-Inclusive Accessibility Audit Prompts

Central hub for agent prompts supporting TSA / ADHD focused accessibility & cognitive audits. These prompts operationalize the specification in `../instructions/a11y.instructions.md` (v2.0.0) and personas in `../modules/user-profiles.md`.

## 1. Prompt Inventory
| File | Purpose | Primary Output Types | When To Use | Spec Refs |
|------|---------|----------------------|-------------|-----------|
| `a11y-neuro-audit-overview.md` | Global maturity & gap snapshot | Report, checklist, risk matrix | Kick-off; executive summary; pre-planning | §§2,3,6,7,17,21,22 |
| `a11y-neuro-audit-static-code.md` | Static semantic & structural scan | Issue list, diff plan anchors | Early code review; CI gating candidate | §§6,7,8,9,12,17,18,22 |
| `a11y-neuro-audit-cognitive-flow.md` | Task / multi-step flow cognitive analysis | Flow report, persona friction matrix | Before/after redesign of major journey | §§2,3,6,7,8,17,21 |
| `a11y-neuro-audit-content.md` | Microcopy clarity & structural outline audit | Content findings, readability stats | Content freeze; copy QA sprint | §§7,17,22 |

## 2. Quick Decision Guide
| Situation | Use This Prompt | Rationale |
|-----------|----------------|-----------|
| Need a one-page state-of-accessibility summary | Overview | Consolidates risk + persona friction |
| Unsure if keyboard & semantics are correct | Static Code | Directly enumerates structural deviations |
| Users drop off mid-wizard / onboarding | Cognitive Flow | Maps orientation + memory friction |
| Drafts lost / undo not measurable | Architecture & Metrics | Surfaces missing persistence + signals |
| Complaints about ambiguous labels or unclear errors | Content | Targets copy & hierarchy clarity |

## 3. Recommended Workflow (Full Audit Cycle)
1. Overview → establish baseline & prioritize investigation areas.
2. Static Code + Content in parallel → feed concrete structural & textual issues.
3. Cognitive Flow → deep dive on top 2–3 critical journeys (checkout, onboarding, bulk actions).
4. Architecture & Metrics → verify instrumentation exists to measure remediation success.
5. Synthesis (outside prompt) → compile unified remediation backlog (P1/P2/P3) referencing spec sections.

## 4. Output Interoperability
- Static Code findings (JSON keys) can seed tickets automatically.
- Cognitive Flow persona friction table feeds risk matrix in Overview (section 9 of that prompt).
- Architecture metrics coverage table informs ongoing dashboards (map events to analytics pipeline).
- Content audit label ambiguities feed naming guidelines or component library updates.

## 5. Mapping Prompts to Spec Sections
| Spec Section | What To Validate | Prompt(s) |
|--------------|------------------|-----------|
| §2 Layer Model | Layer coverage & gaps | Overview, Cognitive Flow |
| §6 Structure | Landmarks, layout stability | Overview, Static Code |
| §7 Content | Plain language, lists, errors | Content, Overview |
| §8 Keyboard | Focus order, composites | Static Code |
| §9 Sensory | Motion toggle, minimal animation | Overview, Architecture |
| §12 Forms | Labels, errors, focus on invalid | Static Code, Content |
| §17 Checklist | Merge gate heuristics | Overview (checklist), Flow |
| §21 Metrics | Signal availability | Architecture & Metrics |
| §22 Anti-Patterns | Immediate blockers | All (esp. Static Code / Overview) |

## 5b. Full Spec Reference Index (Anchor §§6–§23)

Internal taxonomy used across all prompts (e.g., risk objects `risks.refs:["§8","§12"]`). This is not an official external standard; it consolidates WCAG, ARIA, and neuro‑inclusive heuristics (predictability, cognitive load reduction, reversibility). Do not renumber without a coordinated migration.

| Section | Theme (Concise) | Purpose Summary |
|---------|-----------------|-----------------|
| §6 | Structural & Predictability Foundations | Landmarks, spatial stability, reserved space |
| §7 | Copy & Label Clarity | Explicit labels, icon textual alternatives |
| §8 | Keyboard & Focus Mechanics | Operability, order, visible focus, no traps |
| §9 | Motion & Sensory Modulation | Moderate animations, respect prefers-reduced-motion |
| §10 | Semantic Integrity | Native HTML, correct roles/ARIA |
| §11 | State & Feedback Continuity | Persistent state announcements (live/status) |
| §12 | Recovery & Reversibility | Undo, drafts, soft delete safety nets |
| §13 | Error Communication | Field-linked, persistent, actionable errors |
| §14 | Progressive Disclosure | Gradual reveal / chunking for complexity control |
| §15 | Working Memory Offload | Recaps, anchored indices, structured summaries |
| §16 | Cognitive Load Reduction | Consistent grouping, stable formats |
| §17 | Flow Stability & Transitions | Predictable step boundaries & focus transitions |
| §18 | Notification Persistence & Accessibility | Differentiate ephemeral vs durable messages |
| §19 | Personalization & Preferences | User toggles (focus mode, reduced stimuli) |
| §20 | Data Density & Legibility | Spacing, readability, density balance |
| §21 | Instrumentation & Metrics | Usage / recovery event capture |
| §22 | Critical Anti‑Patterns | Immediate blockers (e.g., keyboard trap) |
| §23 | Governance & Exception Handling | Exception log & deferral tracking |

Note: Use these identifiers in every report for grouping, metrics, and governance traceability.

## 6. Persona Integration Expectations
All prompts reference persona friction either directly (Cognitive Flow) or via risk commentary (Overview). When running *any* audit:
- Choose at least 2 personas (TSA Analytical + ADHD Creative minimum).
- Record unmitigated friction as a ticket candidate.

## 7. Prioritization Heuristic
| Severity | Definition | Examples |
|----------|-----------|----------|
| P1 (Blocker) | Prevents task completion or causes disorientation or data loss | Missing focus restore; draft not persisted |
| P2 (High) | Creates cognitive friction repeatedly | Hidden total steps; ambiguous button text |
| P3 (Normal) | Degradation but workaround exists | Mild wording complexity; non-critical contrast nuance |
| P4 (Nice-to-have) | Optimization / polish | Additional summaries redundant with UI state |

## 8. Ticket Template Snippet
```
Title: [A11Y-Neuro][Severity] <Short Issue>
SpecRef: §8 (Keyboard) / §17 (Checklist Item 3)
Personas Impacted: TSA, ADHD
Observed: <Concise factual description>
Risk: <Disorientation / memory load / sensory overload>
Recommendation: <Fix pattern + reference>
Evidence: <File path / screenshot / JSON key>
```

## 9. Metrics to Instrument (Reference)
| Event | Purpose | Persona Benefit |
|-------|---------|-----------------|
| draft_restored | Persistence success | ADHD memory recovery |
| undo_action | Safety net usage | ADHD impulsivity / TSA risk aversion |
| layout_shift_feedback | Detect spatial unpredictability | TSA spatial mapping |
| async_retrigger_rate | Identify repeated triggers | ADHD impatience / double activation |

## 10. Extensibility Ideas
- Add `a11y-neuro-remediation-plan.md` to synthesize JSON outputs into an ordered backlog.
- Add automated script to pre-populate Static Code JSON fields.
- Introduce timing benchmark harness for input latency (<100ms target, §6/Performance).

## 11. Operational Tips
- Always run Overview first after major refactors.
- Re-run Static Code audit after component library upgrades.
- Validate Cognitive Flow after onboarding / checkout redesigns.
- Architecture & Metrics audit quarterly or before scaling events.
- Content audit before release freeze or tone/style refresh.

## 12. Limitations / Notes
- Prompts assume repository text search ability; dynamic runtime states (live ARIA mutations) need manual or automated browser instrumentation.
- Some issues (e.g., perceptual timing, real motion) require manual verification or tooling like Accessibility Insights + Lighthouse.

## 13. Changelog (Prompts Catalog)
| Date | Change | Notes |
|------|--------|-------|
| 2025-09-16 | Initial prompt suite creation | Derived from a11y spec v2.0.0 |

---
End of prompts catalog README.
