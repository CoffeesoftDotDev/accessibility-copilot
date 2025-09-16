---
mode: 'agent'
description: 'Overview neuro-inclusif condensé (structure + cognition + feedback + recovery)'
tools: ['codebase','fetch','problems','usages','todos']
outputs: ['report','riskMatrix']
---
# Neuro-Inclusive Overview

But: Synthèse haut niveau de la maturité accessibilité + soutien cognitif pour trois personae intégrées.

Personae (réutiliser codes):
| Code | Persona | Besoin clé | Risques principaux |
|------|---------|-----------|--------------------|
| TSA  | Autistic Analytical | Structure prévisible | Shifts, ordre focus instable |
| ADHD | ADHD Creative | Réduction surcharge & orientation | Densité interactive, libellés ambigus |
| HYB  | Hybrid | Mix | Combinaisons ci-dessus |

Entrées minimales: TARGET_SCOPE, TECH_STACK, 2+ FLOWS, METRICS (CLS, undo usage si présents), DATE_AS_OF.

Phases condensées:
1 Inventaire (pages, vues)  
2 Structure (landmarks, heading, single <main>)  
3 Interaction (widgets composites, patterns clavier)  
4 Charge cognitive (compte contrôles, disclosure)  
5 Feedback & Recovery (undo, autosave, notifications persistantes)  
6 Motion & Sensoriel (animations non essentielles, respect prefers-reduced-motion)  
7 Tensions personae (frictions vs mitigations par flow)  
8 Metrics & instrumentation manquantes  
9 Scoring risques (Predictability, CognitiveLoad, Recovery, Sensory, Semantics)  
10 Priorisation (P1/P2/P3)

Ordre sortie attendu:
1 Executive Summary (≤8 bullets, ≤18 mots)  
2 Coverage Snapshot  
3 Structure & Landmarks  
4 Cognitive & Flow Observations  
5 Feedback / Recovery  
6 Motion & Sensory  
7 Persona Friction Matrix  
8 Metrics Gaps  
9 Risk Matrix  
10 Prioritized Recommendations  
11 Appendix (Raw)  

Coverage Snapshot:
| Area | Status | Notes | Scope Summary |
|------|--------|-------|---------------|
| Landmarks | Pending |  | Single <main>, navigation stable |
| Keyboard | Pending |  | Ordre focus logique |
| Cognitive Scaffolding | Pending |  | Étapes visibles / indices |
| Motion Control | Pending |  | Modération animation / toggle |
| Recovery | Pending |  | Undo / drafts / réversibilité |
| Content Clarity | Pending |  | Libellés explicites |
| Notifications | Pending |  | Persistence & log |

Persona Friction Matrix:
| Flow | Persona | Friction | Mitigation? | Gap (Action synth.) | Ref |
|------|---------|----------|-------------|---------------------|-----|
| Checkout | TSA | Étapes non visibles | Partielle | Ajouter Step X/Y header | §17 |

Risk Matrix (exemple):
| Dimension | Severity | Rationale (≤18w) | Mitigation Pattern | Ref |
|-----------|----------|------------------|--------------------|-----|
| Predictability | High | Shifts sur cartes asynchrones | Réserver espace skeleton | §6 |

Guidelines:
- Phrase simple, pas de métaphores
- Statut Coverage: Completed | Partial | Gap
- Recommandations: pattern générique, pas de code

Critères d’acceptation (condensés):
1 Toutes sections présentes (mettre "None Found" si vide)  
2 ≥2 flows dans Persona Friction  
3 Chaque reco possède Ref (§6… etc.)  
4 Pas d’affirmation sans observation tangible  
5 Bullets exécutif ≤8 et concis  
6 Matrix risques couvre dimensions listées (None si aucune)  

Fin prompt.
