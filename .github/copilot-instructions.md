# Neuro-Inclusive Accessibility Instructions (TSA / TDAH Focus)

## 1. Purpose & Scope
Provide a single canonical, neuro-inclusive accessibility operating reference emphasizing pragmatic WCAG 2.2 AA conformance PLUS cognitive usability for autistic (TSA) and ADHD (TDAH) users. This governs: 
- Design reviews
---
description: "Neuro-inclusive accessibility operating reference (WCAG 2.2 AA + TSA/TDAH cognitive support)"
applyTo: "**"
version: 2.0.0
status: Active
lastUpdated: 2025-09-16
---

# Neuro-Inclusive Accessibility Instructions (TSA / TDAH Focus)

This document is the SOURCE OF TRUTH for accessibility + cognitive support standards in this repository. It merges classic a11y (WCAG 2.2 AA) with neuro-inclusive patterns (personas: see `./modules/user-profiles.md`). Any net-new rule or exception MUST land here first.

## 1. Scope & Intent
Applies to: design, frontend & backend rendering, content/microcopy, AI prompt authoring, QA, automation.
Goals:
- Guarantee perceivable, operable, understandable and robust UI (WCAG 2.2 AA baseline).
- Reduce working memory strain (ADHD) & preserve predictability (Autistic analytical) while supporting hybrid overlaps.
- Provide reversible, low-risk exploration (undo, drafts, pause/resume) to minimize punitive failure.

## 2. Layered Cognitive & Accessibility Model
| Layer | Objective | TSA / TDAH Rationale | Example Practices |
|-------|-----------|----------------------|------------------|
| Baseline Compliance | WCAG 2.2 AA floor | Ensures core AT compatibility | Semantic HTML, contrast, focus order |
| Predictability | Spatial + temporal stability | Autism: anxiety reduction | Stable nav order; reserved space for async content |
| Cognitive Load Reduction | Minimize memory juggling | ADHD: task re-entry & continuity | Progressive disclosure; chunk forms |
| Executive Function Support | Externalize sequencing & progress | ADHD planning; hybrid switching | Step counters; micro-progress markers |
| Sensory Modulation | Avoid overload / startle | Autism sensory sensitivity | Motion toggle; reduced flashing; subtle transitions <150ms |
| Error Prevention & Recovery | Safety & reversibility | Impulsivity + rule adherence | Inline validation; undo ≥10s; autosave draft |
| Autonomy & Customization | Self pacing & mode shifting | Both need control of stimuli | Focus mode; queue / backlog panel |

## 3. Personas (Operational Snapshot)
Full details: `./modules/user-profiles.md` (v1.1). Use at least TWO personas during design review; log trade-offs in §14 (Exception Log).
| Persona | Frictions (Condensed) | Critical Mitigations |
|---------|-----------------------|----------------------|
| TSA Analytical | Layout shift, ambiguous labels, surprise updates | Deterministic layout, literal copy, change summaries |
| ADHD Creative | Working memory lapses, time blindness, missed transient feedback | Autosave, persistent notifications/log, progress scaffolding |
| Hybrid | Context switching fatigue, multi-layer unpredictability | Task queue, resumable sessions, stable ordering |

## 4. Bias & Inclusive Language
Use people-first or identity-affirming language contextually (“autistic person” accepted by many communities; avoid pathologizing). No metaphors for cognition (“brain damage”, “lazy”). Avoid assumptions of capability; describe observable interaction states.

## 5. Roles & Definition of Done
| Role | Added Cognitive DoD Criteria |
|------|------------------------------|
| Design | Annotate wireframes: motion points, progressive disclosure rationale, step counts |
| Dev | Pass keyboard spec & cognitive checklist (§13); no unreviewed ARIA; CLS < 0.1 |
| Content | Plain language (≤ 25 words/sentence avg), headings form outline, action-first labels |
| QA | Scenario validation: draft restore, undo, pause/resume, notification log persistence |
| Prompt Author | Embed formatting + cognitive constraints (persona pair) |
| Maintainer | Enforce exception logging; track metric instrumentation coverage |

