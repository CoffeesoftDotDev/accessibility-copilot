Contexte:
Nous auditons une application web / Blazor / SPA pour la neuro‑accessibilité (TSA / TDAH).
Objectif: Réduire surcharge cognitive, améliorer prévisibilité, contrôlabilité, orientation et régulation attentionnelle, limiter stimuli inutiles.

Bases neurocognitives (références DSM-5 et littérature cognitive appliquée) à intégrer dans l’analyse sans pathologiser:

- TSA: (a) Difficultés d’intégration multi-sensorielle, (b) Sensibilité accrue (visuelle/auditive/motion), (c) Prévisibilité/routine vs changements implicites, (d) Traitement en détail → importance des repères hiérarchiques clairs, (e) Charge d’exécution pour transitions contextuelles.
- TDAH: (a) Vulnérabilité à la distraction externe/interne, (b) Difficulté de maintien de but sous charge visuelle/interactionnelle, (c) Besoin de feedback immédiat, (d) Fragmentation attentionnelle si navigation / state change silencieux, (e) Mémoire de travail limitée → nécessité d’éléments persistants et d’agrégation.

Normes & référentiels à relier explicitement:

- WCAG 2.2 (Perceivable, Operable, Understandable, Robust) + critères pertinents (2.4.x, 1.3.x, 3.2.x, 2.2.x, 3.3.x, 2.5.x, 2.4.13).
- Design inclusif (Microsoft Inclusive Design), Curb-cut principle.
- Cognitive load theory (intrinsèque, extrinsèque, germane): réduire extrinsèque, stabiliser ressources.
- Patterns ARIA authoring practices (menus, navigation, form validation).
- Interaction principles (prévisibilité, affordance, feedback immédiat, visibilité de l’état système).
- Progressive Disclosure & Minimal Necessary Stimulus.

Domaine d’audit (adapter selon projet):

1. Structure & Landmarks (sémantique HTML / divisions logiques).
2. Navigation & Orientation (focus order, skip link, aria-current, fil d’Ariane).
3. Hiérarchie & Titres (H1 unique, niveaux cohérents, densité).
4. Chargements & États (aria-busy, skeleton, prévisibilité).
5. Formulaires & Validation (groupements, inline + résumé, énoncé d’erreurs persistantes).
6. Composants dynamiques (modals, menus, toasts, live regions).
7. Interaction Clavier & Focus (tab order, focus visible, retour focus post action, gestion Esc).
8. Feedback & Notifications (temps de vie, priorité, désactivables, aria-live).
9. Personnalisation Cognitive (mode faible stimulation, mode focus, réduire mouvement / animations).
10. Densité visuelle & Lisibilité (espacements, line-height, contrastes, taille police).
11. Gestion du Changement de Contexte (redir auto, navigation implicite, filtrage dynamique).
12. Micro‑interactions & Mouvement (scroll auto, transitions, auto-refresh).
13. Charge Mémoire & Persistance (historique actions, rappel du contexte, état réversible).
14. Cohérence Multi-plateforme (web, client, mobile si pertinent).
15. Accessibilité des Données & Tableaux (groupements, summary, colonnes fixes).
16. Chat / Agents / Assistants (modalités intrusives vs pull, gestion focus).
17. Architecture & State Management (événements silencieux, polling, batching).
18. Performance perçue & Latence (précharge, skeleton, éviter rupture d’attention).
19. Internationalisation & Clarté linguistique (terminologie stable, éviter jargon).
20. Sécurité cognitive (prévenir perte données en navigation, confirmations non intrusives).

Format de sortie attendu (tableau ou JSON structuré):
Pour chaque point:

- id
- Catégorie
- Problème détecté (factuel, observable)
- Impact TSA (mécanisme cognitif ou sensoriel)
- Impact TDAH (attention, mémoire de travail, inhibition)
- Normes / heuristiques liées (WCAG x.x.x + principe design)
- Gravité (Haute / Moyenne / Basse) + justification
- Exemple concret (fichier, ligne, pattern)
- Risque cumulatif (faible / modéré / élevé) si combiné à d’autres facteurs
- Suggestion remédiation (action technique précise)
- Alternative progressive (quick win) / Remédiation complète
- Indicateur de validation (metric: ex. “Focus visible sur 100% des éléments interactifs via test automatisé”)
- Effort estimé (S, M, L)
- Priorité (calcul = f(gravité _ fréquence _ coût retard))
- Statut (Backlog / En cours / Implémenté)
- Tag (structure, focus, feedback, mouvement, lisibilité, etc.)

Exigences qualitatives:

- Pas de formulation vague (“améliorer l’UX”), préférer “Ajouter un bouton ‘Skip to content’ positionné avant header, visible au focus”.
- Lier chaque recommandation à un mécanisme cognitif précis (ex: “réduit charge extrinsèque”, “stabilise repères sériels”).
- Mentionner quand un problème devient critique combiné à un autre (ex: “Focus invisible + redirection implicite”).
- Séparer “Quick Win” vs “Refonte” pour hiérarchisation.

Output final:

1. Résumé exécutif (5–10 lignes).
2. Tableau complet.
3. Roadmap lots (Sprints).
4. Métriques initiales + cibles.
5. Annexes (glossaire, référentiels, script d’automatisation potentiel).
