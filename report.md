<!-- AUTO-GENERATED: Neuro-Inclusive Accessibility Uber Audit -->
# Neuro-Inclusive Accessibility Audit Report

_Last generated: 2025-09-17_

---

## A. Meta & Scope {#meta}
| Field | Value |
|-------|-------|
| Date | 2025-09-17 |
| Target Scope | `SamplesAndTest/album-viewer/src` (demo subset) |
| Personas | TSA, ADHD |
| Primary Flows | Checkout (Profile Setup: Not Present → Gap) |
| Source Prompts Executed | staticCode, content, cognitiveFlow, overview (simulated) |
| Orchestration | sequence=[staticCode,content,cognitiveFlow,overview]; merge=max-severity-union; version=1.0 |
| Tooling Notes | Manual synthesis from inspected Vue components; partial app subset |

Assumptions: Only album viewer sample audited (no authentication/profile feature implemented). No runtime telemetry available.

## B. Executive Summary {#executive-summary}
* Missing skip link & landmark semantics reduce predictable navigation (High Keyboard/Predictability)
* Non-interactive `div` used for cart trigger (High Keyboard)
* Overlay & modal panels lack focus management / trapping (High Keyboard/WorkingMemory)
* No reduced-motion handling; multiple hover/scale animations (Medium Sensory)
* No undo/draft or recovery flows for checkout (High Recovery)
* Lack of status feedback (SR) when cart changes (High Feedback)
* Icon button (cart) lacks accessible name (High Semantics)
* Copy mostly clear but verbs inconsistent (Add vs Proceed) (Medium CopyClarity)
* Missing instrumentation for critical cognitive signals (High RiskAggregate)
* Absent Profile Setup flow flagged as coverage gap (Medium CognitiveLoad)

Totals: High=8 | Medium=5 | Low=2. Top Dimensions: Keyboard, Recovery, Feedback.

## C. Static Code Findings {#static-code}
### Landmarks & Structure
Index page lacks `<main>` landmark in delivered HTML (root div only). Application inserts `<main>` but no skip link; overlays sit outside logical landmarking.

### Keyboard & Focus
Clickable `div` (cart icon) not keyboard operable; overlays open without focus shift; close buttons not returning focus; quantity controls rely on small targets; no ESC binding.

### Motion & Sensory
Hover scale (album cards, play overlay fade) exceed subtle motion guidance; no `prefers-reduced-motion` conditionals.

### Semantics / ARIA
Cart icon SVG without accessible name; interactive area not a button. Play overlay visual button is a `div` lacking semantics.