## 6. Global Structural Requirements
1. Landmarks: exactly one `<main>`; persistent `<nav>` order; optional `<aside>` for secondary context.
2. Skip Link: First focusable element; visible on focus (bypass header/nav to `#main`).
3. Heading Hierarchy: Single `<h1>` per view; no level skipping unless content injection is dynamic (log if so).
4. Layout Stability: Reserve space for async content (skeletons or min-height placeholders). Target cumulative layout shift (CLS) ≤ 0.1.
5. Motion Control: Respect `prefers-reduced-motion`; offer in-app “Reduce Motion” toggle (persisted). Non-essential animation ≤150ms, opacity/transform only.
6. Theming & Contrast: Text contrast ≥4.5:1 (<18.5px normal), ≥3:1 large/bold; interactive indicators state contrast ≥3:1; do not rely on hue only.
7. Input Latency: 100ms target (avoid cognitive “jank loading”). Defer non-critical hydration.
8. Undo & Drafts: Provide undo for destructive actions (≥10s or explicit dismiss). Autosave interactive drafts every 5–10s or on blur.

## 7. Content & Microcopy Standards
| Dimension | Rule | Rationale |
|----------|------|-----------|
| Reading Level | ≤ CEFR B1 / Grade ~8 | Reduces decoding overhead |
| Sentence Length | ≤ 25 words soft; split clauses | Working memory retention |
| Copy Tone | Literal, non-figurative by default | Avoids ambiguity for TSA |
| Lists | Use for ≥3 sibling concepts | Chunking |
| Error Style | Cause + impact + resolution | Recovery confidence |
| Time & Date | ISO 8601 (YYYY-MM-DD), 24h | Eliminates interpretation |
| Action Labels | Verb-first / outcome oriented | Faster scan & mapping |
| Change Summaries | Summarize batch changes (“3 items added”) | State continuity |

## 8. Keyboard Accessibility (Enhanced TSA/TDAH Focus)
Baseline: All interactive elements reachable in logical reading order. No keyboard trap. Use native elements first.
### 8.1 Focus & Order
- Do not reorder focus with positive tabindex; manage visually with CSS only.
- Programmatic focus moves must be purposeful (modals, error summary). Return focus to invoking control on close.
### 8.2 Skip / Bypass
Provide `Skip to main` link (pattern in §16.1) and additional skip points for highly repetitive side nav if > 15 focus stops.
### 8.3 Composite Widgets
Use roving tabindex OR `aria-activedescendant` (choose one):
- Roving for small sets (tabs, menus).  
- `aria-activedescendant` for large virtualized lists/grids.
Algorithm (Roving): one `tabindex="0"` active, others `-1`; arrow keys rotate; update active then `.focus()`.
### 8.4 Escape & Recovery
- ESC closes topmost dismissible surface (menu, dialog, popover).  
- Provide visible focus outline ≥3:1 contrast; never remove default without replacement.

## 9. Low Vision & Sensory Modulation
- Maintain contrast ratios (text, icons, focus rings).  
- Avoid simultaneous competing motion (one animated region at a time).  
- Provide optional focus mode: hide ancillary panels (persist choice).  
- Maintain spatial anchors: no auto-reflow pushing focus origin upward.

## 10. Screen Reader & Semantic Guidance
| Aspect | Guideline |
|--------|-----------|
| Landmarks | header, nav, main, complementary (if needed), footer—one main only |
| Headings | Reflect visual structure; no decorative heading levels |
| Names / Roles | Prefer native semantics; ARIA only if necessary |
| Live Regions | Reserve for critical state deltas; coalesce batch updates |
| Iconography | Decorative icons: `aria-hidden="true"`; meaningful: accessible name via `<title>` or `aria-label` |
| Dynamic Panels | Announce via focus shift or polite live region summary, not both |

## 11. Voice Access Support
- Accessible name must contain visible label text (label-in-name).  
- Avoid ambiguous duplicates (“Edit”, “View”)—disambiguate (`aria-label="Edit profile"`).  
- Provide consistent verbs across similar actions.

