# Architecture API Modulaire

## 🏗️ Vue d'ensemble

Cette architecture propose une approche modulaire et scalable pour la gestion des API dans l'application. Chaque feature dispose de son propre hook API spécialisé qui utilise un hook de base commun.

## 📁 Structure

```
src/
├── core/
│   └── services/
│       ├── api.ts              # Hook de base useApi + helpers
│       └── index.ts            # Exports des services core
└── features/
    ├── auth/
    │   ├── services/
    │   │   ├── useAuthApi.ts   # Hook spécialisé pour l'auth
    │   │   ├── authApi.ts      # Service legacy (à migrer)
    │   │   └── index.ts
    │   └── hooks/
    │       └── useAuth.ts      # Utilise useAuthApi
    ├── dictionary/
    │   └── services/
    │       ├── useDictionaryApi.ts  # Hook avec placeholders
    │       └── index.ts
    ├── flashcards/
    │   └── services/
    │       ├── useFlashcardsApi.ts  # Hook avec placeholders
    │       └── index.ts
    ├── exercises/
    │   └── services/
    │       ├── useExercisesApi.ts   # Hook avec placeholders
    │       └── index.ts
    ├── community/
    │   └── services/
    │       ├── useCommunityApi.ts   # Hook avec placeholders
    │       └── index.ts
    └── profile/
        └── services/
            ├── useProfileApi.ts     # Hook avec placeholders
            └── index.ts
```

## 🔧 Composants

### 1. Hook de base `useApi`

**Fichier**: `src/core/services/api.ts`

Fournit les fonctionnalités communes à tous les hooks API :
- Gestion des erreurs centralisée
- Configuration des headers
- Helpers pour l'authentification
- Méthodes de base pour les requêtes HTTP

```typescript
const { request, requestWithErrorHandling } = useApi();
```

### 2. Helpers exportés

- `createApiUrl(endpoint)` - Création d'URLs complètes
- `createAuthenticatedRequest(token)` - Configuration pour requêtes authentifiées
- `handleApiError(response)` - Gestion standardisée des erreurs

### 3. Hooks spécialisés

Chaque feature dispose de son propre hook API :

```typescript
// Auth
const { register, login, getProfile, googleAuth } = useAuthApi();

// Dictionary (placeholder)
const { searchWords, getEntry, getSuggestions } = useDictionaryApi();

// Flashcards (placeholder)
const { getUserFlashcards, createFlashcard, updateFlashcard } = useFlashcardsApi();

// Exercises (placeholder)
const { getExercises, getExercise, submitExercise } = useExercisesApi();

// Community (placeholder)
const { getPosts, createPost, addComment } = useCommunityApi();

// Profile (placeholder)
const { getUserProfile, updateProfile, getUserStats } = useProfileApi();
```

## 🎯 Avantages

### ✅ Séparation des responsabilités
- Chaque feature gère ses propres API
- Code plus maintenable et organisé
- Réduction des conflits entre développeurs

### ✅ Réutilisabilité
- Hook de base partagé évite la duplication
- Helpers communs pour les patterns récurrents
- Configuration centralisée

### ✅ Scalabilité
- Ajout facile de nouvelles features
- Architecture modulaire
- Tests isolés par feature

### ✅ Type Safety
- Types TypeScript pour chaque API
- IntelliSense complet
- Détection d'erreurs à la compilation

## 🚀 Utilisation

### Dans les hooks métier (comme useAuth)

```typescript
// features/auth/hooks/useAuth.ts
import { useAuthApi } from '../services/useAuthApi';

export const useLogin = () => {
  const authApi = useAuthApi(); // 🎯 Hook spécialisé
  
  return useMutation({
    mutationFn: authApi.login, // ✨ Méthode directe
    onSuccess: (data) => {
      // Logique spécifique à useAuth
    }
  });
};
```

### Dans les composants

```typescript
// Utilisation via les hooks métier (recommandé)
import { useLogin } from '@features/auth/hooks';

const LoginForm = () => {
  const loginMutation = useLogin();
  // ...
};

// Ou utilisation directe (pour des cas simples)
import { useDictionaryApi } from '@features/dictionary/services';

const DictionarySearch = () => {
  const { searchWords } = useDictionaryApi();
  // ...
};
```

## 🔄 État actuel

### ✅ Implémenté
- **Auth**: Hook `useAuthApi` fonctionnel, migration de `useAuth` effectuée
- **Core**: Hook de base `useApi` et helpers

### 🚧 Placeholders créés
- **Dictionary**: `useDictionaryApi` avec simulations
- **Flashcards**: `useFlashcardsApi` avec simulations  
- **Exercises**: `useExercisesApi` avec simulations
- **Community**: `useCommunityApi` avec simulations
- **Profile**: `useProfileApi` avec simulations

### 📋 Prochaines étapes

1. **Remplacer les placeholders** par les vraies implémentations API
2. **Migrer les composants** pour utiliser les nouveaux hooks
3. **Ajouter les tests unitaires** pour chaque hook API
4. **Supprimer l'ancien `authApi`** une fois la migration complète

## 🧪 Tests

Un utilitaire de test est disponible dans `src/core/utils/apiTest.ts` :

```typescript
import { testAllApis, testPlaceholders } from '@core/utils/apiTest';

// Tester que tous les hooks sont accessibles
const apis = testAllApis();

// Tester les placeholders avec simulations
await testPlaceholders();
```

## 🔧 Configuration

Les hooks utilisent les variables d'environnement suivantes :
- `VITE_API_BASE_URL` - URL de base pour les API génériques
- `VITE_API_URL` - URL de base pour l'API d'auth (legacy, à harmoniser)

## 💡 Bonnes pratiques

1. **Hooks spécialisés**: Toujours passer par les hooks spécialisés (`useAuthApi`, etc.)
2. **Gestion d'erreurs**: Utiliser `requestWithErrorHandling` pour les notifications automatiques
3. **Types**: Définir les types dans chaque hook spécialisé
4. **Placeholders**: Garder le code réel commenté pour faciliter l'implémentation
5. **Logs**: Ajouter des logs console pour les placeholders (dev uniquement)