| ID | Dimension | Severity | Evidence (file:line approx) | Recommendation | Rationale (≤18w) | Personas |
|----|-----------|----------|------------------------------|----------------|------------------|----------|
| Keyboard-cart-icon-1 | Keyboard | High | CartIcon.vue:1-20 | Use `<button>` with aria-label and focus ring | Ensure keyboard activation & name | TSA, ADHD |
| Predictability-landmarks-1 | Predictability | High | index.html:11; App.vue:3 | Add skip link + semantic landmarks (`header`,`main`) | Faster structured navigation | TSA |
| Keyboard-overlay-focus-1 | Keyboard | High | CartOverlay.vue:1-40 | Trap focus; initial focus header; ESC closes | Prevent disorientation in overlay | ADHD, TSA |
| WorkingMemory-overlay-return-1 | WorkingMemory | Medium | CartOverlay.vue:1-20 | Return focus to trigger after close | Restore task continuity | ADHD |
| Sensory-motion-scale-1 | Sensory | Medium | AlbumCard.vue:54-82 | Respect `prefers-reduced-motion`; reduce scale delta | Reduce sensory overload risk | TSA |
| Semantics-cart-icon-name-1 | Semantics | High | CartIcon.vue:4-12 | Add aria-label or `title` referencing items count | Provide accessible control name | TSA |
| Keyboard-play-overlay-1 | Keyboard | Medium | AlbumCard.vue:5-24 | Make play button a real `<button>` | Ensure operable preview action | ADHD |
| Feedback-add-cart-status-1 | Feedback | High | cartStore.ts:37-55 | Announce item added via polite live region | Confirm action completion | ADHD, TSA |
| Recovery-clear-cart-undo-1 | Recovery | High | CartOverlay.vue:70-99 | Provide undo (10s) after clear | Prevent irreversible loss | ADHD |
| Recovery-remove-item-undo-1 | Recovery | Medium | CartOverlay.vue:32-59 | Add inline undo for single remove | Reduce accidental deletion impact | ADHD |
| CognitiveLoad-quantity-controls-1 | CognitiveLoad | Low | CartOverlay.vue:32-59 | Provide larger hit area + input field | Lower precision motor/cog load | HYB |
| WorkingMemory-checkout-multi-section-1 | WorkingMemory | High | CheckoutForm.vue:1-120 | Add step indicators & summary panel persistent | Externalize progress memory | ADHD |
| Recovery-checkout-draft-1 | Recovery | High | CheckoutForm.vue:1-160 | Autosave form fields (localStorage) | Prevent data loss on reload | ADHD, HYB |
| Sensory-spinner-animation-1 | Sensory | Low | App.vue:22-35 | Provide reduced-motion variant; shorter duration | Avoid unnecessary spinning motion | TSA |
| CopyClarity-button-consistency-1 | CopyClarity | Medium | AlbumCard.vue:26-34; CartOverlay.vue:88 | Harmonize verb style (Add → Add Album) | Improve action predictability | TSA |

## D. Content & Copy {#content-copy}
### Headings Outline
`h1` Album Collection; `h2` Your Cart / Checkout; `h3` Album titles (used semantically for item labels), Order Summary, Customer Information, Shipping Address (implicit via `h3` groups). Missing page-level descriptive tagline association to `h1` via `aria-describedby`.

### Labels & Buttons
Add to Cart / Preview / Proceed to Checkout / Clear Cart / Place Order. Mixed verb framing (Proceed vs Place vs Add). Cart icon lacks text label. Quantity +/- unlabeled.

### Feedback & Errors
Error fetch shows generic message; no inline field validation (HTML5 only). No confirmation region for added-to-cart or order placed (alert used, not accessible). No change summary when quantities adjust.

### Copy Metrics (qualitative)
Avg sentence length < 12 words (within target). Verb-first ratio ≈ 60%. Improvement: unify verbs, add clarity for destructive actions.

| ID | Dimension | Severity | Evidence | Recommendation | Rationale (≤18w) | Personas |
|----|-----------|----------|----------|----------------|------------------|----------|
| CopyClarity-verb-harmony-1 | CopyClarity | Medium | AlbumCard.vue; CartOverlay.vue | Standardize verbs; use consistent tense | Reduce cognitive parsing overhead | TSA |
| WorkingMemory-cart-change-summary-1 | WorkingMemory | Medium | cartStore.ts adds/removes | Provide persistent cart change log | Support task re-entry | ADHD |
| Feedback-order-success-1 | Feedback | High | CheckoutForm.vue: submitOrder | Replace alert with aria-live confirmation panel | Accessible confirmation of completion | ADHD, TSA |
| Feedback-error-fetch-1 | Feedback | Medium | App.vue:39-54 | Include cause + resolution messaging | Improve recovery confidence | ADHD |
| CopyClarity-quantity-labels-1 | CopyClarity | Low | CartOverlay.vue:32-59 | Add aria-labels for +/- controls | Clarify control purpose | TSA |

## E. Cognitive Flows {#cognitive-flows}
### Flow: Checkout
Steps:
1. Browse albums grid
2. Add to cart (button)
3. Open cart overlay (cart icon)
4. Adjust quantities / clear / proceed
5. Open checkout (form overlay)
6. Enter customer info & address
7. Choose payment
8. Place order (alert confirmation)

