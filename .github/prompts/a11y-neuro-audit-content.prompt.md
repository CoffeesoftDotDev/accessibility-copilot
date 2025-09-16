---
mode: 'agent'
description: 'Audit microcopy & charge cognitive (version courte)'
tools: ['codebase','usages','todos']
outputs: ['contentFindings']
---
# Content & Microcopy

Objectif: Évaluer rapidement texte & microcopy pour charge cognitive, orientation, mémoire de travail, accessibilité sémantique.

Axes regroupés (17 → 8 blocs):
1 Structure & Outline (hiérarchie, ancrages, H1 unique)
2 Lisibilité & Densité (phrases >25 mots, blocs >150 chars)
3 Labels & Actions (verb-first, ambiguïtés: OK/Go/Here/More/+/-/…/icon-only)
4 Feedback & Erreurs (cause + impact + résolution, persistance suffisante)
5 Mémoire & Récaps (undo, recap post-action, historique essentiel)
6 Sensoriel & Temporal (animations >150ms, auto-dismiss <8s, redirects silencieux)
7 Cohérence Lexicale & i18n (mélange langue injustifié, casse incohérente)
8 Duplication & Redondance (textes identiques non justifiés)

Extraction (fichiers .md/.vue/.tsx/.html + chaînes inline): headings, labels CTA, messages statut/erreur, toasts, éléments icon-only.

JSON attendu (ordre stable):
```
{
  "outline": {"skips":[],"multipleH1":[],"headingDepthMax":0},
  "sentences": {"long":[],"sentenceLongRatio":0},
  "labels": {"ambiguous":[],"verbFirstLabelRatio":0},
  "errors": {"missingTriplet":[],"volatileFeedback":[]},
  "memory": {"missingUndo":[],"noRecap":[]},
  "sensory": {"unconditionedAnimations":[],"silentRedirects":[]},
  "lexical": {"mixedLanguageOccurrences":[]},
  "duplication": {"duplicateBlocks":[],"duplicationGroups":0}
}
```

Table Synthèse:
| Catégorie | Total | High | Med | Low | Note |
|-----------|-------|------|-----|-----|------|
| Long Sentences | 0 | 0 | 0 | 0 | |
| Ambiguous / Icon-only | 0 | 0 | 0 | 0 | |
| Missing Error Triplet | 0 | 0 | 0 | 0 | |
| Volatile Feedback | 0 | 0 | 0 | 0 | |
| Silent Redirects | 0 | 0 | 0 | 0 | |
| Unconditioned Animations | 0 | 0 | 0 | 0 | |
| Duplicate Blocks | 0 | 0 | 0 | 0 | |

Règles Sévérité:
- High: enlève ancrage / orientation (silent redirect, multi H1, icon-only critique, animation non conditionnée)
- Medium: élève charge (phrases longues isolées, duplication modérée)
- Low: style / optimisation

Heuristiques (codes): H-A1 >25% labels non verb-first; H-C1 >15% phrases longues; H-S1 animation continue non conditionnée; H-O1 redirect silencieux.

Contraintes:
- Aucune réécriture du contenu
- Uniquement observations factuelles + fragments littéraux
- Chaque High cite snippet ou chemin fichier + section ref (§7, §17 ou §22)
- Listes dédupliquées (ambiguous, duplicateBlocks)

Acceptation:
1 Tous champs JSON présents (même vides)  
2 Ratios fournis si base >0  
3 Tableau synthèse cohérent avec JSON  
4 High items référencent § et snippet  
5 Pas de suggestions prescriptives de wording  
6 Aucune clé JSON supplémentaire non définie  

Exemples bullets exécutif (≤18 mots):
- 28% labels non verb-first augmente charge de décision (Medium)
- Feedback toast disparaît <4s sans alternative (High)
- Animation infinite non conditionnée détectée (High)

Fin prompt.