## 12. Forms & Validation
| Requirement | Implementation |
|-------------|---------------|
| Labels | `<label for>` or wrapping; no placeholder-only |
| Required | Visual asterisk + `aria-required="true"` |
| Errors | Inline near field + summary (optional) |
| Programmatic Error State | `aria-invalid="true"` removed when resolved |
| Focus on Submit Failure | Move to first invalid control with explanation |
| Help Text | Associate via `aria-describedby` |
| Autosave | Draft field groups every 5–10s / blur |

## 13. Images / Graphics
Determine informative vs decorative:
- Informative: meaningful new info → `<img alt="Meaningful description"/>` OR `role="img" aria-label="…"`.
- Decorative: `<img alt=""/>` or `aria-hidden="true"`.
State-progress icons must have textual fallback (visually hidden) if not redundant with adjacent text.

## 14. Navigation & Menus
Pattern: semantic `<nav>` + list. Do NOT use `role=menu` for site nav. Use roving tabindex among top-level triggers. Submenu expansion toggles `aria-expanded` & `hidden` attribute on nested list. ESC collapses current open submenu, second ESC returns focus to trigger.

## 15. Tables & Grids
| Type | Use | Key Semantics |
|------|-----|---------------|
| Data Table | Static structured info | `<table>`, `<th>` headers (row/col) |
| Interactive Grid | Dynamic selection / navigation | `role="grid"`, rows with `role="row"`, cells `role="gridcell"` |
Rules: Always group gridcells inside rows. Use `aria-selected` for selection not `aria-pressed`. Avoid complex spanning if simpler multiple tables suffice (cognitive load).

## 16. Code Patterns & Snippets
### 16.1 Skip Link
```html
<a href="#main" class="skip-link">Skip to main content</a>
```
```css
.skip-link{position:absolute;left:-999px;top:0}
.skip-link:focus{left:0;z-index:1000;background:#fff;color:#000;padding:.5rem;outline:2px solid #000}
```
### 16.2 Roving Tabindex (Simplified Tabs)
```js
function initTabs(root){
	const tabs=[...root.querySelectorAll('[role=tab]')];
	let index=tabs.findIndex(t=>t.getAttribute('aria-selected')==='true');
	if(index<0){index=0;tabs[0].setAttribute('aria-selected','true');}
	tabs.forEach((t,i)=>t.tabIndex=i===index?0:-1);
	root.addEventListener('keydown',e=>{
		if(['ArrowRight','ArrowLeft'].includes(e.key)){
			e.preventDefault();
			tabs[index].setAttribute('aria-selected','false');
			tabs[index].tabIndex=-1;
			index=(e.key==='ArrowRight'?index+1:index-1+tabs.length)%tabs.length;
			tabs[index].setAttribute('aria-selected','true');
			tabs[index].tabIndex=0;
			tabs[index].focus();
		}
	});
}
```

## 17. Cognitive Heuristic Checklist (Gate Before Merge)
Answer Yes / N/A:
1. Primary action identifiable ≤3s?
2. ≤7 interactive elements in initial viewport (excluding global nav)?
3. Step counts visible for multi-step flows?
4. All progress recoverable after refresh?
5. Motion suppressible (media query + toggle)?
6. Errors descriptive (cause+resolution) inline?
7. Layout stable during async loads (no jump)?
8. Icons either labeled or hidden? 
9. DOM order equals visual reading order? 
10. Time constraints adjustable or absent? 
11. Draft / undo instrumentation present? 
12. Notification log accessible (not ephemeral only)?

## 18. Tooling & Automation
| Layer | Requirement | Metric |
|-------|-------------|--------|
| Lint | ESLint + a11y plugin blocks critical | 0 new critical per PR |
| Axe Scan | CI diff vs baseline | Δ <= 0 unless justified |
| Lighthouse | CLS, TBT, LCP budgets enforced | Pass budget |
| Unit Tests | Keyboard traversal + ARIA state | 100% custom widget coverage |
| E2E | Draft restore, undo, pause/resume flows | Scenarios pass |
| Metrics | Emit `draft_restored`, `undo_action`, `layout_shift_feedback` | Events captured |