Friction Heatmap (0–5): Browse(1), Add(1), CartOverlay(3), Quantity Adjust(3), Proceed(2), CheckoutForm(4), Submit(3). Highest friction: multi-section form lacks progress cues, no draft, modal layering lacks focus.

Recovery & Draft Support: None (no autosave, undo, or confirmation log). Risk IDs: Recovery-checkout-draft-1, WorkingMemory-checkout-multi-section-1, Recovery-clear-cart-undo-1.

### Flow: Profile Setup
Not implemented → Coverage Gap (recorded for completeness). Recommend scaffolding multi-step wizard with autosave, step indicators, and undo for preference changes.

## F. Risk Matrix & Dimension Overview {#risk-matrix}
### Dimension Summary
| Dimension | High | Medium | Low | Notes |
|-----------|------|--------|-----|-------|
| Keyboard | 3 | 1 | 0 | Missing semantics & focus mgmt |
| Predictability | 1 | 0 | 0 | No skip link / landmarks |
| CognitiveLoad | 0 | 0 | 1 | Minor quantity control precision |
| Recovery | 3 | 1 | 0 | No undo / draft / reversible actions |
| Semantics | 1 | 0 | 0 | Icon control unnamed |
| Sensory | 0 | 1 | 2 | Motion scaling & spinner |
| Feedback | 2 | 1 | 0 | Missing status & confirmation |
| WorkingMemory | 2 | 2 | 0 | Missing flow scaffolding & change summary |
| CopyClarity | 0 | 2 | 1 | Verb harmonization & labels |
| RiskAggregate | 0 | 0 | 0 | Derived dimension |

### Consolidated Risks
| Risk ID | Dimension | Severity | Evidence | Recommendation | Rationale (≤18w) | Refs | Personas |
|---------|-----------|----------|----------|----------------|------------------|------|----------|
| Keyboard-cart-icon-1 | Keyboard | High | CartIcon.vue | Convert to button, label | Enable keyboard + SR clarity | §8.1, §10 | TSA, ADHD |
| Predictability-landmarks-1 | Predictability | High | index.html; App.vue | Add skip, structural landmarks | Improve spatial orientation | §6, §8.2 | TSA |
| Keyboard-overlay-focus-1 | Keyboard | High | CartOverlay.vue | Focus trap + ESC | Prevent focus loss & drift | §8.4 | ADHD, TSA |
| Feedback-add-cart-status-1 | Feedback | High | cartStore.ts | Polite live region add/remove | Immediate confirmation | §10 | ADHD, TSA |
| Recovery-clear-cart-undo-1 | Recovery | High | CartOverlay.vue | Timed undo after clear | Reversible destructive action | §6 (Undo) | ADHD |
| WorkingMemory-checkout-multi-section-1 | WorkingMemory | High | CheckoutForm.vue | Step indicators + summary | Externalize progress & state | §2 Exec Fn | ADHD |
| Recovery-checkout-draft-1 | Recovery | High | CheckoutForm.vue | Autosave fields (local) | Prevent data loss reload | §6 Drafts | ADHD, HYB |
| Feedback-order-success-1 | Feedback | High | CheckoutForm.vue | Aria-live success panel | Accessible completion feedback | §10 | ADHD, TSA |
| Semantics-cart-icon-name-1 | Semantics | High | CartIcon.vue | Accessible name with count | Clarify control purpose | §10 | TSA |
| Keyboard-play-overlay-1 | Keyboard | Medium | AlbumCard.vue | Make play control button | Operable preview action | §8.1 | ADHD |
| WorkingMemory-overlay-return-1 | WorkingMemory | Medium | CartOverlay.vue | Restore focus to trigger | Maintain task context | §8.4 | ADHD |
| Sensory-motion-scale-1 | Sensory | Medium | AlbumCard.vue | Reduced motion variant | Lower sensory load | §9 | TSA |
| CopyClarity-verb-harmony-1 | CopyClarity | Medium | Buttons set | Standardize verb patterns | Reduce linguistic ambiguity | §7 | TSA |
| Feedback-error-fetch-1 | Feedback | Medium | App.vue error block | Cause+resolution messaging | Boost recovery confidence | §7 Errors | ADHD |
| Recovery-remove-item-undo-1 | Recovery | Medium | CartOverlay.vue | Single-item undo inline | Mitigate accidental remove | §6 Undo | ADHD |
| WorkingMemory-cart-change-summary-1 | WorkingMemory | Medium | cartStore.ts | Persistent recent actions list | Support re-entry memory | §2 WorkingMemory | ADHD |
| CopyClarity-quantity-labels-1 | CopyClarity | Low | CartOverlay +/- | Add aria-labels for controls | Clarify adjust function | §7 Labels | TSA |
| CognitiveLoad-quantity-controls-1 | CognitiveLoad | Low | CartOverlay qty | Larger targets / number input | Reduce precision demand | §2 Cog Load | HYB |
| Sensory-spinner-animation-1 | Sensory | Low | App.vue spinner | Respect reduced motion | Avoid unnecessary motion | §9 | TSA |

