---
mode: 'agent'
description: 'Audit cognitive task flows for neurodivergent (TSA/ADHD) support'
tools: ['search','codebase','runTests','openSimpleBrowser','terminalLastCommand']
outputs: ['flowReport','personaMatrix']
---
# Cognitive Flow Audit (Task Sequencing & Recovery)

## Objective
Evaluate multi-step or cognitively demanding flows for predictability, memory offloading, recoverability, and sensory serenity.

## Flow Selection
Choose at least 2 flows:
- Example: Onboarding Wizard, Checkout, Bulk Edit, Draft Creation → Publish.

## Evaluation Dimensions
| Dimension | Questions | Signals |
|-----------|----------|---------|
| Orientation | Are total steps visible? | Step X/Y indicator, breadcrumb, progress bar |
| Working Memory Relief | Are instructions proximal? | Inline hints, chunking, collapsible advanced sections |
| Progress Preservation | Is draft/autosave available? | Local storage events, API calls, restore banner |
| Error Handling | Are errors inline & non-destructive? | Per-field validation, retained data |
| Sensory Load | Unnecessary animation / shifting? | Layout stability, reduced motion toggle |
| Feedback Timing | Immediate vs delayed? | Optimistic UI, progress states |
| Resumability | Can user pause/return? | Draft list, snapshots, queued tasks |
| Change Transparency | Are changes summarized? | Post-action summary panel, bullet delta |

## Method
1. Map Steps: Enumerate each user-visible step & decision point.
2. Count Interactive Elements per step (baseline target ≤7 primary/secondary interactive controls).
3. Identify cognitive risk events (context loss, hidden mandatory step, destructive reset).
4. Capture recovery vectors (undo, autosave restore, pause/resume, queue surface).
5. Persona Crosswalk: For each step, annotate friction vs mitigation (TSA, ADHD, Hybrid).
6. Produce Flow Score (0–5 per dimension) and weighted summary.

## Output Format
Return ordered sections:
1. Flows Analyzed
2. Step Maps (one subsection per flow)
3. Persona Friction Table
4. Cognitive Risk Register
5. Recovery & Safety Net Inventory
6. Scores Summary Table
7. Recommendations (prioritized)

### Persona Friction Table
| Flow | Step | Persona | Friction | Mitigation Present? | Gap | Ref |
|------|------|---------|----------|---------------------|-----|-----|

### Cognitive Risk Register
| Flow | Step | Risk Type | Description | Severity | Mitigation | Ref |
|------|------|-----------|------------|----------|-----------|-----|

### Scores Summary
| Flow | Orientation | Memory Relief | Recovery | Sensory | Feedback | Overall |
|------|------------|---------------|----------|--------|----------|---------|

## Constraints
- Literal language only.
- No speculative mitigation—must tie to observation.
- Reference sections (§2 layered model, §17 checklist, §21 metrics) where relevant.

## Acceptance Criteria
- Each flow has ≥1 identified friction per persona OR explicit “No significant friction observed”.
- All tables rendered even if empty (state that they are empty).