## 19. Exception & Decision Log
Append rows (no deletions):
| Date | Component / Area | Rule Relaxed | Justification | Mitigation | Owner |
|------|------------------|--------------|--------------|------------|-------|
| YYYY-MM-DD | Header carousel | Motion restricted variant only | Marketing requirement | Added manual advance + reduced motion mode | name |

## 20. Governance & Change Control
1. Open issue: rationale + impacted personas + WCAG mapping.
2. Review: a11y reviewer + maintainer.
3. Merge: bump version minor (frontmatter `version`).
4. Communicate: changelog commit summary.
5. Sunset: mark deprecated patterns; remove after 2 release cycles.

## 21. Metrics Mapping (Traceability)
| Goal | Signals |
|------|---------|
| Working memory relief | Autosave success, reduced re-triggered async actions |
| Predictability | Fewer layout shift feedback tags |
| Progress retention | Draft restore success ≥95% |
| Sensory comfort | Reduced motion toggle usage tracked (no spikes in complaints) |
| Error recovery | Undo usage & low re-error after correction |

## 22. Anti-Patterns (Immediate Blockers)
| Category | Anti-Pattern | Why Harmful |
|----------|-------------|-------------|
| Focus | Arbitrary jumps without user intent | Disorientation |
| Motion | Auto-rotating carousel w/out controls | Forced attention shift |
| Text | Typing simulation loaders | Artificial wait / distraction |
| Forms | Placeholder-only labels | Memory burden + AT failure |
| Structure | Multiple `<main>` or missing headings | Navigational collapse |
| Feedback | Auto-expiring critical toasts (<5s) | Missed state confirmation |
| Color | State only by hue | Excludes low vision & color-blind users |

## 23. AI Prompt Guidelines
Embed persona constraints explicitly:
"Return deterministic section order; chunk instructions; provide literal labels; add change summary; offer optional focus mode variant." Reference checklist (§17) in acceptance criteria for generated artifacts.

## 24. WCAG 2.2 Official Reference

Official documentation: **[Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/WAI/standards-guidelines/wcag/fr)** | [Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/?versions=2.2)

This project targets **Level AA** conformance. The table below lists all WCAG 2.2 success criteria. Criteria marked ★ are new in 2.2; criteria marked ⊕ were added in 2.1.

### Principle 1 — Perceivable