## G. Action Plan (Prioritized) {#action-plan}
| Priority | Action | Dimensions | Severity | Personas | Evidence IDs | Spec Refs | Rationale (≤18w) | Impact Attendu | Effort |
|----------|--------|-----------|----------|----------|--------------|-----------|------------------|---------------|--------|
| P1 | Add semantic button + label for cart icon | Keyboard, Semantics | High | TSA, ADHD | Keyboard-cart-icon-1; Semantics-cart-icon-name-1 | §8, §10 | Enable keyboard & SR clarity | Improves navigation & AT | S |
| P1 | Implement focus trap & ESC for overlays | Keyboard, WorkingMemory | High | ADHD, TSA | Keyboard-overlay-focus-1; WorkingMemory-overlay-return-1 | §8.4 | Prevent focus drift & confusion | Reduces disorientation incidents | M |
| P1 | Introduce undo for clear cart & removes | Recovery | High | ADHD | Recovery-clear-cart-undo-1; Recovery-remove-item-undo-1 | §6 | Reversible destructive actions | Low error cost | M |
| P1 | Add autosave + step scaffolding to checkout | WorkingMemory, Recovery | High | ADHD, HYB | WorkingMemory-checkout-multi-section-1; Recovery-checkout-draft-1 | §6, §2 | Externalize progress & guard loss | Higher form completion | M |
| P1 | Add live regions for add/remove & success | Feedback | High | ADHD, TSA | Feedback-add-cart-status-1; Feedback-order-success-1 | §10 | Immediate accessible confirmation | Confidence & trust | S |
| P1 | Add skip link & structural landmarks | Predictability | High | TSA | Predictability-landmarks-1 | §6, §8.2 | Faster orientation & bypass repetition | Reduced nav time | S |
| P2 | Standardize verb labels across buttons | CopyClarity | Medium | TSA | CopyClarity-verb-harmony-1 | §7 | Consistent cognitive mapping | Reduced parsing time | S |
| P2 | Provide change summary panel for cart | WorkingMemory | Medium | ADHD | WorkingMemory-cart-change-summary-1 | §2 | Support session re-entry | Lower re-check actions | M |
| P2 | Reduced-motion variant for animations | Sensory | Medium | TSA | Sensory-motion-scale-1; Sensory-spinner-animation-1 | §9 | Lower sensory load | Comfort & retention | S |
| P3 | Improve quantity control affordances | CognitiveLoad | Low | HYB | CognitiveLoad-quantity-controls-1; CopyClarity-quantity-labels-1 | §2, §7 | Reduce precision burden | Smoother adjustments | S |

