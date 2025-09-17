mode: 'agent'
description: 'Audit neuro-inclusif condensé (structure + cognition + flows + priorisation)'
tools: ['codebase','usages','problems','fetch','todos']
output_format: 'markdown'
# Nouveau champ personnalisé: chemin de sortie fichier Markdown final.
# L'orchestrateur / agent DOIT écrire (écrasement) la sortie finale canonique dans ce fichier à la racine du repo.
output_destination: 'report.md'
# Audit Neuro-Inclusif

## Orchestration (Meta)
Ce « uber prompt » orchestre les sous-prompts spécialisés. Il ne réécrit pas leur logique mais définit l’ordre, la fusion et la normalisation.

Séquence d’exécution recommandée (stop-on-error=false, agréger résultats partiels):
1. StaticCode: `a11y-neuro-audit-static-code.prompt.md` → extrait JSON structure/focus/motion.
2. Content: `a11y-neuro-audit-content.prompt.md` → extrait JSON outline / labels / feedback / mémoire.
3. CognitiveFlow: `a11y-neuro-audit-cognitive-flow.prompt.md` → maps flows, heatmap, scoring 0–5.
4. Overview: `a11y-neuro-audit-overview.prompt.md` → synthèse haut niveau & matrices.
5. Fusion: appliquer Algorithme fusion (ci‑dessous) pour produire la sortie Markdown canonique (sections A–L) + tableaux Action Plan & Backlog.

Chaque sous-prompt conserve sa structure interne; ce méta prompt impose un ordre consolidé final (sections A→L) pour la restitution Markdown.

Phases (succinct – correspondance sections finales):
A Meta & Scope → B Executive Summary → C Static Code → D Content & Copy → E Cognitive Flows → F Risk Matrix → G Action Plan → H Metrics & Instrumentation → I Governance / Exceptions → J Backlog & Issue Cards → K Method & Orchestration → L Snapshot Couverture.


### Contrat d’agrégation
- Entrées minimales propagées à chaque sous‑prompt: TARGET_SCOPE, TECH_STACK, PRIMARY_FLOWS, PERSONAS, DATE_AS_OF.
- Si un sous‑prompt retourne une clé déjà existante, conserver union dédupliquée; sévérité = max selon échelle High>Medium>Low.
- Ajouter champ `sourcePrompts` dans `meta.config` (liste fichiers exécutés) lors de la sortie finale.

### Mapping Sections → Sous-Prompts
| Section Finale | Source Primaire | Merge Notes |
|----------------|-----------------|-------------|
| C Static Code  | StaticCode      | Direct JSON + evidence lines |
| D Content      | Content         | Direct JSON + ratios |
| E Flows        | CognitiveFlow   | Normaliser IDs riskFlow-* avant fusion |
| B Overview / F Risk Matrix | Overview + fusion risques | Overview fournit framing; fusion injecte stats réelles |
| G Action Plan  | Calcul méta     | Généré à partir de liste risques unifiée |
| H Metrics Gaps | Tous            | Collecter signaux manquants cumulés |
| I Governance   | Méta / manuel   | Optionnel; insérer None Found si vide |

### Identifiants Risques Harmonisés
Pattern: `<Dimension>-<slug>-<n>` où slug dérive de l’élément (ex: cart-icon, checkout-flow-step1). Pour risques de flow: préfixer `Flow` dans evidence si ambigu.

### Champs Additionnels Automatisés
Injecter dans `method`:
```
"orchestration": {"sequence":["staticCode","content","cognitiveFlow","overview"],"merge":"max-severity-union","version":"1.0"}
```
Ne pas dupliquer si déjà présent.

### Échecs Partiels
Si un sous-prompt échoue → marquer section correspondante dans Snapshot Couverture = Gap et poursuivre fusion restante (Pas de plantage global).

---

## Informations complémentaires

### Objectif de l'analyse
Produire en une seule passe une vision des risques neuro‑cognitifs et d’accessibilité structurelle + plan d’action priorisé + backlog d’issues.

### Personas et type de neuro-atypie
Personae intégrées (abréviations à réutiliser partout):
| Code | Persona | Besoin clé | Sensibilité principale |
|------|---------|-----------|------------------------|
| TSA  | Autistic | Prévisibilité, structure | Surcharge par changements inattendus |
| ADHD | ADHD | Orientation, réduction friction | Fragmentation attention, mémoire de travail |
| HYB  | Hybrid | Mix des deux | Stabilité + signal clair |


