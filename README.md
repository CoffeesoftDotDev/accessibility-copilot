# NeurodiversityCopilot

🧠 Objectif principal</br>
Réduire la fatigue cognitive, l’anxiété et améliorer la compréhension pour les utilisateurs neurodivergents.</br>

📐 1. Structure cohérente</br>
Répéter les éléments dans le même ordre et au même endroit sur chaque page.</br>
Utiliser les mêmes mots ou icônes pour les éléments récurrents.</br>

📄 2. Clarté du contenu</br>
Mise en page : sections courtes, une idée par phrase, 3-4 phrases par paragraphe.</br>
Titres : clairs, descriptifs, pour faciliter la navigation.</br>
Langage : simple, sans métaphores ni idiomes.</br>
Icônes : explicites, accompagnées de labels visuels.</br>
Nombres : arrondis, éviter les fractions et pourcentages complexes.</br>
Liens : texte descriptif, souligné pour être bien visible.</br>

🔕 3. Réduction des distractions</br>
Éviter les contenus qui bougent, clignotent ou jouent automatiquement.</br>
Permettre à l’utilisateur de stopper ou mettre en pause ces éléments.</br>

🧭 4. Ne pas dépendre de la mémoire</br>
Instructions claires au moment où elles sont nécessaires.</br>
Autoriser le copier-coller des mots de passe ou codes.</br>
Prévenir l’utilisateur des infos nécessaires avant de commencer un formulaire.</br>
Pré-remplir les champs déjà connus.</br>

⏳ 5. Donner plus de temps</br>
Supprimer les limites de temps ou permettre de les ajuster.</br>
Permettre de sauvegarder un formulaire pour le finir plus tard.</br>
Éviter les estimations de durée : préférer “10 questions” à “5 minutes”.</br>

# Resources :

