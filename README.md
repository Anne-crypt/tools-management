

🚀 Quick Start
Fork ou clone du repo

🚀lancement du serveur
npm run dev
http://localhost:5173

🚀lancement des tests
npx vitest run

🏗️ Architecture
Structure projet et organisation du code sur 3 pages
```text
src/
├── api/
├── components/
├── hooks/
├── interfaces/
├── pages/
│   ├── Dashboard
│   ├── Tools
│   └── Analytics
├── router/
├── stores/
└── styles/
```

Pages
Dashboard :

KPIs principaux
dépenses
outils récents
recherche globale
Tools

Gestion et consultation des outils :

liste des outils
recherche
filtres front-end
détails principaux
Analytics

Analytics :

évolution des dépenses
répartition des coûts
outils les plus coûteux
budget progress
Routing

Les routes suivent directement la structure demandée dans les consignes.


🎨 Design System Evolution
Le design system s’est construit progressivement durant le développement afin de maintenir une cohérence visuelle entre les pages.

Principes retenus
- gradients réutilisables
- palette de couleurs unique
- composants récurrents
- cartes homogènes
- hiérarchie typographique stable

Évolution

Le design n’a pas été réalisé à partir de mockups complets.
La cohérence a donc été maintenue directement pendant le développement via :

- des composants réutilisables
- des variables de styles communes
- des patterns de layout répétés

L’objectif était d’obtenir une interface SaaS moderne et cohérente malgré un temps limité.

🔗 Navigation & User Journey

Dashboard

- consultation rapide des KPIs
- accès aux outils récents
- accès à la recherche

Tools

- recherche d’outils
- consultation des coûts
- filtrage

Analyse globale :

- compréhension des dépenses
- visualisation des répartitions
- suivi budgétaire

📊 Data Integration Strategy
Gestion des données du JSON server à travers les pages

Hooks personnalisés

Les appels API ont été encapsulés dans des hooks afin de :

- isoler la logique de fetch
- simplifier les composants
- préparer une future évolution vers un state management plus global

Filtres :

Tous les endpoints disponibles n’ont pas été utilisés.
Certains filtres ont été réalisés directement côté front car cela restait suffisamment performant et plus rapide à implémenter dans le contexte du projet.

Limites identifiées :

Store global

ERATUM : store global pour user aurait dû être mis en place

L’implémentation d’un store global pour les tools a été envisagée tardivement (avec pinia).
Cela explique certaines parties du code plus locales qu’idéales.

Données Dashboard

Certaines données reçues depuis le back n’étaient pas suffisamment adaptées visuellement pour les cards du dashboard.

Une approche plus propre aurait été :

ajout d’un feature flag isDemo
séparation données réelles / données de démonstration

Par manque de temps, certaines données ont été hardcodées afin de préserver la qualité visuelle du rendu.

📱 Progressive Responsive Design
Approche mobile-first et adaptation par page
- mobile-first simplifié
- adaptation desktop progressive
- layouts flexibles
- composants réutilisables

🧪 Testing Strategy
Tests unitaires et stratégie QA sur l'ensemble
Les tests restent limités faute de temps.
Améliorations possibles
- couverture unitaire plus complète
- tests d’intégration
- tests end-to-end
- validation automatique des flows utilisateurs

⚡ Performance Optimizations
Techniques utilisées pour une app 3-pages optimale
Implémenté
- hooks de données réutilisables
- filtrage front rapide
- composants réutilisables
- rendering limité
- skeleton loaders
- recherche fonctionnelle

🎯 Design Consistency Approach
Comment vous avez maintenu la cohérence sans mockups J7-J8
Méthode
- réutilisation des mêmes composants
- mêmes patterns de spacing
- gradients cohérents
- palette centralisée
- styles similaires

Compromis :

Certaines fonctionnalités UI n’ont pas été finalisées (je n'ai pas trop compris ces features) :

- notifications utilisateur
- avatar utilisateur
- dropdown menu utilisateur

Ces éléments auraient nécessité un système plus complet de gestion utilisateur et de notifications.

📈 Data Visualization Philosophy
Choix de charts library et intégration design system

Suivi des consignes avec ChartJS

Limites

Le dernier bloc prévu :
Insights Dashboard n’a pas pu être implémenté par manque de temps.

Certaines consignes restaient également ambiguës ou difficiles à interpréter sans système plus complet.

Exemple :

pagination à 10 peu pertinente avec une liste recentTools limitée à 8
certains calculs utilisateurs peu adaptés aux données fournies

🔮 Next Steps / Complete App Vision
Évolutions possibles pour une app SaaS Tools complète

Produit
- authentification utilisateur
- permissions et rôles
- notifications temps réel
- dashboard personnalisable

Technique
- store global centralisé --> je l'ai fait tardivement pour Tool, au lieu de user. je me suis trompée
- API réelle
- cache serveur
- tests + nombreux et robustes

Analytics
- insights automatiques
- prévisions budgétaires
- export CSV / PDF
- dashboards personnalisés