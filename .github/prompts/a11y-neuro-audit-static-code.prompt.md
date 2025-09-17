---
mode: 'agent'
description: 'Audit statique accessibilité & support cognitif (version courte)'
tools: ['codebase','usages','problems','fetch','todos']
outputs: ['issues']
---
# Static Code Audit

Objectif: Identifier rapidement les écarts structurels & cognitifs côté code (sémantique, focus, stabilité, réduction charge mentale) et générer une table de recommandations priorisées.

Personae (impact colonne Impact): TSA = besoin de structure stable; ADHD = clarté focus & libellés; HYB = combinaison.

Entrées implicites: analyser sources fournis (extensions .vue/.tsx/.js/.html/.css). Pas de modification de code; seulement analyse.

Extraction JSON attendue (ordre de clés fixe):
```
{
  "landmarks": {"layoutsChecked":0,"multipleMain":[]},
  "skipLink": {"present":false,"pathsMissing":[]},
  "focus": {"positiveTabindex":[]},
  "semantics": {"divRoleButton":[],"ariaSuspicious":[]},
  "forms": {"missingLabel":[]},
  "copy": {"ambiguousLabels":[]},
  "layout": {"unreservedMedia":[]},
  "motion": {"infiniteAnimations":[],"noReducedMotionRefs":true},
  "recovery": {"undoHooks":[],"autosave":[]},
  "notifications": {"ephemeralOnlyCandidates":[]}
}
```

Cibles d’extraction (résumé numéroté):
1 landmarks par fichier & multi-<main>
2 skip link présent ?
3 tabindex > 0
4 wrappers non natifs (div[role=button], span.click)
5 ARIA suspects (presentation sur interactif, aria-label redondant)
6 inputs sans label
7 libellés ambigus (Go|Here|Click|Do it)
8 médias sans width/height (risque CLS)
9 animations >150ms ou infinite
10 absence de prefers-reduced-motion
11 hooks undo/draft/autosave
12 notifications éphémères seulement

Table Recommandations (après le bloc JSON):
| Issue | Impact (TSA/ADHD) | Fix Pattern | Ref |
|-------|-------------------|-------------|-----|
| Missing skip link | Orientation / focus drift | Ajouter ancre skip + visibilité focus | §6 §8 |
| Multiple <main> | Structure ambiguë | 1 seul <main> + landmarks secondaires | §6 §10 |
| Ambiguous button text | Contexte mémoriel perdu | Remplacer par libellé action explicite | §7 |
| Images sans dimensions | Reorientation coût | Ajouter width/height ou aspect-ratio | §6 |
| Infinite animation >150ms | Charge sensorielle | Préférence reduced-motion + réduire durée | §9 |

Critères & Contraintes:
- JSON valide, clés dans l’ordre listé
- Uniquement occurrences confirmées (pas d’inférence)
- Liste ambiguousLabels dédupliquée
- Chaque Fix Pattern réfère ≥1 section (§6–§10 etc.)
- Pas de code exact (pattern descriptif)

Acceptation (succinct):
1 Tous champs JSON présents (même vides)
2 Chaque cible listée couverte dans JSON ou tableau
3 Aucune clé supplémentaire non décrite
4 Recommandations ont Impact & Ref
5 Pas de doublon dans ambiguousLabels
6 Absence d’animations lourdes signalée si aucune trouvée (noReducedMotionRefs true)

Fin prompt court.