| # | Success Criterion | Level | Summary |
|---|---|---|---|
| 1.1.1 | Non-text Content | A | All non-text content has a text alternative |
| 1.2.1 | Audio-only / Video-only (Prerecorded) | A | Alternative provided for prerecorded audio/video-only |
| 1.2.2 | Captions (Prerecorded) | A | Captions for all prerecorded audio in synchronized media |
| 1.2.3 | Audio Description or Media Alternative | A | Audio description or text alternative for prerecorded video |
| 1.2.4 | Captions (Live) | AA | Captions for live audio content |
| 1.2.5 | Audio Description (Prerecorded) | AA | Audio description for all prerecorded video |
| 1.2.6 | Sign Language (Prerecorded) | AAA | Sign language interpretation for prerecorded audio |
| 1.2.7 | Extended Audio Description | AAA | Extended audio description when pauses are insufficient |
| 1.2.8 | Media Alternative (Prerecorded) | AAA | Text alternative for all prerecorded synchronized media |
| 1.2.9 | Audio-only (Live) | AAA | Alternative for live audio-only content |
| 1.3.1 | Info and Relationships | A | Structure and relationships are programmatically determinable |
| 1.3.2 | Meaningful Sequence | A | Correct reading sequence is programmatically determinable |
| 1.3.3 | Sensory Characteristics | A | Instructions do not rely solely on shape, color, size, or sound |
| 1.3.4 | Orientation ⊕ | AA | Content not restricted to single display orientation |
| 1.3.5 | Identify Input Purpose ⊕ | AA | Input field purpose is programmatically determinable |
| 1.3.6 | Identify Purpose ⊕ | AAA | Purpose of UI components, icons, and regions is determinable |
| 1.4.1 | Use of Color | A | Color is not the only visual means of conveying information |
| 1.4.2 | Audio Control | A | Mechanism to pause/stop/control auto-playing audio (>3s) |
| 1.4.3 | Contrast (Minimum) | AA | Text contrast ratio ≥4.5:1 (≥3:1 for large text) |
| 1.4.4 | Resize Text | AA | Text resizable up to 200% without loss of functionality |
| 1.4.5 | Images of Text | AA | Use real text instead of images of text |
| 1.4.6 | Contrast (Enhanced) | AAA | Text contrast ratio ≥7:1 (≥4.5:1 for large text) |
| 1.4.7 | Low or No Background Audio | AAA | Background audio ≥20dB lower than foreground speech |
| 1.4.8 | Visual Presentation | AAA | Configurable colors, width ≤80ch, no justification, line spacing |
| 1.4.9 | Images of Text (No Exception) | AAA | Images of text only for decoration or essential presentation |
| 1.4.10 | Reflow ⊕ | AA | No two-dimensional scrolling at 320px width / 256px height |
| 1.4.11 | Non-text Contrast ⊕ | AA | UI components and graphics have ≥3:1 contrast ratio |
| 1.4.12 | Text Spacing ⊕ | AA | No loss of content when overriding text spacing properties |
| 1.4.13 | Content on Hover or Focus ⊕ | AA | Additional content is dismissible, hoverable, and persistent |

### Principle 2 — Operable

| # | Success Criterion | Level | Summary |
|---|---|---|---|
| 2.1.1 | Keyboard | A | All functionality operable via keyboard |
| 2.1.2 | No Keyboard Trap | A | Focus can always be moved away using keyboard |
| 2.1.3 | Keyboard (No Exception) | AAA | All functionality via keyboard, no exceptions |
| 2.1.4 | Character Key Shortcuts ⊕ | A | Single-character shortcuts can be turned off or remapped |
| 2.2.1 | Timing Adjustable | A | Time limits can be turned off, adjusted, or extended |
| 2.2.2 | Pause, Stop, Hide | A | Moving/blinking/scrolling content can be paused or stopped |
| 2.2.3 | No Timing | AAA | Timing is not essential (except real-time events) |
| 2.2.4 | Interruptions | AAA | Interruptions can be postponed or suppressed |
| 2.2.5 | Re-authenticating | AAA | Activity continues without data loss after re-authentication |
| 2.2.6 | Timeouts ⊕ | AAA | Users warned of inactivity timeout that causes data loss |
| 2.3.1 | Three Flashes or Below Threshold | A | No content flashes more than 3 times/second |
| 2.3.2 | Three Flashes | AAA | No content flashes more than 3 times/second (strict) |
| 2.3.3 | Animation from Interactions ⊕ | AAA | Motion animation from interactions can be disabled |
| 2.4.1 | Bypass Blocks | A | Mechanism to bypass repeated content blocks |
| 2.4.2 | Page Titled | A | Pages have descriptive titles |
| 2.4.3 | Focus Order | A | Focus order preserves meaning and operability |
| 2.4.4 | Link Purpose (In Context) | A | Link purpose determinable from text or context |
| 2.4.5 | Multiple Ways | AA | Multiple ways to locate a page within a set |
| 2.4.6 | Headings and Labels | AA | Headings and labels describe topic or purpose |
| 2.4.7 | Focus Visible | AA | Keyboard focus indicator is visible |
| 2.4.8 | Location | AAA | User's location within a set of pages is available |
| 2.4.9 | Link Purpose (Link Only) | AAA | Link purpose determinable from link text alone |
| 2.4.10 | Section Headings | AAA | Section headings organize the content |
| 2.4.11 | Focus Not Obscured (Minimum) ★ | AA | Focused component not entirely hidden by author content |
| 2.4.12 | Focus Not Obscured (Enhanced) ★ | AAA | No part of focused component hidden by author content |
| 2.4.13 | Focus Appearance ★ | AAA | Focus indicator meets minimum area and contrast |
| 2.5.1 | Pointer Gestures ⊕ | A | Multipoint gestures have single-pointer alternative |
| 2.5.2 | Pointer Cancellation ⊕ | A | Single-pointer functions use up-event or allow abort/undo |
| 2.5.3 | Label in Name ⊕ | A | Accessible name contains the visible label text |
| 2.5.4 | Motion Actuation ⊕ | A | Motion-operated functions have UI alternative |
| 2.5.5 | Target Size (Enhanced) ⊕ | AAA | Pointer targets ≥44×44 CSS pixels |
| 2.5.6 | Concurrent Input Mechanisms ⊕ | AAA | Input modalities not restricted |
| 2.5.7 | Dragging Movements ★ | AA | Dragging has single-pointer alternative |
| 2.5.8 | Target Size (Minimum) ★ | AA | Pointer targets ≥24×24 CSS pixels (with spacing rules) |

