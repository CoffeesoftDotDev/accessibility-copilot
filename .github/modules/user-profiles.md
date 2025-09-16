# Neuro-Inclusive User Profiles (Detailed)

Version: 1.1  
Status: Active  
Parent Spec: `../instructions/a11y.instructions.md` (Sections 3, 10, 11 referenced)

Purpose: Provide operationally actionable, TSA (Autistic) and TDAH (ADHD) centered personas to drive design, content, QA and AI prompt decisions. Each persona includes: Strengths, Frictions, Sensory / Cognitive Triggers, Mitigations (Design + Content + Technical), Helpful Patterns, Anti-Patterns, Representative Scenarios, Success Metrics, and Prompt Guidance.

Use: During refinement, pick at least TWO distinct personas—ensure proposed solution meets both without regression. Log conflicts in Exception Log (§11 of parent instructions).

---

## 1. Persona: Autistic Analytical User (TSA-Analytical)
| Dimension | Detail |
|-----------|--------|
| Core Strengths | Pattern recognition, detail orientation, consistency monitoring, error spotting |
| Primary Frictions | Unexpected UI changes, noisy or dense layouts, ambiguous wording, forced multi-tasking, hidden state changes |
| Sensory / Cognitive Triggers | Sudden animation, auto-refresh, bright pulsing highlights, context loss after navigation |
| Emotional Risk Points | Anxiety from unclear next step; frustration if data lost; withdrawal if overwhelmed |
| Executive Function Factors | Prefers clear sequential flow and explicit structure; resists improvisation under ambiguity |
| Assistive Tech Overlap | May use browser extensions for contrast / styles; rarely screen reader unless co-occurring disability |

### 1.1 Mitigation Matrix
| Layer | Mitigation | Rationale |
|-------|-----------|-----------|
| Design | Stable grid; reserve empty states; avoid layout shift | Maintains predictability |
| Interaction | Explicit step labels (Step X of Y) | Reduces uncertainty |
| Content | Literal, concrete phrasing; avoid idioms | Minimizes semantic ambiguity |
| Technical | Deterministic focus management & no surprise reflow | Supports cognitive continuity |
| Feedback | Summarize changes (“3 items added to list”) | Supports state tracking |
| Recovery | Persistent drafts + undo | Lowers risk of punitive error |

### 1.2 Helpful Patterns
- Progressive disclosure (collapsible advanced sections)
- Side-by-side comparison blocks for choices
- Semantic headings forming a navigable outline
- Clear differentiation between primary vs secondary actions

### 1.3 Anti-Patterns (Flag Immediately)
| Anti-Pattern | Why Harmful |
|-------------|-------------|
| Auto-rotating carousel | Forces attention shift, unpredictability |
| Dynamic relayout of content above focus | Breaks spatial map |
| Ambiguous button labels ("Go", "Do it") | Increases decision friction |
| Hover-only disclosure of critical info | Obscures required state understanding |
| Typing simulation loaders | Artificial delay + sensory distraction |

### 1.4 Representative Scenarios
| Scenario | Risk | Required Adaptation |
|----------|------|--------------------|
| Multi-step onboarding with hidden total steps | Anxiety / abandonment | Add step index + summary checkpoint |
| Real-time feed updates pushing content | Loss of position | Offer manual refresh toggle |
| Long form resets on validation error | High frustration | Inline per-field validation + preserve data |

### 1.5 Success Metrics (Example)
| Metric | Target |
|--------|--------|
| Form abandonment (multi-step) | < 10% after step 1 |
| Undo usage after destructive action | > 40% (indicates discovery + safety) |
| Unexpected layout shift complaints (feedback channel) | 0 per release |

### 1.6 Prompt Authoring Guidance (AI)
Embed constraints: "Return deterministic section order; avoid figurative language; provide explicit numbered steps; summarize state changes in bullet form." 

---