[gh model in actions](https://github.blog/ai-and-ml/generative-ai/automate-your-project-with-github-models-in-actions/)
[gh coding agent to work on an issue](https://docs.github.com/en/enterprise-cloud@latest/copilot/how-tos/use-copilot-agents/coding-agent/assign-copilot-to-an-issue)
[gh about](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-coding-agent)
[gh custom instructions](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions)
[gh cli in workflow](https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-github-cli)

> Ce document présente la sortie d’audit (format initial conservé) avec une mise en forme améliorée sans modification de contenu.

---

## Sommaire

1. [Issues (JSON)](#issues-json)
2. [Roadmap (Lots / Sprints)](#roadmap-lots--sprints)
3. [Métriques initiales + Cibles](#métriques-initiales--cibles)
4. [Annexes](#annexes)
5. [Script d’automatisation (Esquisse)](#script-dautomatisation-esquisse-playwright)
6. [Linting custom (Idéation)](#linting-custom-idéation)
7. [Recommandations Quick Wins](#recommandations-de-mise-en-œuvre-synthèse-quick-wins)
8. [Notes de Priorisation](#notes-de-priorisation)
9. [Plan d’Implémentation par Commits](#plan-dimplémentation-par-commits-granularité-recommandée)

---

## Issues (JSON)

```json
[
  {
    "id": 1,
    "categorie": "Structure & Landmarks",
    "probleme": "Absence de balises landmarks (main, nav explicites avec aria-label, header/footer) dans AppLayout et index.html: simple <div> conteneurs.",
    "impact_TSA": "Réduit repères hiérarchiques explicites, augmente effort d’intégration multi-sensorielle.",
    "impact_TDAH": "Augmente temps de localisation des zones fonctionnelles, favorise distraction.",
    "normes": [
      "WCAG 1.3.1 Info and Relationships",
      "WCAG 2.4.1 Bypass Blocks",
      "Inclusive Design - Perceivable Structure"
    ],
    "gravite": "Haute",
    "justification_gravite": "Structure sémantique fondatrice manquante, cascade sur orientation et navigation clavier.",
    "exemple": "Fichier: AppLayout.vue (template root div.app-layout sans <main> ni <aside>).",
    "risque_cumulatif": "Élevé",
    "remediation": "Remplacer conteneurs par <header>, <nav>, <aside>, <main>, <footer> et ajouter aria-labels explicites.",
    "quick_win": "Ajouter <main role=\"main\"> autour de <router-view />.",
    "refonte_complete": "Refactor global layout avec systeme de layout sémantique + skip link + hiérarchie de titres standardisée.",
    "indicateur_validation": "Audit axe-core: 0 violation role/landmark critique; 100% pages possèdent un unique <main>.",
    "effort": "M",
    "priorite": "P1",
    "statut": "Backlog",
    "tag": "structure"
  },
  {
    "id": 2,
    "categorie": "Navigation & Orientation",
    "probleme": "Aucun 'skip to content' ni gestion du focus lors des changements de route; absence d’aria-current sur éléments actifs.",
    "impact_TSA": "Transitions silencieuses augmentent charge d’exécution (re-scan contextuel).",
    "impact_TDAH": "Fragmentation attentionnelle, perte de but lors de navigation profonde.",
    "normes": [
      "WCAG 2.4.1",
      "WCAG 2.4.3 Focus Order",
      "WCAG 2.4.7 Focus Visible"
    ],
    "gravite": "Haute",
    "justification_gravite": "Empêche navigation efficiente clavier et orientation rapide.",
    "exemple": "SidebarNav.vue: router-link (tag=\"li\") sans aria-current ni focus style défini.",
    "risque_cumulatif": "Élevé",
    "remediation": "Ajouter lien 'Skip to main content' focusable et gestion programmatique du focus sur <h1> après route.",
    "quick_win": "Insérer <a class=\"skip-link\" href=\"#main\">Skip to content</a> caché visuellement.",
    "refonte_complete": "Hook router.afterEach => focus sur premier titre + annonce via aria-live 'Page: {titre}'.",
    "indicateur_validation": "Test e2e (Playwright): Tab -> skip link visible; focus repositionné en < 50ms sur H1 après navigation.",
    "effort": "M",
    "priorite": "P1",
    "statut": "Backlog",
    "tag": "focus"
  },
  {
    "id": 3,
    "categorie": "Hiérarchie & Titres",
    "probleme": "Absence d’un schéma clair des <h1>/<h2>; plusieurs sections utilisent <h2> décoratif (SidebarNav titres) mais pas de H1 principal par view.",
    "impact_TSA": "Manque de repères sériels hiérarchiques; augmente effort parsing détaillé.",
    "impact_TDAH": "Difficulté d’ancrage objectif sur la page; augmentation temps de scanning.",
    "normes": ["WCAG 1.3.1", "Cognitive Load - réduire charge extrinsèque"],
    "gravite": "Haute",
    "justification_gravite": "Hiérarchie de contenus = pivot navigation assistive & mémoire de travail.",
    "exemple": "SidebarNav.vue <h2 class=\"sidebar-nav__title\"> sans H1 existant dans view principale.",
    "risque_cumulatif": "Modéré",
    "remediation": "Définir un unique <h1> par route (ex: 'Browse', 'Albums Collection') et ajuster titres latéraux en <h3> aria-level ou <p role=heading>.",
    "quick_win": "Ajouter <h1>{{ pageTitle }}</h1> dans chaque view.",
    "refonte_complete": "Générateur de titres central (store) + mixin pour injection automatique.",
    "indicateur_validation": "Script lint: 100% des vues contiennent un unique H1 détecté.",
    "effort": "S",
    "priorite": "P2",
    "statut": "Backlog",
    "tag": "structure"
  },
  {
    "id": 4,
    "categorie": "Chargements & États",
    "probleme": "Pas de skeleton/placeholder ni aria-busy lors de requêtes (ex: playlists chargées dynamiquement).",
    "impact_TSA": "Variation de layout non annoncée → surcharge sensorielle soudaine.",
    "impact_TDAH": "Fenêtre d’inactivité silencieuse -> propension à changer de tâche.",
    "normes": [
      "WCAG 4.1.3 Status Messages",
      "ARIA Authoring Practices - Busy Indicators"
    ],
    "gravite": "Moyenne",
    "justification_gravite": "Impact moyen mais fréquent sur pages dynamiques.",
    "exemple": "Sidebar/index.vue created() getUserPlaylists() sans état visuel temporaire.",
    "risque_cumulatif": "Modéré",
    "remediation": "Ajouter état 'loading...' avec aria-busy=\"true\" sur container playlists.",
    "quick_win": "Afficher spinner accessible (<div role=\"status\" aria-live=\"polite\">Loading playlists…</div>).",
    "refonte_complete": "Composant Skeleton list + transitions stables dimensionnellement.",
    "indicateur_validation": "100% requêtes async list affichent statut live region détecté en test e2e.",
    "effort": "M",
    "priorite": "P3",
    "statut": "Backlog",
    "tag": "feedback"
  },
  {
    "id": 5,
    "categorie": "Formulaires & Validation",
    "probleme": "Composants de recherche/login minimalistes sans stratégie d’erreurs persistantes ou association label explicite (index non vu mais pattern suggéré).",
    "impact_TSA": "Ambiguïté d’étiquetage augmente micro-interruptions de décodage.",
    "impact_TDAH": "Absence de feedback clair augmente cycles de tentative-erreur.",
    "normes": [
      "WCAG 3.3.1 Error Identification",
      "WCAG 3.3.2 Labels or Instructions"
    ],
    "gravite": "Moyenne",
    "justification_gravite": "Critique dès introduction de formulaires complexes futurs.",
    "exemple": "NavbarSearch.vue (non lu mais attendu) potentielle absence de <label for>.",
    "risque_cumulatif": "Faible",
    "remediation": "Auditer champs, ajouter <label>, aria-invalid, résumé d’erreurs persistant en haut du formulaire.",
    "quick_win": "Ajouter label visuel/ARIA au champ de recherche.",
    "refonte_complete": "Builder de formulaires accessible + pattern de validation unifiée.",
    "indicateur_validation": "Lint: 0 champ input sans label; e2e: message d’erreur persiste jusqu’à correction.",
    "effort": "S",
    "priorite": "P4",
    "statut": "Backlog",
    "tag": "form"
  },
  {
    "id": 6,
    "categorie": "Composants dynamiques",
    "probleme": "Modal playlist-create ouvert via $modal sans preuve de focus trap / aria-modal / role=dialog.",
    "impact_TSA": "Perte de contexte si fond reste navigable; surcharge sensorielle mouvante.",
    "impact_TDAH": "Multiplication de points d’interaction simultanés augmente distraction.",
    "normes": ["WCAG 2.4.3", "WAI-ARIA Dialog Practices"],
    "gravite": "Haute",
    "justification_gravite": "Dialog mal géré = blocage d’utilisabilité clavier.",
    "exemple": "Sidebar/index.vue bouton ouvre $modal.show('playlist-create-modal').",
    "risque_cumulatif": "Élevé",
    "remediation": "Configurer composant modal avec aria-modal=\"true\", role=\"dialog\", focus initial et retour focus.",
    "quick_win": "Forcer focus sur premier champ à opened hook.",
    "refonte_complete": "Wrapper custom AccessibleModal avec trap de focus et tests.",
    "indicateur_validation": "Test e2e: Tab reste dans fenêtre; focus retourne sur bouton déclencheur à fermeture.",
    "effort": "M",
    "priorite": "P1",
    "statut": "Backlog",
    "tag": "dialog"
  },
  {
    "id": 7,
    "categorie": "Interaction Clavier & Focus",
    "probleme": "Éléments interactifs (li transformés par router-link + button icône) sans styles :focus visibles; outline supprimé via CSS global probable.",
    "impact_TSA": "Repères de navigation invisibles → surcharge d’exploration.",
    "impact_TDAH": "Désorientation, allongement du chemin cognitif pour objectif.",
    "normes": ["WCAG 2.4.7 Focus Visible", "WCAG 2.1.1 Keyboard"],
    "gravite": "Haute",
    "justification_gravite": "Perte d’accessibilité clavier de base.",
    "exemple": "SidebarNav.vue .sidebar-nav__item n’a aucun style :focus documenté.",
    "risque_cumulatif": "Élevé",
    "remediation": "Ajouter style focus contrasté (outline 2px, non dépendant de couleur seule).",
    "quick_win": "CSS: .sidebar-nav__item:focus { outline: 2px solid #00ffc8; outline-offset: 2px; }",
    "refonte_complete": "Thème focus tokens (CSS vars) + test automatisé screenshot diff.",
    "indicateur_validation": "Audit axe: 0 échec focus-visible; capture Playwright valide coloration sur 30 liens échantillon.",
    "effort": "S",
    "priorite": "P1",
    "statut": "Backlog",
    "tag": "focus"
  },
  {
    "id": 8,
    "categorie": "Feedback & Notifications",
    "probleme": "Notifications éphémères (Notify.vue) non annoncées aux lecteurs (absence role='status' ou aria-live) et disparition auto (duration=4000).",
    "impact_TSA": "Stimulus transitoire sans persistance → surcharge interprétation rapide.",
    "impact_TDAH": "Perte d’information si attention déplacée au moment de l’affichage.",
    "normes": [
      "WCAG 4.1.3 Status Messages",
      "WCAG 2.2.4 (Timeouts) pertinence contextuelle"
    ],
    "gravite": "Moyenne",
    "justification_gravite": "Information potentiellement critique non retenue.",
    "exemple": "Notify.vue: <div :class=\"classes\"> sans aria-live.",
    "risque_cumulatif": "Modéré",
    "remediation": "Ajouter role=\"status\" aria-live=\"polite\" + option de persistance et bouton Close standard.",
    "quick_win": "role=\"status\" sur container + prolonger durée configurable.",
    "refonte_complete": "Centre de notifications avec historique accessible (list).",
    "indicateur_validation": "Test: notification lue via API accessibility tree; persistance paramétrable.",
    "effort": "S",
    "priorite": "P2",
    "statut": "Backlog",
    "tag": "feedback"
  },
  {
    "id": 9,
    "categorie": "Personnalisation Cognitive",
    "probleme": "Aucun mode 'faible stimulation' ou 'focus mode' (désactivation animations, réduction contraste de mouvement, suppression auto-hide).",
    "impact_TSA": "Stimuli visuels potentiellement envahissants sans contrôle utilisateur.",
    "impact_TDAH": "Mauvaise gestion distracteurs visuels récurrents.",
    "normes": [
      "WCAG 2.3.3 Animation from Interactions",
      "Inclusive Personalization Principles"
    ],
    "gravite": "Moyenne",
    "justification_gravite": "Pas bloquant mais amélioration majeure d’inclusion.",
    "exemple": "Aucune variable de thème ou toggle trouvé dans code parcouru.",
    "risque_cumulatif": "Modéré",
    "remediation": "Ajouter toggle global 'Mode Focus' qui applique classe root .mode-focus.",
    "quick_win": "Switch boolean dans store désactivant animations CSS (prefers-reduced-motion).",
    "refonte_complete": "Panneau de préférences persistées (localStorage) : réduction mouvement, densité.",
    "indicateur_validation": "Mode activé réduit nombre d’animations CSS actives de >80%.",
    "effort": "M",
    "priorite": "P3",
    "statut": "Backlog",
    "tag": "personnalisation"
  },
  {
    "id": 10,
    "categorie": "Densité visuelle & Lisibilité",
    "probleme": "Espacements serrés (sidebar-nav items margin-bottom 10px, font-size 14px, possible contraste insuffisant gris #c?) et min-width forcée 630px.",
    "impact_TSA": "Traitement détaillé surchargé par densité textuelle.",
    "impact_TDAH": "Réduction lisibilité -> augmentation coût maintien objectif.",
    "normes": [
      "WCAG 1.4.3 Contrast (Minimum)",
      "Cognitive Load - réduire extrinsèque"
    ],
    "gravite": "Moyenne",
    "justification_gravite": "Lisibilité médiane; amélioration multiplie efficacité navigation.",
    "exemple": "SidebarNav.vue style font-size 14px / color $c-gray (valeur à vérifier).",
    "risque_cumulatif": "Modéré",
    "remediation": "Augmenter line-height (≥1.5), vérifier contrastes ≥4.5:1, ajouter padding vertical.",
    "quick_win": "CSS: .sidebar-nav__item { line-height: 1.5; }",
    "refonte_complete": "Scale typographique + tokens design (rem).",
    "indicateur_validation": "Rapport contraste ≥ AA sur 100% palette texte principal.",
    "effort": "S",
    "priorite": "P4",
    "statut": "Backlog",
    "tag": "lisibilite"
  },
  {
    "id": 11,
    "categorie": "Gestion du Changement de Contexte",
    "probleme": "Redirection automatique depuis Login.vue vers '/' après tokens; absence d’annonce.",
    "impact_TSA": "Changement implicite de scène non contextualisé.",
    "impact_TDAH": "Perte d’ancrage si focus se déplace sans repère.",
    "normes": ["WCAG 3.2.2 On Input", "Interaction Predictability"],
    "gravite": "Moyenne",
    "justification_gravite": "Peut surprendre et désorienter clavier / AT.",
    "exemple": "Login.vue created() router.push('/').",
    "risque_cumulatif": "Modéré",
    "remediation": "Afficher message 'Connexion réussie – redirection…' aria-live avant navigation ou bouton 'Continuer'.",
    "quick_win": "Delay 500ms + aria-live status.",
    "refonte_complete": "Étape explicitée avec confirmation utilisateur.",
    "indicateur_validation": "Test: AT annonce message avant navigation 100% du temps.",
    "effort": "S",
    "priorite": "P3",
    "statut": "Backlog",
    "tag": "contexte"
  },
  {
    "id": 12,
    "categorie": "Micro-interactions & Mouvement",
    "probleme": "Absence de conditionnement des animations à prefers-reduced-motion.",
    "impact_TSA": "Stimuli potentiellement aversifs / surcharge sensorielle.",
    "impact_TDAH": "Mouvement non pertinent attire attention périphérique.",
    "normes": ["WCAG 2.3.3", "Reduced Motion Guidelines"],
    "gravite": "Basse",
    "justification_gravite": "Non critique si animations peu présentes, mais anticiper.",
    "exemple": "Aucune media query @media (prefers-reduced-motion).",
    "risque_cumulatif": "Faible",
    "remediation": "Ajouter règle globale désactivant transitions non essentielles.",
    "quick_win": "Body classe .reduce-motion appliquée selon media query.",
    "refonte_complete": "Gestion centralisée animations + API utilisateur.",
    "indicateur_validation": "Audit CSS: 0 transition >100ms quand prefers-reduced-motion.",
    "effort": "S",
    "priorite": "P5",
    "statut": "Backlog",
    "tag": "mouvement"
  },
  {
    "id": 13,
    "categorie": "Charge Mémoire & Persistance",
    "probleme": "Notifications non historisées; état de lecture (playlist) non résumé globalement.",
    "impact_TSA": "Absence d’agrégation augmente reconstitution mentale du contexte.",
    "impact_TDAH": "Oublis fréquents d’actions récentes, perte du fil.",
    "normes": ["Cognitive Load - Working Memory Support"],
    "gravite": "Moyenne",
    "justification_gravite": "Freine interactions séquentielles (gestion playlists).",
    "exemple": "Notify.vue destruction après duration.",
    "risque_cumulatif": "Modéré",
    "remediation": "Créer panneau historique (dernier 10 événements) consultable.",
    "quick_win": "Stocker notifications dans store non purge immédiate.",
    "refonte_complete": "Journal actions + undo pour opérations destructives.",
    "indicateur_validation": "Test: 10 dernières actions accessibles via API store.",
    "effort": "M",
    "priorite": "P3",
    "statut": "Backlog",
    "tag": "memoire"
  },
  {
    "id": 14,
    "categorie": "Cohérence Multi-plateforme",
    "probleme": "Pas de conventions de tokens transverses (couleurs, espacements) centralisés pour adaptation.",
    "impact_TSA": "Variabilité potentielle rend repères moins consistants.",
    "impact_TDAH": "Augmente temps re-familiarisation en changements de vue.",
    "normes": ["Design System Consistency"],
    "gravite": "Basse",
    "justification_gravite": "Préventif mais influence évolutivité.",
    "exemple": "Styles Sass dispersés par composant.",
    "risque_cumulatif": "Faible",
    "remediation": "Introduire design tokens (CSS custom properties).",
    "quick_win": "Palette root :root { --color-primary: ... }",
    "refonte_complete": "Fichier tokens + theming adaptatif (focus/mode réduit).",
    "indicateur_validation": "100% couleurs principales référencées via variables.",
    "effort": "M",
    "priorite": "P5",
    "statut": "Backlog",
    "tag": "coherence"
  },
  {
    "id": 15,
    "categorie": "Accessibilité des Données & Tableaux",
    "probleme": "Potentiels listings (tracks/albums) non confirmés avec structure table/list sémantique améliorée.",
    "impact_TSA": "Manque de groupement structurel ralentit parsing séquentiel.",
    "impact_TDAH": "Absence de regroupement visuel augmente dispersion attentionnelle.",
    "normes": ["WCAG 1.3.1"],
    "gravite": "Moyenne",
    "justification_gravite": "Important si tables complexes apparaissent.",
    "exemple": "Non observé directement (anticipation).",
    "risque_cumulatif": "Faible",
    "remediation": "Utiliser <table> ou <ul role=\"list\"> selon nature données; entêtes explicites.",
    "quick_win": "Marquer listes actuelles avec role approprié.",
    "refonte_complete": "Composant DataGrid accessible.",
    "indicateur_validation": "Tests: AT reconnaît en-têtes colonnes (th scope).",
    "effort": "M",
    "priorite": "P4",
    "statut": "Backlog",
    "tag": "donnees"
  },
  {
    "id": 16,
    "categorie": "Chat / Agents / Assistants",
    "probleme": "Non applicable (aucun module chat).",
    "impact_TSA": "N/A",
    "impact_TDAH": "N/A",
    "normes": [],
    "gravite": "Basse",
    "justification_gravite": "Absence = pas de risque.",
    "exemple": "Pas de fichiers pertinents.",
    "risque_cumulatif": "Faible",
    "remediation": "Surveiller futur ajout pour éviter notifications intrusives.",
    "quick_win": "N/A",
    "refonte_complete": "N/A",
    "indicateur_validation": "N/A",
    "effort": "S",
    "priorite": "P6",
    "statut": "Backlog",
    "tag": "n/a"
  },
  {
    "id": 17,
    "categorie": "Architecture & State Management",
    "probleme": "Actions silencieuses (store dispatch navigation, playlist fetch) sans instrumentation d’événements observables.",
    "impact_TSA": "Changements non annoncés -> rupture de prévisibilité.",
    "impact_TDAH": "Risque d’ignorer tâche terminée faute de feedback.",
    "normes": ["Observable State Principles"],
    "gravite": "Moyenne",
    "justification_gravite": "Devient critique à l’échelle.",
    "exemple": "store.dispatch('auth/login') dans router.beforeEach sans feedback.",
    "risque_cumulatif": "Modéré",
    "remediation": "Middleware store pour logger + émettre événements UI (aria-live).",
    "quick_win": "Console + notification persistante 'Connexion en cours...'.",
    "refonte_complete": "Canal event-bus standard + instrumentation.",
    "indicateur_validation": "100% actions réseau >500ms déclenchent indicateur chargé.",
    "effort": "M",
    "priorite": "P4",
    "statut": "Backlog",
    "tag": "etat"
  },
  {
    "id": 18,
    "categorie": "Performance perçue & Latence",
    "probleme": "Absence de prefetch / lazy chunk feedback; router-view vide avant rendu.",
    "impact_TSA": "Vidage visuel soudain (flash) = surcharge.",
    "impact_TDAH": "Latence silencieuse déclenche alt-tab/distraction.",
    "normes": ["Perceived Performance Heuristics"],
    "gravite": "Moyenne",
    "justification_gravite": "Expérience globale ressentie dégradée.",
    "exemple": "AppLayout.vue <router-view /> nu.",
    "risque_cumulatif": "Modéré",
    "remediation": "Skeleton stable hauteur + aria-busy durant chargement.",
    "quick_win": "Placeholder <div class='page-skeleton' aria-hidden='true' />.",
    "refonte_complete": "Prediction prefetch + streaming partiel.",
    "indicateur_validation": "Time-to-first-meaningful > amélioration 20%; absence CLS navigation.",
    "effort": "M",
    "priorite": "P3",
    "statut": "Backlog",
    "tag": "performance"
  },
  {
    "id": 19,
    "categorie": "Internationalisation & Clarté linguistique",
    "probleme": "Libellés anglais partiels non contextualisés ('New playlist', 'Browse'); aucune stratégie i18n détectée.",
    "impact_TSA": "Incohérence terminologique augmente parsing détaillé.",
    "impact_TDAH": "Commutation lexicale freine maintien objectif.",
    "normes": ["WCAG 3.1.2 Language of Parts"],
    "gravite": "Basse",
    "justification_gravite": "Sans contenu volumineux c’est modéré.",
    "exemple": "Sidebar/index.vue 'New playlist' hard-coded.",
    "risque_cumulatif": "Faible",
    "remediation": "Intégrer plugin i18n + dictionnaire stable.",
    "quick_win": "Centraliser strings dans objet constants.",
    "refonte_complete": "Intl pipeline + détection locale.",
    "indicateur_validation": "0 chaîne littérale UI hors store i18n.",
    "effort": "M",
    "priorite": "P5",
    "statut": "Backlog",
    "tag": "langue"
  },
  {
    "id": 20,
    "categorie": "Sécurité cognitive",
    "probleme": "Aucune confirmation non intrusive pour actions potentiellement destructives (ex: suppression playlist potentielle) ni prévention perte données en navigation.",
    "impact_TSA": "Anxiété anticipatoire si conséquences silencieuses.",
    "impact_TDAH": "Erreurs impulsives non récupérables.",
    "normes": [
      "Error Prevention Heuristics",
      "WCAG 3.3.6 Error Prevention (future alignment)"
    ],
    "gravite": "Moyenne",
    "justification_gravite": "Impact augmente avec fonctionnalités CRUD.",
    "exemple": "Bouton 'New playlist' - absence pattern similaire pour delete non vu mais à anticiper.",
    "risque_cumulatif": "Modéré",
    "remediation": "Dialogue confirmation accessible (role=alertdialog) + undo 5s.",
    "quick_win": "Toast 'Playlist supprimée – Annuler?' avec bouton focusable.",
    "refonte_complete": "Pattern global undo transactionnel.",
    "indicateur_validation": "100% actions destructives testées ont chemin d’annulation.",
    "effort": "M",
    "priorite": "P3",
    "statut": "Backlog",
    "tag": "securite"
  }
]
```

---

## Roadmap (Lots / Sprints)

### Sprint 1 – Fondations (Semaines 1–2)

Landmarks + skip link (Issues 1,2)
H1 par page + focus visible (3,7)
Notifications aria-live (8)
Focus management router (2) Objectif: Réduire charge extrinsèque et restaurer orientation clavier.

### Sprint 2 – Interaction & Feedback (Semaines 3–4)

Dialog accessible (6)
Chargements & skeleton (4,18)
Redirections annoncées (11)
Statuts actions réseau (17) Objectif: Rendre transitions prévisibles, fourniture feedback immédiat.

### Sprint 3 – Personnalisation & Mémoire (Semaines 5–6)

Mode focus / reduced stimulation (9,12)
Historique notifications / actions (13)
Design tokens & densité (10,14)
i18n base (19)

### Sprint 4 – Durabilité & Sécurité Cognitive (Semaines 7–8)

Undo / confirmations non intrusives (20)
Data listings sémantisés (15)
Performance perçue optimisations (18)
Préparation tests automatisés (axe + playwright) couvrant focus / landmarks / status.

### Sprint Continu (Observabilité & QA)

Intégration lint custom (headings, aria, i18n).
Mesure ongoing metrics.

---

## Métriques initiales + Cibles

Couverture Landmarks
Baseline: 0% pages avec main/header/nav sémantiques
Cible Sprint 1: 100%

Focus Visible
Baseline estimée: ~20% (seuls enlaces par défaut)
Cible Sprint 1: 100% éléments interactifs test Playwright

Annonce de Navigation (aria-live + focus reposition)
Baseline: 0%
Cible Sprint 2: 100% routes majeures

Délai Feedback Action (ms jusqu’à indicateur busy)
Baseline: >500ms (silencieux)
Cible Sprint 2: <150ms

Persistance Notifications (consultables)
Baseline: 0
Cible Sprint 3: Historique 10 événements

Modes Personnalisation actifs (focus mode toggle)
Baseline: 0
Cible Sprint 3: 1 mode

Actions Destructives avec Undo
Baseline: 0%
Cible Sprint 4: 100%

Taux Violations Axe Critiques
Baseline: (à mesurer) – hypothèse >10
Cible Sprint 2: 0 critiques, <5 mineures

CLS (Cumulative Layout Shift) après navigation
Baseline: Non mesuré
Cible Sprint 4: <0.05

Ratio Strings Internationalisées
Baseline: <10%
Cible Sprint 3: 60% | Sprint 4: 90%

---

## Annexes

### Glossaire (sélection)

Charge extrinsèque: Charge cognitive inutile générée par présentation de l’information ou interface.
Focus trap: Mécanisme limitant la navigation clavier à l’intérieur d’un conteneur modal.
Live region: Zone annoncée dynamiquement par technologies d’assistance.
Mode faible stimulation: Configuration réduisant mouvements, stimuli visuels, densité.
Undo transactionnel: Fenêtre temporelle permettant l’annulation d’une action persistée.

### Référentiels

WCAG 2.2 (1.3.1, 2.4.x, 3.2.x, 4.1.3, 2.2.x, 3.3.x)
Inclusive Design Toolkit (Microsoft)
Cognitive Load Theory (Sweller)
ARIA Authoring Practices (Dialog, Navigation, Status)

---

## Script d’automatisation (Esquisse Playwright)

Objectif: Vérifier focus, skip link, H1 unique, aria-live notifications.

Pseudo-code:

Navigate home -> Press Tab -> Expect '.skip-link' visible & focused.
Trigger route change -> Expect document.activeElement is H1.
Count headings -> Expect exactly one H1.
Fire store notification -> Query accessibility tree -> Role 'status' present.

---

## Linting custom (Idéation)

ESLint plugin règles:

Enforcer 1 H1 / view
Interdire button sans aria-label si icon-only
Exiger role=dialog + aria-modal sur modals

Stylelint:

Rejeter suppression outline sans remplacement visible.

CI Gate:

Axe-core scan sur build storybook / pages clés.
Failing pipeline si >0 violations critiques.

---

## Recommandations de Mise en Œuvre (Synthèse Quick Wins)

Ajouter skip link + balises <main>, <nav> (Jour 1).
Styles focus tokens + audit axe (Jour 2).
aria-live sur notifications + option persist (Jour 2).
H1 normalisé par vue + focus router (Jour 3).
Dialog accessible wrapper (Jour 5).

---

## Notes de Priorisation

Formule interne (pondération indicative): Priorité = Gravité (3/2/1) \* Fréquence d’exposition (3 haute, 2 moyenne, 1 faible) / Effort (S=1, M=2, L=3) Les P1 identifiées >4 score.

---

## Plan d’Implémentation par Commits (Granularité Recommandée)

| Commit | Objet                                             | Fichiers                              | Effet neurocognitif                    |
| ------ | ------------------------------------------------- | ------------------------------------- | -------------------------------------- |
| 1      | Ajouter skip link + CSS                           | index.html, styles/app.sass ou global | Réduction charge extrinsèque initiale  |
| 2      | Introduire <main> + aside + aria-labels           | AppLayout.vue                         | Stabilise repères sériels              |
| 3      | Focus management post-route                       | index.js                              | Réduction fragmentation attentionnelle |
| 4      | aria-current="page" + correction sémantique liste | SidebarNav.vue                        | Renforcement but & orientation         |
| 5      | Composant PageTitle.vue + intégration H1          | views/\* + nouveau composant          | Ancrage conceptuel page                |
| 6      | Styles focus tokens + fallback                    | Global styles                         | Visibilité navigation séquentielle     |
| 7      | Ajout test Playwright + axe scan                  | e2e/ scripts                          | Validation objective continue          |
| 8      | Lint règles personnalisées                        | .eslintrc.js, script plugin           | Prévention régresseurs                 |

---

Roadmap (Lots / Sprints)
Sprint 1 – Fondations (Semaines 1–2)

Landmarks + skip link (Issues 1,2)
H1 par page + focus visible (3,7)
Notifications aria-live (8)
Focus management router (2) Objectif: Réduire charge extrinsèque et restaurer orientation clavier.
Sprint 2 – Interaction & Feedback (Semaines 3–4)

Dialog accessible (6)
Chargements & skeleton (4,18)
Redirections annoncées (11)
Statuts actions réseau (17) Objectif: Rendre transitions prévisibles, fourniture feedback immédiat.
Sprint 3 – Personnalisation & Mémoire (Semaines 5–6)

Mode focus / reduced stimulation (9,12)
Historique notifications / actions (13)
Design tokens & densité (10,14)
i18n base (19)
Sprint 4 – Durabilité & Sécurité Cognitive (Semaines 7–8)

Undo / confirmations non intrusives (20)
Data listings sémantisés (15)
Performance perçue optimisations (18)
Préparation tests automatisés (axe + playwright) couvrant focus / landmarks / status.
Sprint Continu (Observabilité & QA)

Intégration lint custom (headings, aria, i18n).
Mesure ongoing metrics.
Métriques initiales + Cibles
Couverture Landmarks
Baseline: 0% pages avec main/header/nav sémantiques
Cible Sprint 1: 100%
Focus Visible
Baseline estimée: ~20% (seuls enlaces par défaut)
Cible Sprint 1: 100% éléments interactifs test Playwright
Annonce de Navigation (aria-live + focus reposition)
Baseline: 0%
Cible Sprint 2: 100% routes majeures
Délai Feedback Action (ms jusqu’à indicateur busy)
Baseline: >500ms (silencieux)
Cible Sprint 2: <150ms
Persistance Notifications (consultables)
Baseline: 0
Cible Sprint 3: Historique 10 événements
Modes Personnalisation actifs (focus mode toggle)
Baseline: 0
Cible Sprint 3: 1 mode
Actions Destructives avec Undo
Baseline: 0%
Cible Sprint 4: 100%
Taux Violations Axe Critiques
Baseline: (à mesurer) – hypothèse >10
Cible Sprint 2: 0 critiques, <5 mineures
CLS (Cumulative Layout Shift) après navigation
Baseline: Non mesuré
Cible Sprint 4: <0.05
Ratio Strings Internationalisées
Baseline: <10%
Cible Sprint 3: 60% | Sprint 4: 90%
Annexes
Glossaire (sélection)
Charge extrinsèque: Charge cognitive inutile générée par présentation de l’information ou interface.
Focus trap: Mécanisme limitant la navigation clavier à l’intérieur d’un conteneur modal.
Live region: Zone annoncée dynamiquement par technologies d’assistance.
Mode faible stimulation: Configuration réduisant mouvements, stimuli visuels, densité.
Undo transactionnel: Fenêtre temporelle permettant l’annulation d’une action persistée.
Référentiels
WCAG 2.2 (1.3.1, 2.4.x, 3.2.x, 4.1.3, 2.2.x, 3.3.x)
Inclusive Design Toolkit (Microsoft)
Cognitive Load Theory (Sweller)
ARIA Authoring Practices (Dialog, Navigation, Status)
Script d’automatisation (esquisse Playwright)
Objectif: Vérifier focus, skip link, H1 unique, aria-live notifications.

Pseudo-code:

Navigate home -> Press Tab -> Expect '.skip-link' visible & focused.
Trigger route change -> Expect document.activeElement is H1.
Count headings -> Expect exactly one H1.
Fire store notification -> Query accessibility tree -> Role 'status' present.
Linting custom (idéation)
ESLint plugin règles:

Enforcer 1 H1 / view
Interdire button sans aria-label si icon-only
Exiger role=dialog + aria-modal sur modals
Stylelint:

Rejeter suppression outline sans remplacement visible.
CI Gate:

Axe-core scan sur build storybook / pages clés.
Failing pipeline si >0 violations critiques.
Recommandations de Mise en Œuvre (Synthèse Quick Wins)
Ajouter skip link + balises <main>, <nav> (Jour 1).
Styles focus tokens + audit axe (Jour 2).
aria-live sur notifications + option persist (Jour 2).
H1 normalisé par vue + focus router (Jour 3).
Dialog accessible wrapper (Jour 5).
Notes de Priorisation
Formule interne (pondération indicative): Priorité = Gravité (3/2/1) \* Fréquence d’exposition (3 haute, 2 moyenne, 1 faible) / Effort (S=1, M=2, L=3) Les P1 identifiées >4 score.

Plan d’Implémentation par Commits (Granularité Recommandée)
Commit Objet Fichiers Effet neurocognitif
1 Ajouter skip link + CSS index.html, styles/app.sass ou global Réduction charge extrinsèque initiale
2 Introduire <main> + aside + aria-labels AppLayout.vue Stabilise repères sériels
3 Focus management post-route index.js Réduction fragmentation attentionnelle
4 aria-current="page" + correction sémantique liste SidebarNav.vue Renforcement but & orientation
5 Composant PageTitle.vue + intégration H1 views/\* + nouveau composant Ancrage conceptuel page
6 Styles focus tokens + fallback Global styles Visibilité navigation séquentielle
7 Ajout test Playwright + axe scan e2e/ scripts Validation objective continue
8 Lint règles personnalisées .eslintrc.js, script plugin Prévention régresseurs