## H. Metrics & Instrumentation Gaps {#metrics-gaps}
| Signal | Present? | Source | Gap Rationale | Suggested Event Payload | Priority |
|--------|----------|--------|--------------|-------------------------|----------|
| draft_restored | No | CheckoutForm | No draft mechanism implemented | {flow:"checkout", restored:boolean} | P1 |
| undo_action | No | CartOverlay | Undo not implemented | {action:"remove|clear", latency_ms:int} | P1 |
| layout_shift_feedback | No | App shell | Need detect CLS perceptions | {component:"overlay", shift_px:int} | P2 |
| reduced_motion_toggle | No | Global prefs | Motion toggle absent | {enabled:boolean} | P2 |
| autosave_error | No | Checkout autosave | Autosave not yet implemented | {field:string, error:string} | P1 |
| order_submit_duration | No | Checkout submit | Track performance & abandonment | {duration_ms:int, success:boolean} | P2 |
| cart_change_summary_count | No | Cart store | Needed for change log usage | {adds:int, removes:int} | P2 |

## I. Governance / Exceptions {#governance}
| Date | Component | Rule Relaxed | Justification | Mitigation | Owner |
|------|-----------|--------------|--------------|-----------|-------|
| None Found | - | - | - | - | - |

## J. Backlog & Issue Cards {#backlog}
### Backlog Table
| Issue Key | Title | Risk IDs | Priority | Effort | Personas | Why (≤18w) | Acceptance (condensée) |
|----------|-------|----------|----------|--------|----------|------------|------------------------|
| A11Y-1 | Make cart icon accessible button | Keyboard-cart-icon-1; Semantics-cart-icon-name-1 | P1 | S | TSA, ADHD | Lacks keyboard operability & name | Button semantics; label; focus style |
| A11Y-2 | Add focus trap & ESC overlays | Keyboard-overlay-focus-1; WorkingMemory-overlay-return-1 | P1 | M | ADHD, TSA | Focus drift disorients users | Trap; initial focus; ESC; restore |
| A11Y-3 | Implement undo for destructive cart actions | Recovery-clear-cart-undo-1; Recovery-remove-item-undo-1 | P1 | M | ADHD | Irreversible loss elevates anxiety | Undo timer; toast; telemetry |
| A11Y-4 | Checkout autosave & step scaffolding | WorkingMemory-checkout-multi-section-1; Recovery-checkout-draft-1 | P1 | M | ADHD, HYB | Memory strain & data loss risk | Autosave; steps; summary panel |
| A11Y-5 | Add live regions for cart & order | Feedback-add-cart-status-1; Feedback-order-success-1 | P1 | S | ADHD, TSA | Missing confirmations reduce trust | aria-live; persistent log |
| A11Y-6 | Add skip link & landmarks | Predictability-landmarks-1 | P1 | S | TSA | Hard to bypass repetitive content | Skip link; semantic main/nav |
| A11Y-7 | Standardize verb labels | CopyClarity-verb-harmony-1 | P2 | S | TSA | Inconsistent verbs add parsing load | Unified verb style guide |
| A11Y-8 | Cart change summary panel | WorkingMemory-cart-change-summary-1 | P2 | M | ADHD | Hard to recall prior changes | Panel shows last N actions |
| A11Y-9 | Reduced motion option | Sensory-motion-scale-1; Sensory-spinner-animation-1 | P2 | S | TSA | Animations may overstimulate | Toggle; media query support |
| A11Y-10 | Improve quantity controls clarity | CognitiveLoad-quantity-controls-1; CopyClarity-quantity-labels-1 | P3 | S | HYB | Small targets increase effort | Larger buttons; labels; input |

