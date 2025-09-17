mode: 'agent'
description: 'Backlog & Issue Cards – extraction limitée (ne produire que la section J)'
tools: ['codebase','usages','problems','fetch','todos']
output_format: 'markdown'

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

La sortie FINALE DOIT être exclusivement en Markdown (aucun bloc JSON). 
Si une section n’a aucun contenu pertinent, afficher `None Found`.

###  contenue de la sortie : Backlog & Issue Cards
Table synthèse:
| Issue Key | Title | Risk IDs | Priority | Effort | Personas | Why (≤18w) | Acceptance (condensée) |
Issue Key: A11Y-n (P1 d’abord). Puis cartes markdown :
```
#### Issue: A11Y-1 – <Titre>
Linked Risks: <IDs>
Priority: P1 | Effort: S | Personas: TSA, ADHD
Problem: <fichier:ligne résumé>
###  Backlog & Issue Cards
Le backlog liste les issues à créer dans le système de suivi (GitHub Issues, Jira, etc.) pour adresser les risques identifiés. Chaque issue est priorisée et catégorisée par persona.
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

Carte issue (markdown):
```
#### Issue: A11Y-1 – Rendre icône panier focusable
Linked Risks: Keyboard-cart-icon-1
Priority: P1 | Effort: S | Personas: TSA, ADHD
Problem: Focus perdu après ajout panier (CatalogGrid.vue:42–58).
Why: Perte d’orientation augmente charge cognitive.
Acceptance:
- [ ] Bouton natif avec aria-label dynamique
- [ ] Enter & Space togglent le panier
Telemetry: add_to_cart
```

## Sortie Attendue (Rappel)
- DOIT commencer par `### Backlog & Issue Cards`
- Aucun texte avant.
- Après dernières cartes: rien d’autre.

## Si Aucune Donnée
Si aucun risque détecté → produire tableau avec ligne « A11Y-1 | No issues detected | None | P3 | XS | All | Pas de risques actuels | Surveillance continue » et pas de cartes supplémentaires.

Fin des instructions – Génère maintenant uniquement la section Backlog & Issue Cards.