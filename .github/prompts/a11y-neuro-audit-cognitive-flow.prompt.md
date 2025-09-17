---
mode: 'agent'
description: 'Audit flux cognitifs multi-étapes (version courte)'
tools: ['codebase','fetch','todos']
outputs: ['flowReport']
---
# Cognitive Flow Audit

Objectif: Évaluer rapidement 2+ flux multi‑étapes pour orientation, prévisibilité (ASC), charge attentionnelle / mémoire (ADHD), récupération, stabilité sensorielle.

Personae:
| Code | Besoin clé | Frictions typiques |
|------|-----------|--------------------|
| ASC  | Séquencement stable | Transitions brusques, ordre inattendu |
| ADHD | Réduction distracteurs | Densité interactive, absence recap |
| HYB  | Combinaison | Mélange des deux |

Dimensions (regroupées 11→8 pour scoring 0–5): Orientation, Predictability, MemoryRelief, FocusControl, Recovery, Safety (Non-Destructive), FeedbackTiming+Stability, ExecLoad (synthèse).

Métriques clés:
| Metric | Description | Format |
|--------|-------------|--------|
| InteractiveDensity | # contrôles visibles / step (P/S/T) | Nombre + classes |
| RecoveryLatency | Steps ou s pour reprise | Num |
| ContextStability | non-disruptive / total transitions | 0–1 |
| UndoCoverage | % actions destructives réversibles | % |
| OffloadSurfaces | Surfaces récap / hints / panels | Count |
| PersonaWeight | Pondération friction (ASC/ADHD) | 1–3 |

Méthode condensée: cartographier steps → compter densité → relever événements risque (perte progrès / destructif) → inventorier recovery (undo, autosave) → noter friction persona par step → noter signaux sensoriels → scorer 0–5 (max aggravant) → produire heatmap & tableau recommandations.

JSON / Tableaux attendus (ordre de sortie fixe):
1 Flows Analysés  
2 Step Maps (| Flow | Step | Trigger | State | Density P/S/T | Notes |)  
3 Metrics Table  
4 Persona Friction Matrix (| Flow | Step | Persona | Friction | Mitigation? | Gap | Ref |)  
5 Cognitive Risk Register (| Flow | Step | Risk Type | Description | Severity | Mitigation | Gap | Ref |)  
6 Recovery & Safety Net (| Mechanism | Present? | Coverage | Notes |)  
7 Heatmap (| Step | Orientation | Predictability | Focus | Recovery | Load | Mean |)  
8 Scores Summary (| Flow | Orientation | Predictability | MemoryRelief | Focus | Recovery | Safety | Feedback | ExecLoad | Overall |)  
9 Recommendations (| Priority | Recommendation | Dimensions | Persona Impact | Evidence Ref | Expected Gain |)  
10 Appendix (Method).

Scoring (0–5) repères rapides:
- 0 absent/antinomique, 3 baseline fonctionnel, 5 exemplaire
- InteractiveDensity: ≤7 contrôles primaires ok; >10 = surcharge (flag ⚠)
- ContextStability <0.7 = risque Predictability
- UndoCoverage <0.6 sur actions destructives = High Safety risk

Pondérations suggérées (si agrégat global): Recovery x1.3, FocusControl x1.2, Predictability x1.2 (flux ASC critiques).

Recommandations: lier chaque ligne à Evidence Ref (fichier:ligne ou observation). Mentionner "No significant friction observed" si aucune friction persona sur un step.

Contraintes:
- Rendre tables même vides (indiquer (empty))
- Pas de spéculation sans signal observé
- Justifier chaque score >=4 ou <=1 par note succincte
- Marquer >10 contrôles visibles par ⚠ dans Heatmap

Acceptation:
1 ≥2 flows  
2 Chaque persona a friction ou absence explicite  
3 Toutes tables & heatmap présentes  
4 Scores traçables à signaux / metrics  
5 Recos référencent au moins un risque / evidence  
6 UndoCoverage & ContextStability calculés si données suffisantes  

Exemples bullets exécutif:
- Checkout: Density 11 ⚠ → surcharge focus (ADHD)
- Création: Absence autosave → reprise manuelle (Recovery High)
- Transitions modales non annoncées (Predictability Medium)

Fin prompt.