## 2. Persona: ADHD Creative Navigator (TDAH-Creative)
| Dimension | Detail |
|-----------|--------|
| Core Strengths | Ideation bursts, fast pattern association, exploratory discovery |
| Primary Frictions | Working memory drops, time blindness, distraction from parallel stimuli, difficulty resuming interrupted tasks |
| Sensory / Cognitive Triggers | Overloaded dashboards, simultaneous animations, lack of immediate feedback on actions |
| Emotional Risk Points | Frustration from losing progress; discouragement if flow feels punitive |
| Executive Function Factors | Benefits from scaffolding (checklists, progress markers) and immediate reinforcement |
| Assistive Tech Overlap | May rely on reminders / focus extensions; prefers autofill and smart defaults |

### 2.1 Mitigation Matrix
| Layer | Mitigation | Rationale |
|-------|-----------|-----------|
| Design | Limit simultaneous focal regions; clear visual hierarchy | Reduces attentional splitting |
| Interaction | Autosave every 5–10s or on blur | Protects against context loss |
| Content | Short, action-driven sentences | Supports rapid reorientation |
| Technical | Optimistic UI updates with rollback | Immediate feedback maintains momentum |
| Feedback | Toasts that persist until dismissed OR log view | Prevents unnoticed transient states |
| Recovery | Draft restore banner on return | Enables task resumption |

### 2.2 Helpful Patterns
- Sticky summary / checkpoint bar
- Inline micro-progress markers (e.g., “3/7 fields complete”)
- Smart defaults + pre-filled templates
- Command palette or quick actions

### 2.3 Anti-Patterns
| Anti-Pattern | Why Harmful |
|-------------|-------------|
| Auto-expiring toasts (<5s) for key events | User misses confirmation |
| Mandatory long unbroken text blocks | Working memory overload |
| Hidden destructive actions in menus | Increases chance of impulsive mis-click |
| No visible progress in async tasks | User abandons or re-triggers |

### 2.4 Representative Scenarios
| Scenario | Risk | Required Adaptation |
|----------|------|--------------------|
| Draft blog lost after tab close | Abandonment | Autosave + restore notification |
| Long upload w/out progress | Repeated triggers | Provide progress bar + estimated time |
| Complex settings panel w/out grouping | Cognitive fatigue | Chunk into collapsible, labeled sections |

### 2.5 Success Metrics
| Metric | Target |
|--------|--------|
| Draft restoration success rate | ≥ 95% |
| Re-triggered identical async actions | < 5% of total async ops |
| Missed confirmation complaints | Declining trend release-over-release |

### 2.6 Prompt Authoring Guidance (AI)
Embed constraints: "Chunk instructions; surface primary action first; provide optional focus mode variant; re-state goal after each major section." 

---

## 3. Persona: Overlapping Neurodivergent (TSA+TDAH Hybrid)
| Dimension | Detail |
|-----------|--------|
| Core Strengths | Intense hyperfocus cycles, depth + breadth synthesis |
| Primary Frictions | Exhaustion from forced context switches, delayed feedback, multi-layer unpredictability |
| Sensory / Cognitive Triggers | Cascading modals, compound animations, asynchronous reshuffling of items |
| Emotional Risk Points | Overwhelm → shutdown or disengagement |
| Executive Function Factors | Needs both predictability AND scaffolding; benefits from resumable queues |
| Assistive Tech Overlap | Might combine style adjusters + focus timers |

### 3.1 Mitigation Matrix
| Layer | Mitigation | Rationale |
|-------|-----------|-----------|
| Design | Queue / backlog panel for pending tasks | Externalizes working memory |
| Interaction | Pause / resume for long workflows | Supports self-paced control |
| Content | Summaries at top + detail on demand | Reduces initial cognitive load |
| Technical | Deterministic ordering + idempotent actions | Prevents double-processing |
| Feedback | Batched notifications with log | Avoids notification scatter |
| Recovery | Session snapshot + multi-draft retention | Enables controlled task rotation |