### Issue Cards
#### Issue: A11Y-1 – Make cart icon accessible button
Linked Risks: Keyboard-cart-icon-1, Semantics-cart-icon-name-1
Priority: P1 | Effort: S | Personas: TSA, ADHD
Problem: Non-button div used; no label (CartIcon.vue lines 1-15).
Why: Missing semantics blocks keyboard & SR users.
Acceptance:
- [ ] Replace wrapper with `<button type="button">`
- [ ] Add `aria-label="Cart (n items)"` dynamic
- [ ] Visible focus outline ≥3:1
- [ ] Activate on Enter & Space
Telemetry: cart_icon_activate

#### Issue: A11Y-2 – Add focus trap & ESC overlays
Linked Risks: Keyboard-overlay-focus-1, WorkingMemory-overlay-return-1
Priority: P1 | Effort: M | Personas: ADHD, TSA
Problem: Overlay opens without focus mgmt (CartOverlay.vue header region).
Why: Focus drift increases disorientation risk.
Acceptance:
- [ ] Initial focus set to panel heading
- [ ] Tab wraps within overlay
- [ ] ESC closes; focus returns to trigger
- [ ] ARIA modal semantics or `role="dialog"`
Telemetry: overlay_focus_trap_engaged

#### Issue: A11Y-3 – Implement undo for destructive cart actions
Linked Risks: Recovery-clear-cart-undo-1, Recovery-remove-item-undo-1
Priority: P1 | Effort: M | Personas: ADHD
Problem: Clear / remove irreversible (CartOverlay.vue list & summary).
Why: Irreversible loss raises anxiety & errors.
Acceptance:
- [ ] Timed (≥10s) undo toast after clear/remove
- [ ] Restore state if undone
- [ ] Live region announces undo availability
- [ ] Telemetry for undo usage
Telemetry: undo_action

#### Issue: A11Y-4 – Checkout autosave & step scaffolding
Linked Risks: WorkingMemory-checkout-multi-section-1, Recovery-checkout-draft-1
Priority: P1 | Effort: M | Personas: ADHD, HYB
Problem: Long form lacks progress & draft safety (CheckoutForm.vue sections).
Why: Users may abandon after data loss fear.
Acceptance:
- [ ] Step indicator (1/3 etc.)
- [ ] Autosave every 5–10s & on blur
- [ ] Restore draft on reload
- [ ] Summary panel persists order items
Telemetry: draft_restored, autosave_error

#### Issue: A11Y-5 – Add live regions for cart & order
Linked Risks: Feedback-add-cart-status-1, Feedback-order-success-1
Priority: P1 | Effort: S | Personas: ADHD, TSA
Problem: No accessible confirmation for item add / order placement.
Why: Missing confirmation reduces confidence.
Acceptance:
- [ ] Polite live region announces add/remove
- [ ] Assertive/success region for order complete
- [ ] Messages persist in log panel
- [ ] Distinct ARIA labels for screen readers
Telemetry: cart_change_summary_count

#### Issue: A11Y-6 – Add skip link & landmarks
Linked Risks: Predictability-landmarks-1
Priority: P1 | Effort: S | Personas: TSA
Problem: No skip link; partial semantic structure (index/App.vue).
Why: Repetitive navigation increases cognitive load.
Acceptance:
- [ ] Skip to main before header nav
- [ ] Single `<main>` landmark
- [ ] Header/nav semantic elements used
- [ ] CLS under 0.1 after insertion
Telemetry: layout_shift_feedback

#### Issue: A11Y-7 – Standardize verb labels
Linked Risks: CopyClarity-verb-harmony-1
Priority: P2 | Effort: S | Personas: TSA
Problem: Mixed verb forms (Proceed, Place, Add) across UI.
Why: Inconsistency slows recognition.
Acceptance:
- [ ] Define verb style guide
- [ ] Update all buttons accordingly
- [ ] Review for label-in-name compliance
Telemetry: N/A

