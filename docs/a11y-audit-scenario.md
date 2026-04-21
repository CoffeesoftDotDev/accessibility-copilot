# 🎵 Album Viewer — Scénario d'Audit Accessibilité Avant / Après

## Contexte

L'application **Album Viewer** est une boutique de musique construite en Vue.js / TypeScript.
Elle a l'air parfaitement fonctionnelle visuellement, mais contient **21 violations WCAG 2.2**
volontairement introduites pour servir de base de travail à un audit d'accessibilité automatisé
via les **workflows agentiques GitHub Copilot**.

Ce document décrit chaque problème, son impact concret, et la correction attendue.

> **Référentiel** : [awesome-copilot/a11y.instructions.md](https://github.com/github/awesome-copilot/blob/main/instructions/a11y.instructions.md)
> **Cible** : WCAG 2.2 niveau AA

---

## Résumé des scores

| Sévérité | Avant | Après | Action requise |
|----------|-------|-------|----------------|
| 🔴 CRITIQUE | **15** | **0** | Bloque le merge |
| 🟠 IMPORTANT | **5** | **0** | Corriger dans le sprint |
| 🟡 SUGGESTION | **1** | **0** | Planifier en itération |
| **Total** | **21** | **0** | |

---

## Scène 1 — Chargement de la page

**Fichiers** : `index.html` + `App.vue`

### 🔴 Avant

| # | Anti-Pattern | Sévérité | WCAG | Problème | Impact utilisateur |
|---|-------------|----------|------|----------|-------------------|
| 1 | **S1** — `lang` manquant | CRITIQUE | 3.1.1 (A) | `<html>` sans attribut `lang` | Le lecteur d'écran devine la langue — prononciation incorrecte de tout le contenu |
| 2 | **K5** — `outline: none` global | CRITIQUE | 2.4.7 (AA) | `* { outline: none !important; }` supprime tous les indicateurs de focus | Appuyer sur Tab → **rien ne s'allume** — l'utilisateur clavier ne sait pas où il se trouve |
| 3 | **K4** — Pas de lien d'évitement | IMPORTANT | 2.4.1 (A) | Aucun lien "Aller au contenu principal" | L'utilisateur doit traverser tout le header à chaque chargement de page |
| 4 | **S4** — Soupe de `<div>` | IMPORTANT | 1.3.1 (A) | `<div class="header">`, `<div class="main">` au lieu de `<header>`, `<main>` | Panneau landmarks du lecteur d'écran : **vide** — navigation impossible par zones |
| 5 | **V1** — Contraste insuffisant | CRITIQUE | 1.4.3 (AA) | Sous-titre `rgba(255,255,255,0.5)` sur dégradé ≈ **ratio 2:1** (min requis : 4.5:1) | "Discover amazing music albums" à peine lisible pour les utilisateurs malvoyants |
| 6 | **A8** — Toast sans live region | IMPORTANT | 4.1.3 (AA) | "Albums loaded!" disparaît en <2s, sans `role="status"` | Lecteur d'écran : **silence**. Utilisateur TDAH : cligne des yeux et c'est parti |

### ✅ Après

| # | Correction | Résultat |
|---|-----------|----------|
| 1 | `<html lang="en">` | Lecteur d'écran prononce correctement le contenu en anglais |
| 2 | Suppression du `outline: none`, ajout de `button:focus-visible { outline: 2px solid #005fcc; }` | Anneau de focus visible sur chaque élément interactif |
| 3 | `<a href="#main" class="skip-link">Skip to main content</a>` en premier élément focusable | Un seul Tab pour atteindre le contenu principal |
| 4 | `<header>`, `<main>`, `<nav>` sémantiques | Lecteur d'écran : "banner", "navigation", "main" — navigation par landmarks fonctionnelle |
| 5 | Sous-titre avec `color: rgba(255,255,255,0.85)` → ratio ≥ 4.5:1 | Texte lisible par tous |
| 6 | Toast avec `role="status"` + `aria-live="polite"` + durée ≥ 5s | Lecteur d'écran annonce la notification ; elle reste visible assez longtemps |

---

## Scène 2 — Navigation dans les albums

**Fichier** : `AlbumCard.vue`

### 🔴 Avant

| # | Anti-Pattern | Sévérité | WCAG | Problème | Impact utilisateur |
|---|-------------|----------|------|----------|-------------------|
| 7 | **S8** — `<div>` au lieu de `<button>` | CRITIQUE | 4.1.2 (A) | `<div @click="addToCart">🛒</div>` — non focusable, pas de rôle | Appuyer sur Entrée → **rien ne se passe** — action impossible au clavier |
| 8 | **K2** — `tabindex` positif | CRITIQUE | 2.4.3 (A) | `tabindex="5"` sur chaque carte → focus chaotique | L'ordre de tabulation est imprévisible et ne suit pas la lecture visuelle |
| 9 | **D1** — Image sans `alt` | CRITIQUE | 1.1.1 (A) | `<img :src="album.image_url" />` sans attribut `alt` | Lecteur d'écran : lit l'URL brute de l'image |
| 10 | **A6** — Icône sans nom accessible | CRITIQUE | 4.1.2 (A) | Boutons 🛒 et 👁 sans `aria-label` ni texte | Lecteur d'écran : annonce "groupe" ou **rien du tout** |
| 11 | **V2** — Prix en image de texte | CRITIQUE | 1.1.1 (A) + 1.4.5 (AA) | Prix affiché via `<img src="placehold.co/...?text=$9.99">` | Zoom 200% → prix flou. Lecteur d'écran → **aucune annonce du prix** |
| 12 | **V5** — Animation agressive | SUGGESTION | 2.3.3 (AAA) | `rotate(1deg) scale(1.03)` avec easing rebond 0.8s, sans `prefers-reduced-motion` | Les cartes oscillent au survol — déclencheur vestibulaire pour les utilisateurs sensibles |

### ✅ Après

| # | Correction | Résultat |
|---|-----------|----------|
| 7 | `<button @click="addToCart" aria-label="Add to cart">🛒</button>` | Focusable, activable au clavier, rôle annoncé par le lecteur d'écran |
| 8 | Suppression de `tabindex="5"` → ordre DOM naturel | Le focus suit l'ordre de lecture visuel |
| 9 | `<img :src="album.image_url" :alt="album.title + ' album cover'" />` | Lecteur d'écran : "Daprize album cover" — description utile |
| 10 | `aria-label="Add to cart"` / `aria-label="Preview album"` sur chaque bouton | Chaque action est identifiée clairement |
| 11 | `<span class="album-price">${{ album.price.toFixed(2) }}</span>` en texte réel | Prix lisible au zoom, annoncé par le lecteur d'écran |
| 12 | `@media (prefers-reduced-motion: reduce) { .album-card { transition: none; } }` | Les animations sont désactivées pour les utilisateurs qui le demandent |

---

## Scène 3 — Prévisualisation d'album

**Fichier** : `AlbumPreview.vue`

### 🔴 Avant

| # | Anti-Pattern | Sévérité | WCAG | Problème | Impact utilisateur |
|---|-------------|----------|------|----------|-------------------|
| 13 | **K3** — Pas de piège focus / pas d'Échap | CRITIQUE | 2.1.2 (A) | La modale n'a pas de `role="dialog"`, pas de piège focus, pas de gestionnaire Échap | Tab **s'échappe derrière la modale** — l'utilisateur interagit avec la page invisible |
| 14 | **K7** — Focus non restauré | IMPORTANT | 2.4.3 (A) | Fermer la modale ne ramène pas le focus sur la carte d'origine | Le focus **disparaît** vers `<body>` — l'utilisateur est perdu |
| 15 | **2.3.1** — Animation flash | CRITIQUE | 2.3.1 (A) | `@keyframes flashIn` produit un flash blanc→transparent en 0.4s (~2.5 flashs/sec) | Flash blanc vif à chaque ouverture — **risque épileptique** |
| 16 | **K1** — Bouton lecture en `<div>` | CRITIQUE | 2.1.1 (A) | `<div class="preview-play-btn" @click="togglePlay">` — pas de clavier | Impossible de lancer/mettre en pause au clavier |

### ✅ Après

| # | Correction | Résultat |
|---|-----------|----------|
| 13 | `<dialog>` natif avec `showModal()` + focus trap automatique + Échap intégré | Le focus reste dans la modale ; Échap ferme proprement |
| 14 | `triggerElement.focus()` au close | Le focus revient sur la carte qui a ouvert la prévisualisation |
| 15 | Suppression du flash ; transition douce `opacity 0.2s` respectant `prefers-reduced-motion` | Ouverture fluide sans risque de déclencher une crise |
| 16 | `<button aria-label="Play preview" @click="togglePlay">` | Activable avec Entrée/Espace, annoncé par le lecteur d'écran |

---

## Scène 4 — Panier & Paiement

**Fichiers** : `CartOverlay.vue` + `CheckoutForm.vue`

### 🔴 Avant

| # | Anti-Pattern | Sévérité | WCAG | Problème | Impact utilisateur |
|---|-------------|----------|------|----------|-------------------|
| 17 | **K3** — Panier sans Échap | CRITIQUE | 2.1.2 (A) | Le panneau panier n'a pas de gestion Échap ni de focus à l'ouverture | L'utilisateur clavier est **piégé** derrière le panneau |
| 18 | **F1** — Inputs placeholder uniquement | CRITIQUE | 3.3.2 (A) | `<input placeholder="Full Name">` sans aucun `<label>` | Le libellé **disparaît** dès la première lettre tapée — impossible de vérifier le champ |
| 19 | **F2** — Erreur non reliée au champ | CRITIQUE | 3.3.1 (A) | "Error. Check your info." sans `aria-describedby`, aucun champ surligné | Quel champ est en erreur ? **Aucun indice** pour personne |
| 20 | **2.2.1** — Limite de temps sans extension | CRITIQUE | 2.2.1 (A) | Compte à rebours de 120s **sans possibilité de prolonger** → formulaire effacé | L'utilisateur TDAH perd son travail sans avertissement suffisant |
| 21 | **2.2.2** — Clignotement impossible à stopper | CRITIQUE | 2.2.2 (A) | `@keyframes blink { 50% { opacity: 0.3 } }` en boucle infinie | Bannière rouge qui **clignote sans arrêt** — risque épileptique, distraction TDAH |

### ✅ Après

| # | Correction | Résultat |
|---|-----------|----------|
| 17 | Focus sur le premier élément du panier à l'ouverture + Échap pour fermer | Navigation clavier fluide dans le panneau |
| 18 | `<label for="name">Full Name</label>` + `<input id="name">` sur chaque champ | Le libellé reste toujours visible ; lecteur d'écran annonce le champ |
| 19 | `aria-invalid="true"` + `aria-describedby="name-error"` + focus sur le premier champ en erreur | L'utilisateur sait exactement quel champ corriger et comment |
| 20 | Bouton "Prolonger la session" avant expiration + option de désactiver la limite | L'utilisateur contrôle le timing — WCAG 2.2.1 respecté |
| 21 | Suppression de l'animation `blink` ; indicateur statique avec icône + texte | Information visible sans clignotement — zéro risque épileptique |

---

## Arbre d'accessibilité — Comparaison

### 🔴 Avant

```
RootWebArea "🎵"
├── StaticText "🎵 Album Collection"
├── StaticText "Discover amazing music albums"
├── image "" (pas d'alt)
├── StaticText "1"
├── image "" url: placehold.co/80x20...?text=$10.99  ← prix invisible
├── StaticText "🛒"                                   ← pas un bouton
├── StaticText "👁"                                   ← pas un bouton
├── image "" url: ...containerappslogo                ← pas d'alt
├── StaticText "▶"                                    ← pas un bouton
└── ... (tout est plat, aucune structure)
```

**Aucun** : heading, landmark, button, link, list, dialog.

### ✅ Après

```
RootWebArea "Album Collection — Music Store"
├── link "Skip to main content"
├── banner
│   ├── heading level=1 "🎵 Album Collection"
│   └── button "Shopping cart, 2 items"
├── main
│   ├── heading level=2 "Browse Albums"
│   ├── list "Albums"
│   │   ├── listitem
│   │   │   ├── img "Daprize album cover"
│   │   │   ├── heading level=3 "You, Me and an App Id"
│   │   │   ├── text "Daprize"
│   │   │   ├── text "$10.99"
│   │   │   ├── button "Add to cart"
│   │   │   └── button "Preview album"
│   │   └── ...
│   └── status "Albums loaded successfully"
├── dialog "Album Preview — You, Me and an App Id"
│   ├── button "Play preview"
│   ├── button "Add to cart"
│   └── button "Close preview"
└── contentinfo
```

---

## Script de démo vidéo

### 🎬 Intro

> "Je vais vous montrer comment les workflows agentiques de GitHub Copilot détectent automatiquement les problèmes d'accessibilité. On a ici une appli Vue.js qui a l'air parfaitement normale visuellement — mais qui est truffée de violations WCAG la rendant inutilisable pour les utilisateurs de technologies d'assistance."

### 🎬 Scène 1 — L'arbre d'accessibilité

> "Si j'ouvre l'arbre d'accessibilité dans les DevTools : c'est vide. Aucun heading, aucun landmark, aucun bouton. Juste du texte statique et des images sans description. Un lecteur d'écran lirait des emojis, des URLs brutes et des prix invisibles."

### 🎬 Scène 2 — Navigation clavier

> "Au clavier : aucun indicateur de focus visible — il a été supprimé globalement. Pas de lien d'évitement, un ordre de tabulation chaotique, et les boutons sont des divs — Entrée ne fait rien. L'utilisateur clavier est totalement bloqué."

### 🎬 Scène 3 — Modales

> "À l'ouverture de la prévisualisation : un flash blanc, pas de piège focus — Tab s'échappe derrière la modale — et pas d'Échap pour fermer. Le bouton lecture est inopérant au clavier."

### 🎬 Scène 4 — Paiement

> "Au checkout : les labels disparaissent dès qu'on tape, un chrono caché de 120 secondes efface le formulaire sans prévenir, les erreurs sont vagues et le bandeau d'alerte clignote sans arrêt."

### 🎬 Scène 5 — La correction

> "Maintenant, on va ajouter les bonnes pratiques d'accessibilité au repo et déclencher un workflow agentique Copilot qui va auditer tout ça automatiquement, mapper chaque problème aux critères WCAG 2.2, et proposer des corrections via une pull request. On passe de 21 violations à zéro."

---

## Références

- [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/?versions=2.2)
- [awesome-copilot a11y instructions](https://github.com/github/awesome-copilot/blob/main/instructions/a11y.instructions.md)
- Tag `v0.1-agents` — version complète avec agents, prompts et documentation
- Branche `main` — version nettoyée avec anti-patterns pour l'audit
