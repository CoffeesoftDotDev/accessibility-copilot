---
mode: 'agent'
description: 'Audit neuro-inclusif condensé (structure + cognition + flows + priorisation)'
tools: ['codebase','usages','problems','fetch','todos']
output_format: 'markdown|json|hybrid'
---
# Audit Neuro-Inclusif

## Orchestration (Meta)
Ce « uber prompt » orchestre les sous-prompts spécialisés. Il ne réécrit pas leur logique mais définit l’ordre, la fusion et la normalisation.

Séquence d’exécution recommandée (stop-on-error=false, agréger résultats partiels):
1. StaticCode: `a11y-neuro-audit-static-code.prompt.md` → extrait JSON structure/focus/motion.
2. Content: `a11y-neuro-audit-content.prompt.md` → extrait JSON outline / labels / feedback / mémoire.
3. CognitiveFlow: `a11y-neuro-audit-cognitive-flow.prompt.md` → maps flows, heatmap, scoring 0–5.
4. Overview: `a11y-neuro-audit-overview.prompt.md` → synthèse haut niveau & matrices.
5. Fusion: appliquer Algorithme fusion (ci‑dessous) pour produire UnifiedAuditJSON + tableaux Action Plan & Backlog.

Chaque sous-prompt conserve son ordre de clés interne; ce méta prompt impose ensuite l’ordre A→J défini plus bas.

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

Objectif: Produire en une seule passe une vision des risques neuro‑cognitifs et d’accessibilité structurelle + plan d’action priorisé + backlog d’issues.

Personae intégrées (abréviations à réutiliser partout):
| Code | Persona | Besoin clé | Sensibilité principale |
|------|---------|-----------|------------------------|
| TSA  | Autistic Analytical | Prévisibilité, structure | Surcharge par changements inattendus |
| ADHD | ADHD Creative | Orientation, réduction friction | Fragmentation attention, mémoire de travail |
| HYB  | Hybrid | Mix des deux | Stabilité + signal clair |

Entrées requises (exemple inline):
```
TARGET_SCOPE: src/, https://app.prod
TECH_STACK: Vue 3 + Vite + Tailwind
PRIMARY_FLOWS: Checkout, Profile Setup
PERSONAS: TSA, ADHD
KNOWN_METRICS: CLS p75=0.12, Undo usage=3.1%
DATE_AS_OF: 2025-09-16
OUTPUT_FORMAT: markdown
```

Dimensions (clé courte -> intention): Predictability, CognitiveLoad, Recovery, Semantics, Keyboard, Sensory, Feedback, WorkingMemory, InteractiveDensity, CopyClarity, RiskAggregate.

Gravité normalisée: High (bloquant / critique persona), Medium (friction matérielle), Low (optimisation).

Schéma UnifiedAuditJSON minimal (ordre stable):
```
{
  "meta": {"date":"<DATE_AS_OF>","targetScope":"...","personas":["TSA","ADHD"],"config":{}},
  "summary": {"highRiskCount":0,"mediumRiskCount":0,"lowRiskCount":0,"topDimensions":[]},
  "risks": [ {"id":"Keyboard-cart-icon-1","dimension":"Keyboard","severity":"High","evidence":"...","recommendation":"...","rationale":"Empêche perte de focus / navigation bloquée","refs":["§8"],"personas":["TSA","ADHD"]} ],
  "actionPlan": [ {"priority":"P1","action":"Corriger focus cart","riskIds":["Keyboard-cart-icon-1"],"rationale":"Navigation linéaire fiable","effort":"S"} ],
  "metricsGaps": [ {"signal":"undo_action","present":false,"priority":"High"} ],
  "governance": [ {"component":"Checkout","ruleRelaxed":"Autosave différé","justification":"Revue sécurité"} ],
  "method": {"dataSources":["static-code","content"],"normalization":"max-severity","version":"1.2"}
}
```

Phases (succinct): A Inputs → B Overview → C Static Code → D Content → E Flows → F Synthèse & Risk Matrix → G Action Plan → H Metrics Gaps → I Governance → J Executive + Backlog.

Snapshot Couverture:
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
- Libellés ambigus sur actions secondaires (Medium CopyClarity)

Fin du prompt
