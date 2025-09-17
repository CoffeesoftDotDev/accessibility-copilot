---
mode: 'agent'
description: 'Génère uniquement le Backlog & Issue Cards (Section J) à partir des risques/action plan fusionnés'
tools: ['codebase','usages','problems','fetch','todos']
output_format: 'markdown'
---

# Prompt: Génération Backlog & Issue Cards (Section J)

## Objet
Ce prompt produit **exclusivement** la Section J « Backlog & Issue Cards » après qu’un rapport audit neuro‑inclusif (format canonique A→L) a été généré par `a11y-neuro-uber-flow.prompt.md`. Il ne régénère pas les autres sections. Il consomme la liste consolidée des risques et/ou le plan d’action pour fabriquer: (1) Table Backlog synthèse, (2) Cartes issues détaillées (Markdown), selon la spécification source.

## Entrées Requises (au moins une des deux formes)
Fournir UNE des structures suivantes (les deux si possible pour meilleure qualité):

1. `REPORT_MARKDOWN` : Le rapport complet A→L déjà rendu (Markdown). Le prompt doit parser Sections F (Risk Matrix) & G (Action Plan) si présents.
2. `RISKS_BLOCK` + `ACTION_PLAN_BLOCK` : Extraits isolés en Markdown (tables) correspondant aux sections F.2 et G.

Variables optionnelles supplémentaires:
```
DATE_AS_OF: 2025-09-17 (ou date courante si absent)
PERSONAS: TSA, ADHD (liste codes)
REPO: (nom repo pour générer préfixes éventuels)
ISSUE_PREFIX: A11Y (défaut)
START_INDEX: 1 (numéro de départ des issues)
```

## Règles de Parsing
1. Identifier la table risques: recherche en priorité d’un tableau commençant par entête `| Risk ID | Dimension | Severity |`.
2. Identifier la table action plan: entête `| Priority | Action | Dimensions | Severity | Personas | Evidence IDs |`.
3. Si action plan absent: dériver priorités depuis `Severity` + règles (P1 High, P2 Medium, P3 Low) puis générer action rows minimalistes.
4. Dé‑dupliquer risques par `Risk ID` (dernier doublon prime si conflits de Recommendation; sévérité = maximum High>Medium>Low).
5. Conserver l’ordre de priorité P1→P2→P3 puis tri alphanumérique par Risk ID à l’intérieur de chaque groupe.

## Attribution Priorité (fallback)
Si priorité non fournie par plan d’action:
```
High => P1
Medium => P2 (si multi-dimensions >1 dimension listée sinon P2 quand même)
Low => P3
```

## Format de Sortie (Markdown Strict)
Sortie **uniquement** Section J complète (pas d’autres sections) :

### 1. Table Backlog Synthèse
Entête EXACTE :
```
| Issue Key | Title | Risk IDs | Priority | Effort | Personas | Why (≤18w) | Acceptance (condensée) |
```
Ligne par issue (matching actions). `Issue Key` = `<ISSUE_PREFIX>-n` (n incrément depuis START_INDEX). `Effort` hérité si présent, sinon heuristique (High→M, Medium→M, Low→S) sauf si mot clé « filter »/« grouping » → M.

### 2. Cartes Issues
Pour chaque issue, bloc:
```
#### Issue: A11Y-1 – <Titre>
Linked Risks: <Risk IDs coma>
Priority: P1 | Effort: S | Personas: TSA, ADHD
Problem: <Première ligne Evidence principale ou courte synthèse fichier:ligne>
Why: <≤18 mots synthétisant impact cognitif>
Acceptance:
- [ ] Critère 1
- [ ] Critère 2
Telemetry: <signal principal ou N/A>
```

## Génération des Champs
| Champ | Source / Règle |
|-------|----------------|
| Title | Colonne Action (G) sinon Recommendation abrégée (F) |
| Risk IDs | Mappage Evidence IDs (Action Plan) ou Risk ID seul |
| Personas | Colonne Personas (G) sinon fusion des personas listées par risques (déduire si `Personas` absent → laisser vide) |
| Why |  ≤18 mots; pas identique à Acceptance; reflète charge cognitive / récupération / orientation |
| Acceptance | 2–6 critères; structure verb-first; pas de code exact |
| Telemetry | Choisir un signal pertinent (draft_restored, undo_action, item_added_to_cart, order_submitted, form_validation_error, reduced_motion_toggle, layout_shift_feedback) ou N/A |

## Contraintes Style
- Aucun JSON dans la sortie.
- Pas plus de 80 caractères par ligne dans cartes (souple).
- Pas de duplication d’issue keys.
- Rationale (Why) unique par issue.

## Validation & Erreurs Partielles
Si parsing d’une table échoue, ajouter une note en haut : `_Parsing warning: <description>_` et continuer avec la table trouvée. Si aucune donnée disponible → sortir Table avec entête + `None Found` ligne placeholder et aucune carte.

## Sécurité & Limites
Ne pas inventer de nouveaux risques. Ne pas altérer les IDs. Ne pas spéculer sur du code absent.

## Exemple (abrégé)
```
| Issue Key | Title | Risk IDs | Priority | Effort | Personas | Why (≤18w) | Acceptance (condensée) |
| A11Y-1 | Accessible dialogs | Keyboard-overlay-focus-1;Semantics-dialog-missing-1 | P1 | M | TSA, ADHD | Focus trap manquant désoriente | Trap; role=dialog; ESC; focus restore |

#### Issue: A11Y-1 – Accessible dialogs
Linked Risks: Keyboard-overlay-focus-1, Semantics-dialog-missing-1
Priority: P1 | Effort: M | Personas: TSA, ADHD
Problem: Overlays sans rôle dialog ni focus trap.
Why: Perte de contexte et orientation focus.
Acceptance:
- [ ] role=dialog + aria-modal
- [ ] Focus initial dans panel
- [ ] Trap & ESC restore
Telemetry: checkout_progress_step
```

## Tâches de l’Agent
1. Parser entrées.
2. Construire modèle interne risques & actions.
3. Appliquer priorisation + heuristique effort.
4. Générer table synthèse.
5. Générer cartes, ordonnées P1→P2→P3.
6. Ajouter avertissements si parsing incomplet.

## Sortie Finale
Retourner uniquement la Section J (table + cartes) en Markdown.

Fin du prompt.
