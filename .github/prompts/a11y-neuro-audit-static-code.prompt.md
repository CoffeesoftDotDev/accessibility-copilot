---
mode: 'agent'
description: 'Static code semantic & structural accessibility audit with neuro-inclusive focus'
tools: ['search','codebase','editFiles','problems','usages','runTests']
outputs: ['issues','diffPlan']
---
# Static Code Accessibility & Cognitive Support Audit

## Scope
Analyze repository source for deviations from:
- Semantic correctness (native first, minimal ARIA)
- Keyboard & focus integrity (§8)
- Layout stability & motion control (§6, §9)
- Cognitive scaffolding hooks (step indicators, data-testid, undo infra) (§2, §17, §18)

## Extraction Targets
Scan and catalog:
1. Landmark usage counts per page/layout file
2. Multiple `<main>` occurrences
3. Presence / absence of skip link anchor
4. Elements with `tabindex` > 0
5. Custom components wrapping interactive roles (e.g., div[role="button"]) vs native
6. ARIA attributes used; flag suspicious (role="presentation" wrapping interactive, redundant aria-label)
7. Instances of placeholder-only forms (input without <label>)
8. Buttons/links with ambiguous text (Go, Here, Click, Do it)
9. Potential layout shift sources (images without width/height / aspect ratio)
10. Motion sources: CSS keyframes > 150ms or repeated infinite animations
11. Missing reduced motion handling (search for `prefers-reduced-motion`)
12. Undo / draft infrastructure (search for undo, restore, draft, autosave)
13. Notification pattern (search toast, snackbar, alert) and persistence

## Output Format
Return JSON-like fenced block plus human summary:
```
{
  "landmarks": {"layoutsChecked": N, "multipleMain": [...paths]},
  "skipLink": {"present": bool, "pathsMissing": [...]},
  "focus": {"positiveTabindex": [...paths]},
  "semantics": {"divRoleButton": [...], "ariaSuspicious": [...]},
  "forms": {"missingLabel": [...]},
  "copy": {"ambiguousLabels": [...]},
  "layout": {"unreservedMedia": [...]},
  "motion": {"infiniteAnimations": [...], "noReducedMotionRefs": bool},
  "recovery": {"undoHooks": [...], "autosave": [...]},
  "notifications": {"ephemeralOnlyCandidates": [...]} 
}
```

Then a Recommendations section:
| Issue | Impact (TSA/ADHD) | Fix Pattern | Ref |
|-------|-------------------|------------|-----|
| Missing skip link | Disorientation | Add first-focus anchor + visible on focus | §6, §8 |

## Constraints
- Do not modify code—analysis only.
- Deterministic key ordering in JSON.
- Only list confirmed occurrences (no guesses).

## Acceptance Criteria
- All extraction targets addressed.
- Each recommendation maps to spec section(s).
- Ambiguous label list de-duplicated.
