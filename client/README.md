# Le Jardin des Langues - Client Frontend

Application web frontend pour l'apprentissage des langues, développée avec React, TypeScript, shadcn/ui et Tailwind CSS.

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
- **React 19** avec **TypeScript 6** pour le framework frontend
- **shadcn/ui** (style `base-nova`) pour les composants d'interface utilisateur
- **Tailwind CSS v4** pour le styling
- **Vite 8** comme outil de build et serveur de développement
- **TanStack Router** pour le routage
- **TanStack Query** pour la gestion des données asynchrones
- **TanStack Form** (vanilla) pour les formulaires
- **react-i18next** pour l'internationalisation

### Architecture Feature-Oriented

L'application suit une architecture orientée fonctionnalités. Consultez [docs/README-ARCHITECTURE.md](../docs/README-ARCHITECTURE.md) pour plus de détails.

```
src/
├── features/       # Fonctionnalités métier (auth, dictionary, flashcards, etc.)
├── core/           # Code partagé et composants réutilisables
├── components/ui/  # Composants shadcn/ui
├── lib/            # Utilitaires (cn())
├── routes/         # Configuration du routage TanStack Router
└── store/          # Gestion d'état globale
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
