mode: 'agent'
description: 'Backlog & Issue Cards – extraction limitée'
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

### Contenu de la sortie : Backlog & Issue Cards

Objectif: Générer (section J uniquement) un backlog priorisé des risques a11y / neuro-cognitifs sous forme:
1. Tableau synthèse (toutes les issues, P1 d'abord)
2. Cartes détaillées (une par issue, dans le même ordre)

Règles générales:
- Aucun texte avant le titre `### Backlog & Issue Cards` dans la sortie finale.
- JSON pur.
- Si 0 risque: produire le tableau avec la ligne neutre (cf. cas vide) et aucune carte.
- Les colonnes ne doivent pas être réordonnées; alignement libre Markdown.
- `Why` ≤ 18 mots (compter mots séparés par espaces).
- `Acceptance (condensée)` = liste compacte de livrables (séparés par `;`).
- Effort échelle: XS, S, M, L, XL.
- Priority: P1 (critique) > P2 > P3.
- Personas: liste codes (ex: `TSA, ADHD`).

Tableau synthèse (en-têtes EXACTS):
| Issue Key | Title | Risk IDs | Priority | Effort | Personas | Why (≤18w) | Acceptance (condensée) |

Numérotation:
- `Issue Key` = `A11Y-<n>` en commençant à 1, trié par Priority puis ordre d'apparition des risques sources.

Construction des champs:
- Title: verbe à l'infinitif ou substantif action clair (FR) ≤ 60 caractères.
- Risk IDs: concaténés par `; `, tri stable.
- Why: cause + impact succinct (pas d'adjectifs vagues type "important").
- Acceptance (condensée): suite de critères atomiques (pas de conjonctions longues) ex: `Focus trap; ESC ferme; Retour focus bouton déclencheur`.

Template carte (utiliser tiret cadratin « – » après l'Issue Key):
```
#### Issue: A11Y-<n> – <Title>
Linked Risks: <Risk IDs>
Priority: P<1|2|3> | Effort: <XS|S|M|L|XL> | Personas: <codes>
Problem: <fichier[:ligne] bref résumé contexte>
Why: <≤18 mots>
Acceptance:
- [ ] Critère 1
- [ ] Critère 2
Telemetry: <eventName ou N/A>
```

<!-- Exemple minimal retiré sur demande: la génération ne doit plus inclure d'exemple pré-rempli. -->

## Sortie Attendue (Rappel)
- DOIT commencer par `### Backlog & Issue Cards`
- Aucun texte avant.
- Après dernières cartes: rien d’autre.

## Si Aucune Donnée
Si aucun risque détecté → produire tableau avec ligne « A11Y-1 | No issues detected | None | P3 | XS | All | Pas de risques actuels | Surveillance continue » et pas de cartes supplémentaires.

Fin des instructions