### Entrée utilisateurs:
L'utilisateur peut préciser les paramètre suivants. Ces paramètres ne sont pas obligatoire mais s'ils sont fournis tu DOIS ABSOLUMENT les utiliser.
```
TARGET_SCOPE: src/, https://app.prod
PRIMARY_FLOWS: Checkout, Profile Setup
PERSONAS: TSA, ADHD
OUTPUT_FORMAT: markdown
```

### Données de référentiel

Dimensions (clé courte -> intention): Predictability, CognitiveLoad, Recovery, Semantics, Keyboard, Sensory, Feedback, WorkingMemory, InteractiveDensity, CopyClarity, RiskAggregate.

Gravité normalisée: High (bloquant / critique persona), Medium (friction matérielle), Low (optimisation).

## Format de sortie (Markdown Canonique)

La sortie FINALE DOIT être exclusivement en Markdown (aucun bloc JSON). Ordre des sections A→L strict. Si une section n’a aucun contenu pertinent, afficher `None Found`.

### Ordre & Ancres
1. A. Meta & Scope (# meta)
2. B. Executive Summary (# executive-summary)
3. C. Static Code Findings (# static-code)
4. D. Content & Copy (# content-copy)
5. E. Cognitive Flows (# cognitive-flows)
6. F. Risk Matrix & Dimension Overview (# risk-matrix)
7. G. Action Plan (Prioritized) (# action-plan)
8. H. Metrics & Instrumentation Gaps (# metrics-gaps)
9. I. Governance / Exceptions (# governance)
10. J. Backlog & Issue Cards (# backlog)
11. K. Method & Orchestration (# method)
12. L. Snapshot Couverture (# snapshot-couverture)

### A. Meta & Scope
Inclure: Date, Target Scope, Personas (codes), Primary Flows, Source Prompts exécutés, Config d’orchestration (sequence, merge, version).

### B. Executive Summary
≤10 bullets (≤18 mots chacun) synthétisant risques High, patterns critiques, manques instrumentation. Totaux: High / Medium / Low + Top 3 Dimensions.

### C. Static Code Findings
Sous-sections: Landmarks & Structure; Keyboard & Focus; Motion & Sensory; Semantics / ARIA. Tableau:
| ID | Dimension | Severity | Evidence (fichier:ligne) | Recommendation | Rationale (≤18w) | Personas |
|----|-----------|----------|--------------------------|----------------|------------------|----------|

### D. Content & Copy
Inclure Outline Headings, Labels, Metrics (mots/sentence, % verb-first), Feedback & Error Patterns. Même format de tableau.

### E. Cognitive Flows
Pour chaque flow: étapes numérotées, heatmap frictions (0–5), risques (IDs `Flow-...`), éléments de récupération (undo/draft) présents/absents.

### F. Risk Matrix & Dimension Overview
1. Tableau dimensions:
| Dimension | High | Medium | Low | Notes |
|-----------|------|--------|-----|-------|
2. Tableau risques consolidés:
| Risk ID | Dimension | Severity | Evidence | Recommendation | Rationale (≤18w) | Refs | Personas |
Tri: High → Medium → Low puis alpha.

### G. Action Plan (Prioritized)
| Priority | Action | Dimensions | Severity | Personas | Evidence IDs | Spec Refs | Rationale (≤18w) | Impact Attendu | Effort |
Priorisation: P1 (High critique persona / Anti-Pattern), P2 (Medium multi-dimensions), P3 (Low/optimisation). Effort: S/M/L.

### H. Metrics & Instrumentation Gaps
| Signal | Present? | Source | Gap Rationale | Suggested Event Payload | Priority |
Exemples signaux: draft_restored, undo_action, layout_shift_feedback, reduced_motion_toggle, autosave_error.

### I. Governance / Exceptions
| Date | Component | Rule Relaxed | Justification | Mitigation | Owner |
`None Found` si aucune exception.

### J. Backlog & Issue Cards
Table synthèse:
| Issue Key | Title | Risk IDs | Priority | Effort | Personas | Why (≤18w) | Acceptance (condensée) |
Issue Key: A11Y-n (P1 d’abord). Puis cartes markdown :
```
#### Issue: A11Y-1 – <Titre>
Linked Risks: <IDs>
Priority: P1 | Effort: S | Personas: TSA, ADHD
Problem: <fichier:ligne résumé>
Why: <≤18 mots>
Acceptance:
- [ ] Critère 1
- [ ] Critère 2
Telemetry: <signal ou N/A>
```

### K. Method & Orchestration
Lister: sequence `[staticCode, content, cognitiveFlow, overview]`, merge = `max-severity-union`, version orchestration. Décrire Algorithme fusion (signature dimension+fichier+élément; union evidence dédupliquée; severity=max; refs union triées; tri final High→Low→alpha). Mention gestion échecs partiels (section marquée Gap, traitement continue).

### L. Snapshot Couverture
| Aire | Statut | Note | Scope Summary |
|------|--------|------|---------------|
| Landmarks | Pending |  | Points d’ancrage + skip |
| Keyboard | Pending |  | Séquence focus opérable |
| Cognitive Scaffolding | Pending |  | Repères étapes / indices |
| Motion Control | Pending |  | Modération animation |
| Recovery | Pending |  | Undo / drafts |
| Content Clarity | Pending |  | Libellés explicites |
| Notifications | Pending |  | Feedback persistant |
| Working Memory | Pending |  | Récaps / offload |
| Undo/Draft | Pending |  | Restitution état |
Remplacer Statut par: Completed | Partial | Gap.

Table Plan d’Action (ajouter lignes triées P1→P3):
| Priority | Action | Dimensions | Severity | Personas | Evidence IDs | Spec Refs | Rationale (≤18w) | Impact Attendu | Effort |
|----------|--------|-----------|----------|----------|--------------|-----------|------------------|---------------|--------|

Règles priorisation: P1 = High + critique persona ou anti‑pattern; P2 = Medium multi-dimensions; P3 = Low.

Backlog Issues (table + cartes) :
| Issue Key | Title | Risk IDs | Priority | Effort | Personas | Why (≤18w) | Acceptance (condensée) |
|----------|-------|----------|----------|--------|----------|------------|------------------------|
IssueKey pattern: A11Y-n (P1 d’abord).

Carte issue (markdown):
```
#### Issue: A11Y-1 – Rendre icône panier focusable
Linked Risks: Keyboard-cart-icon-1
Priority: P1 | Effort: S | Personas: TSA, ADHD
Problem: Focus perdu après ajout panier (CatalogGrid.vue:42–58).
Why: Perte d’orientation augmente charge cognitive.
Acceptance:
- [ ] Icône bouton natif + aria-label
- [ ] Focus visible
- [ ] Enter & Space ouvrent le panier
Telemetry: add_to_cart (si manquant)
```

Metrics (colonnes): Signal | Present? | Source | Gap Rationale | Suggested Event | Priority. Exemples signaux: draft_restored, undo_action, layout_shift_feedback.

Contraintes clés:
- Sections toujours présentes (mettre "None Found" si vide)
- Rationale pour chaque action & issue (risks: recommandé)
- Pas de code correctif exact, seulement patterns
- ≤10 bullets exec summary, chaque ≤18 mots
- IDs risques format DIM-kebab-n

Critères d’acceptation (résumé):
1. Sections 1–16 complètes (incl. Backlog)
2. ≥2 flows ou Coverage marque Blocked
3. Chaque persona listée couverte ou message « No significant friction »
4. Risk Matrix: toutes dimensions (None si absence)
5. P1 mappe ≥1 risque High + Rationale
6. ≥3 gaps metrics si instrumentation clairement absente
7. Pas d’affirmations spéculatives sans fichier / snippet
8. JSON valide & ordre de clés respecté
9. Pourquoi (Why) ≤18 mots distinct d’Acceptance

Algorithme fusion (condensé): signature=(dimension+fichier+élément); merge evidence; sévérité=maximum; refs union; tri High→Low.

Exemples bullets exécutif:
- Focus initial manquant sur modale (High Keyboard)
- Absence undo sur profil multi-étapes (High Recovery)
- Libellés ambigus actions secondaires (Medium CopyClarity)

Fin du prompt