### Principle 3 — Understandable

| # | Success Criterion | Level | Summary |
|---|---|---|---|
| 3.1.1 | Language of Page | A | Default language programmatically determinable |
| 3.1.2 | Language of Parts | AA | Language of passages/phrases programmatically determinable |
| 3.1.3 | Unusual Words | AAA | Mechanism to identify definitions of jargon/idioms |
| 3.1.4 | Abbreviations | AAA | Mechanism for expanded form of abbreviations |
| 3.1.5 | Reading Level | AAA | Supplemental content for advanced reading level text |
| 3.1.6 | Pronunciation | AAA | Mechanism to identify pronunciation of ambiguous words |
| 3.2.1 | On Focus | A | Receiving focus does not initiate a change of context |
| 3.2.2 | On Input | A | Changing a setting does not auto-change context without warning |
| 3.2.3 | Consistent Navigation | AA | Repeated navigation in same relative order |
| 3.2.4 | Consistent Identification | AA | Same functionality identified consistently |
| 3.2.5 | Change on Request | AAA | Context changes only by user request |
| 3.2.6 | Consistent Help ★ | A | Help mechanisms in consistent location across pages |
| 3.3.1 | Error Identification | A | Errors automatically identified and described in text |
| 3.3.2 | Labels or Instructions | A | Labels/instructions provided for user input |
| 3.3.3 | Error Suggestion | AA | Correction suggestions provided when errors detected |
| 3.3.4 | Error Prevention (Legal, Financial, Data) | AA | Submissions are reversible, checked, or confirmable |
| 3.3.5 | Help | AAA | Context-sensitive help is available |
| 3.3.6 | Error Prevention (All) | AAA | All submissions are reversible, checked, or confirmable |
| 3.3.7 | Redundant Entry ★ | A | Previously entered info auto-populated or selectable |
| 3.3.8 | Accessible Authentication (Minimum) ★ | AA | No cognitive function test required for authentication |
| 3.3.9 | Accessible Authentication (Enhanced) ★ | AAA | Stricter: no object recognition or personal content tests |

### Principle 4 — Robust

| # | Success Criterion | Level | Summary |
|---|---|---|---|
| 4.1.1 | Parsing | A | Complete tags, proper nesting, unique IDs (always satisfied in HTML) |
| 4.1.2 | Name, Role, Value | A | Name and role programmatically determinable for all UI components |
| 4.1.3 | Status Messages ⊕ | AA | Status messages determinable by AT without receiving focus |

> **Legend:** ★ = New in WCAG 2.2 | ⊕ = Added in WCAG 2.1 | Unmarked = WCAG 2.0 original

## 25. Module References
| Module | Status |
|--------|--------|
| modules/user-profiles.md | Active (v1.1) |
| modules/aria-anti-patterns.md | Planned |
| modules/audit-template.md | Planned |
| modules/lexicon.md | Planned |
| prompts/index.md | Planned |

---
End of neuro-inclusive accessibility specification.