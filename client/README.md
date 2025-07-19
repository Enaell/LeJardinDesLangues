# Le Jardin des Langues - Client Frontend

Application web frontend pour l'apprentissage des langues, développée avec React, TypeScript, Material-UI et Tailwind CSS.

## Comment utiliser

Clonez le repository :

```bash
git clone https://github.com/Enaell/LeJardinDesLangues.git
cd LeJardinDesLangues/client
```

Installez les dépendances et lancez l'application :

```bash
npm install
npm run dev
```

## Architecture technique

Cette application utilise :
- **React** avec **TypeScript** pour le framework frontend
- **Material-UI** pour les composants d'interface utilisateur
- **Tailwind CSS** pour le styling personnalisé
- **Vite** comme outil de build et serveur de développement

## Structure du projet

```
src/
├── assets/          # Images, icônes et autres ressources
├── components/      # Composants React réutilisables
├── pages/          # Pages principales de l'application
├── hooks/          # Hooks React personnalisés
├── services/       # Services API et logique métier
├── types/          # Définitions TypeScript
└── utils/          # Fonctions utilitaires
```

## Fonctionnalités

- Dictionnaire français-chinois avec recherche dynamique
- Flashcards personnalisables
- Exercices et jeux interactifs
- Interface communautaire
- Support multilingue (français, chinois, anglais)

## Développement

Pour démarrer en mode développement :
```bash
npm run dev
```

Pour construire la version de production :
```bash
npm run build
```

## Docker

L'application peut être exécutée avec Docker :

```bash
# Depuis la racine du projet
docker-compose up client
```

## Tests

Lancement des tests :
```bash
npm run test
```

## Contribution

Consultez le fichier [CONTRIBUTING.md](../CONTRIBUTING.md) pour les directives de contribution.