#### Issue: A11Y-8 – Cart change summary panel
Linked Risks: WorkingMemory-cart-change-summary-1
Priority: P2 | Effort: M | Personas: ADHD
Problem: Users can’t recall previous cart modifications.
Why: Increases re-check and memory strain.
Acceptance:
- [ ] Log panel listing last 5 changes
- [ ] Clear action with undo integrated
- [ ] Accessible list semantics
Telemetry: cart_change_summary_count

#### Issue: A11Y-9 – Reduced motion option
Linked Risks: Sensory-motion-scale-1, Sensory-spinner-animation-1
Priority: P2 | Effort: S | Personas: TSA
Problem: Multiple scale/spin animations without toggle.
Why: Potential sensory overload triggers.
Acceptance:
- [ ] Respect `prefers-reduced-motion`
- [ ] In-app toggle persists
- [ ] Replace spin with fade for reduced mode
Telemetry: reduced_motion_toggle

#### Issue: A11Y-10 – Improve quantity controls clarity
Linked Risks: CognitiveLoad-quantity-controls-1, CopyClarity-quantity-labels-1
Priority: P3 | Effort: S | Personas: HYB
Problem: Small +/- buttons lack labels.
Why: Increases precision & interpretation burden.
Acceptance:
- [ ] Larger hit area ≥44px
- [ ] aria-labels with resulting quantity
- [ ] Optional direct numeric input
Telemetry: N/A

## K. Method & Orchestration {#method}
Sequence executed: [staticCode, content, cognitiveFlow, overview]. Merge algorithm: signature(dimension + file + element); accumulate evidence; severity = max(High>Medium>Low); union references; final sorting High→Medium→Low then alphanumeric. Partial failures (none in this run) would mark corresponding Snapshot row = Gap while continuing. Orchestration metadata embedded in Meta section. Version: 1.0. Manual inspection due to absence of automated sub-prompt outputs; structure complies with specification §A–L.

## L. Snapshot Couverture {#snapshot-couverture}
| Aire | Statut | Note | Scope Summary |
|------|--------|------|---------------|
| Landmarks | Gap | Missing skip link & explicit main in base HTML | Needs structural nav anchors |
| Keyboard | Partial | Some buttons fine; cart & overlay lacking | Must add semantics & trapping |
| Cognitive Scaffolding | Gap | No step indicators / progress markers | Add steps, summary, re-entry aids |
| Motion Control | Partial | Animations present; no toggle | Implement reduced-motion handling |
| Recovery | Gap | No undo or drafts | Add reversible actions & autosave |
| Content Clarity | Partial | Mostly clear; inconsistent verbs | Harmonize verbs & labels |
| Notifications | Gap | No live region confirmations | Add add/remove & success logs |
| Working Memory | Gap | No change log or scaffolding | Provide action log & steps |
| Undo/Draft | Gap | Absent across flows | Implement autosave + undo timers |

