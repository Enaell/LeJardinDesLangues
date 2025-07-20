# Configuration du routage avec TanStack Router

Ce projet utilise **TanStack Router** pour la gestion du routage côté client.

## 🚀 Avantages de TanStack Router

- **Type Safety** : Routes typées avec TypeScript
- **Performance** : Préchargement des données et optimisations automatiques
- **Developer Experience** : Outils de développement intégrés
- **Intégration** : Compatible avec TanStack Query pour la gestion des données
- **Flexibilité** : Gestion avancée des paramètres et de l'état

## 📁 Structure des routes

```
src/routes/
├── AppRouter.tsx        # Configuration principale du routeur
└── routes.config.ts     # Constantes et configuration des routes
```

## 🛣️ Routes disponibles

| Route | Path | Description |
|-------|------|-------------|
| Accueil | `/` | Page d'accueil avec présentation des fonctionnalités |
| Dictionnaire | `/dictionary` | Recherche et consultation de mots |
| Cartes Mémoire | `/flashcards` | Gestion et étude des flashcards |
| Exercices | `/exercises` | Exercices interactifs d'apprentissage |
| Communauté | `/community` | Fonctionnalités sociales et partage |
| Profil | `/profile` | Gestion du profil utilisateur |

## 🔧 Configuration

### Router principal (`AppRouter.tsx`)

Le fichier contient :
- **Root Route** : Route racine avec layout commun
- **Routes spécifiques** : Chaque page de l'application
- **Composants placeholder** : Pages temporaires en attendant les vrais composants

### Configuration des routes (`routes.config.ts`)

Contient :
- **ROUTES** : Constantes pour les chemins des routes
- **NAVIGATION_ITEMS** : Configuration de la navigation avec icônes

## 🎯 Utilisation

### Navigation programmatique

```typescript
import { useNavigate } from '@tanstack/react-router';

const navigate = useNavigate();

// Navigation simple
navigate({ to: '/dictionary' });

// Navigation avec paramètres
navigate({ 
  to: '/dictionary', 
  search: { query: 'hello' } 
});
```

### Liens

```typescript
import { Link } from '@tanstack/react-router';

<Link to="/dictionary">
  Aller au dictionnaire
</Link>

// Avec propriétés
<Link 
  to="/dictionary" 
  search={{ query: 'hello' }}
  className="nav-link"
>
  Rechercher "hello"
</Link>
```

### Accès aux paramètres

```typescript
import { useSearch, useParams } from '@tanstack/react-router';

// Paramètres de recherche (?query=hello)
const search = useSearch({ from: '/dictionary' });

// Paramètres d'URL (/user/:id)
const params = useParams({ from: '/user/$id' });
```

## 🔄 Évolution future

### Ajout d'une nouvelle route

1. **Ajouter la constante** dans `routes.config.ts` :
```typescript
export const ROUTES = {
  // ... routes existantes
  NEW_FEATURE: '/new-feature',
} as const;
```

2. **Créer la route** dans `AppRouter.tsx` :
```typescript
const newFeatureRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/new-feature',
  component: NewFeaturePage,
});
```

3. **Ajouter à l'arbre des routes** :
```typescript
const routeTree = rootRoute.addChildren([
  // ... routes existantes
  newFeatureRoute,
]);
```

### Fonctionnalités avancées

- **Préchargement de données** avec `loader`
- **Guards de route** pour l'authentification
- **Routes imbriquées** pour les sous-sections
- **Gestion d'erreurs** avec `errorComponent`
- **Lazy routes** avec `lazy` loading

## 📚 Ressources

- [TanStack Router Documentation](https://tanstack.com/router/latest)
- [Guide de migration depuis React Router](https://tanstack.com/router/latest/docs/framework/react/guide/migrating-from-react-router)
- [Exemples et patterns](https://tanstack.com/router/latest/docs/framework/react/examples/basic)
