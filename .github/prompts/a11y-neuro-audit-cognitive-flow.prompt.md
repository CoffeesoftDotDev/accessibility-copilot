---
mode: 'agent'
description: 'Audit multi-step cognitive flows with autistic (ASC) / ADHD support focus'
tools: ['search','codebase','runTests','openSimpleBrowser','terminalLastCommand']
outputs: ['flowReport','personaMatrix']
---

# Cognitive Flow Audit (ASC / ADHD) — Multi-Step UX

## Objective
Evaluate multi-step flows for their ability to:
- Provide structure and predictability (Autistic / ASC needs)
- Offload working memory and support attentional regulation (ADHD needs)
- Prevent loss of progress and destructive actions
- Minimize sensory overload & unexpected layout shifts
- Support smooth resumption after interruption

## Flow Selection
Choose ≥2 cognitively loaded flows (e.g., Checkout, Create → Publish, Multi-step Settings, Bulk Edit).

## Evaluation Dimensions (Score 0–5)
| Dimension | Focus | 0 | 5 (Ideal) | Primary Signals |
|-----------|-------|---|-----------|-----------------|
| Orientation | Global wayfinding | No indicators | Visible steps + contextual state summary | Breadcrumb, Step X/Y, progress module |
| Predictability | Anticipatable transitions (ASC) | Abrupt shifts | Announced transitions + stable states | Persistent labels, consistent sequencing |
| Working Memory Relief | Offloading rules/data | No reminders | Minimal inline hints + recap surfaces | Hints, lateral summary, contextual recap |
| Focus / Distraction Control | Attention scaffolding (ADHD) | Parallel cognitive pulls | Focus mode / progressive reveal | Section collapse, reduced peripheral noise |
| Recovery | Resume after disruption | Total loss | Autosave + restorable snapshot + signal | Draft snapshot, restore banner |
| Non-Destructive Safety | Action safety | Immediate destructive | Undo + progressive confirmation | Time-buffer undo, soft delete |
| Feedback Timing | Temporal clarity | Opaque delay | Immediate + resolved state clarity | Optimistic UI, contextual loaders |
| Interactive Load | Action density | >12 at once | ≤7 primary visible; clear hierarchy | Grouping, de-prioritized secondary set |
| Sensory Stability | Visual calmness | Reflows / flashing | Layout stability + smooth transitions | Honors prefers-reduced-motion |
| Change Transparency | Understanding impact | Black box | Clear delta summary post-action | Structured change recap |
| Cumulative Executive Load | Overall cognitive cost | Fragmented / erratic | Segmented with milestone anchors | Graduated checkpoints |

## Specific Metrics
| Metric | Description | Format |
|--------|-------------|--------|
| Interactive Density | # visible interactive controls per step | Number + classification (Primary/Secondary/Tertiary) |
| Recovery Latency | Steps or seconds required to resume after simulated interruption | Numeric |
| Context Stability Index | (Non-disruptive transitions / total transitions) | 0–1 |
| Undo Coverage | % destructive actions with recovery path | Percentage |
| Offload Surface Count | # surfaces that replace memory reliance (recap, hints, persistent panels) | Count |
| Persona Impact Weight | Weighting ASC / ADHD friction severity | 1–3 |

## Method
1. Map steps (triggers + transitions).
2. Count density (≤7 target; >10 = potential overload).
3. Identify risk events (loss, destructive, ambiguity).
4. Capture recovery vectors (undo, autosave, restore, safe re-entry).
5. Annotate friction per persona (ASC, ADHD, Hybrid).
6. Record sensory signals (motion, reflow, abrupt disappearance).
7. Apply scoring (0–5) + persona weighting for severe friction.
8. Generate cognitive heatmap.

## Persona Signals — Normalized Examples
| Signal | ASC Importance | ADHD Importance |
|--------|----------------|-----------------|
| Persistent progress anchors | Critical | Helpful |
| Collapsing non-essential sections | Helpful | Critical |
| Undo buffer for destructive actions | Helpful | Critical |
| Lateral auto-recap panel | Helpful | Critical |
| Announced state transition | Critical | Helpful |
| Focus mode (reduced distractions) | Helpful | Critical |
| Contextual delayed feedback explanation | Helpful | Critical |
| Predictable element ordering | Critical | Helpful |

## Output — Sections (Order Required)
1. Flows Analyzed
2. Step Maps
3. Cognitive Metrics Table
4. Persona Friction Matrix
5. Cognitive Risk Register
6. Recovery & Safety Net Inventory
7. Heatmap (Step vs Dimensions)
8. Scores Summary (with weighting)
9. Recommendations (prioritized + evidence)
10. Appendix (Method & Definitions)

### Step Maps
| Flow | Step | Trigger | View State | Interactive Density (P/S/T) | Notes |

### Cognitive Metrics Table
| Flow | Metric | Value | Target | Deviation | Commentary |

### Persona Friction Matrix
| Flow | Step | Persona | Friction (Literal) | Mitigation Present? | Gap | Ref |

### Cognitive Risk Register
| Flow | Step | Risk Type | Description | Severity (L/M/H) | Current Mitigation | Gap | Ref |

### Recovery & Safety Net Inventory
| Mechanism | Present? | Coverage | Notes |

### Heatmap (Example)
| Step | Orientation | Predictability | Focus | Recovery | Interactive Load | Mean Score |
(Use 0–5; mark >10 interactive controls as ⚠)

### Scores Summary (0–5)
| Flow | Orientation | Predictability | Memory Relief | Focus | Recovery | Non-Destructive | Feedback | Stability | Exec Load | Overall (Weighted) |

Suggested weighting (adjustable):
- Recovery: x1.3
- Focus: x1.2
- Predictability (for ASC-heavy flows): x1.2

### Recommendations
Format:
| Priority | Recommendation | Dimension(s) | Persona Impact | Evidence Ref | Expected Gain |

Rules:
- No speculation: tie each recommendation to observed signal.
- If no friction for persona in a step: explicitly state “No significant friction observed”.
- If a table is empty: still render it + mark “(empty)”.

## Acceptance Criteria
- ≥2 flows audited.
- Each persona has ≥1 friction OR explicit absence statement.
- All tables present (even if empty).
- Scores justified by cited signals.
- No invented mitigation lacking observation.

## Scoring Guide
| Score | Description |
|-------|-------------|
| 0 | Absent / Antithetical |
| 1 | Very insufficient |
| 2 | Partial / Fragile |
| 3 | Functional baseline |
| 4 | Solid with minor gaps |
| 5 | Exemplary / Model state |