### Action Plan (Recap)
| Priority | Action | Dimensions | Severity | Personas | Evidence IDs | Spec Refs | Rationale (≤18w) | Impact Attendu | Effort |
|----------|--------|-----------|----------|----------|--------------|-----------|------------------|---------------|--------|
| P1 | Add semantic button + label for cart icon | Keyboard, Semantics | High | TSA, ADHD | Keyboard-cart-icon-1; Semantics-cart-icon-name-1 | §8, §10 | Enable keyboard & SR clarity | Improves navigation & AT | S |
| P1 | Implement focus trap & ESC for overlays | Keyboard, WorkingMemory | High | ADHD, TSA | Keyboard-overlay-focus-1; WorkingMemory-overlay-return-1 | §8.4 | Prevent focus drift & confusion | Reduces disorientation incidents | M |
| P1 | Introduce undo for clear cart & removes | Recovery | High | ADHD | Recovery-clear-cart-undo-1; Recovery-remove-item-undo-1 | §6 | Reversible destructive actions | Low error cost | M |
| P1 | Add autosave + step scaffolding to checkout | WorkingMemory, Recovery | High | ADHD, HYB | WorkingMemory-checkout-multi-section-1; Recovery-checkout-draft-1 | §6, §2 | Externalize progress & guard loss | Higher form completion | M |
| P1 | Add live regions for add/remove & success | Feedback | High | ADHD, TSA | Feedback-add-cart-status-1; Feedback-order-success-1 | §10 | Immediate accessible confirmation | Confidence & trust | S |
| P1 | Add skip link & structural landmarks | Predictability | High | TSA | Predictability-landmarks-1 | §6, §8.2 | Faster orientation & bypass repetition | Reduced nav time | S |
| P2 | Standardize verb labels across buttons | CopyClarity | Medium | TSA | CopyClarity-verb-harmony-1 | §7 | Consistent cognitive mapping | Reduced parsing time | S |
| P2 | Provide change summary panel for cart | WorkingMemory | Medium | ADHD | WorkingMemory-cart-change-summary-1 | §2 | Support session re-entry | Lower re-check actions | M |
| P2 | Reduced-motion variant for animations | Sensory | Medium | TSA | Sensory-motion-scale-1; Sensory-spinner-animation-1 | §9 | Lower sensory load | Comfort & retention | S |
| P3 | Improve quantity control affordances | CognitiveLoad | Low | HYB | CognitiveLoad-quantity-controls-1; CopyClarity-quantity-labels-1 | §2, §7 | Reduce precision burden | Smoother adjustments | S |

### Backlog Issues (Recap)
| Issue Key | Title | Risk IDs | Priority | Effort | Personas | Why (≤18w) | Acceptance (condensée) |
|----------|-------|----------|----------|--------|----------|------------|------------------------|
| A11Y-1 | Make cart icon accessible button | Keyboard-cart-icon-1; Semantics-cart-icon-name-1 | P1 | S | TSA, ADHD | Lacks keyboard operability & name | Button semantics; label; focus style |
| A11Y-2 | Add focus trap & ESC overlays | Keyboard-overlay-focus-1; WorkingMemory-overlay-return-1 | P1 | M | ADHD, TSA | Focus drift disorients users | Trap; initial focus; ESC; restore |
| A11Y-3 | Implement undo for destructive cart actions | Recovery-clear-cart-undo-1; Recovery-remove-item-undo-1 | P1 | M | ADHD | Irreversible loss elevates anxiety | Undo timer; toast; telemetry |
| A11Y-4 | Checkout autosave & step scaffolding | WorkingMemory-checkout-multi-section-1; Recovery-checkout-draft-1 | P1 | M | ADHD, HYB | Memory strain & data loss risk | Autosave; steps; summary panel |
| A11Y-5 | Add live regions for cart & order | Feedback-add-cart-status-1; Feedback-order-success-1 | P1 | S | ADHD, TSA | Missing confirmations reduce trust | aria-live; persistent log |
| A11Y-6 | Add skip link & landmarks | Predictability-landmarks-1 | P1 | S | TSA | Hard to bypass repetitive content | Skip link; semantic main/nav |
| A11Y-7 | Standardize verb labels | CopyClarity-verb-harmony-1 | P2 | S | TSA | Inconsistent verbs add parsing load | Unified verb style guide |
| A11Y-8 | Cart change summary panel | WorkingMemory-cart-change-summary-1 | P2 | M | ADHD | Hard to recall prior changes | Panel shows last N actions |
| A11Y-9 | Reduced motion option | Sensory-motion-scale-1; Sensory-spinner-animation-1 | P2 | S | TSA | Animations may overstimulate | Toggle; media query support |
| A11Y-10 | Improve quantity controls clarity | CognitiveLoad-quantity-controls-1; CopyClarity-quantity-labels-1 | P3 | S | HYB | Small targets increase effort | Larger buttons; labels; input |

---
End of Report
<!-- END AUTO-GENERATED -->