### 3.2 Helpful Patterns
- Task queue with statuses (Pending / In Progress / Needs Action)
- Mode toggle: Focus Mode vs Overview Mode
- Collapsible “Details” sections defaulted closed
- Explicit change summaries after bulk operations

### 3.3 Anti-Patterns
| Anti-Pattern | Why Harmful |
|-------------|-------------|
| Surprise modals triggered by background events | Breaks mental focus frame |
| Interleaved auto-sorting lists | Causes positional disorientation |
| Required simultaneous multi-pane attention | Splits focus; induces fatigue |

### 3.4 Representative Scenarios
| Scenario | Risk | Required Adaptation |
|----------|------|--------------------|
| Bulk edit of items with live resort | Loss of orientation | Lock ordering until confirmed |
| Switching between 3 drafts loses 2 states | Abandonment | Persist + surface open draft list |
| Async completion triggers modal | Cognitive break | Route to notification log instead |

### 3.5 Success Metrics
| Metric | Target |
|--------|--------|
| Successful task switching without loss (self-report) | ≥ 90% |
| Reported disorientation events | Trend toward zero |
| Time to recover prior session | < 10 seconds |

### 3.6 Prompt Authoring Guidance (AI)
Embed constraints: "Offer both concise summary and expandable detail; avoid simultaneous multi-branch instructions; include optional queue representation." 

---

## 4. Comparative Needs Matrix
| Dimension | TSA Analytical | ADHD Creative | Overlapping Hybrid |
|-----------|---------------|---------------|--------------------|
| Predictability Need | Very High | Medium | High |
| Immediate Feedback Need | Medium | High | High |
| Progress Scaffolding | Moderate | High | High |
| Motion Sensitivity | High | Medium | High |
| Draft Persistence Importance | Medium | High | High |
| Tolerance for Parallel Stimuli | Low | Medium | Low |

---

## 5. Cross-Persona Design Convergence
Shared high-impact investments:
1. Persistent autosave + recoverable drafts
2. Deterministic, stable layout (no surprise shifts)
3. Progressive disclosure to stage complexity
4. Explicit step / progress indicators
5. Undo + reversible destructive actions
6. Motion reduction controls + respect for `prefers-reduced-motion`
7. Notification log (not ephemeral only)

---

## 6. Applying Personas in Workflow
| Phase | Action | Checklist Adaptation |
|-------|--------|----------------------|
| Discovery | Map tasks to persona friction points | Ensure at least 2 personas covered |
| Design Review | Run cognitive heuristic (§10 parent) per persona | Mark unmet mitigations |
| Implementation | Add instrumentation for metrics (draft restore, undo, progress) | Telemetry spec update |
| QA | Execute scenario table (Sections 1.4 / 2.4 / 3.4) | Log deviations |
| Release | Publish delta of metrics vs targets | Adjust next sprint backlog |

---

## 7. Metric Instrumentation Notes
| Metric | Signal Source | Implementation Hint |
|--------|---------------|---------------------|
| Draft restoration success | Local storage restore events | Emit custom event `draft_restored` |
| Undo usage | Undo component action dispatch | Count distinct entity reversals |
| Async action re-trigger rate | API call fingerprints within debounce window | Tag calls with correlation IDs |
| Layout shift complaints | In-app feedback form taxonomy | Filter for label `layout_shift` |
| Time to recover session | Timestamp from load → first restored draft | Track via perf marks |

---

## 8. AI Prompt Embedding Examples
| Use Case | Prompt Insert |
|----------|--------------|
| Generate help panel | "Return Summary first, Detailed Steps second, Recovery third. Sentences ≤ 20 words." |
| Summarize changes | "List changes as bullet list: (<entity>) <action>. No prose filler." |
| Create form microcopy | "Label clarity first; no metaphors; if error states, provide cause + resolution." |

---

## 9. Maintenance
- Review personas quarterly for emergent patterns.
- If a mitigation is deprecated, update both the persona section and parent instructions.
- Changes require version bump (append minor v1.x → v1.(x+1)).

---

End of user profiles (personas) module.
