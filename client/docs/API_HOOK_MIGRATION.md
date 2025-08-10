# Migration de ApiService vers useApi Hook

## ✅ Changements effectués

### 1. Transformation classe → hook
- **Supprimé** : `class ApiService` et `export const apiService`
- **Ajouté** : `export const useApi = () => { ... }`

### 2. Intégration avec le système de notifications
- **Ajouté** : `const { notifyApiError } = useNotify()` dans le hook
- **Amélioré** : Chaque méthode API capture et affiche automatiquement les erreurs

### 3. Optimisation avec useCallback
- **Performance** : Tous les appels API sont memoizés avec `useCallback`
- **Dépendances** : Gestion correcte des dépendances pour éviter les re-renders

## 🔄 Comment migrer votre code existant

### Avant (avec la classe)
```typescript
import { apiService } from '@core/services';

const MyComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await apiService.searchDictionary('hello');
        setData(result);
      } catch (error) {
        console.error('Erreur:', error);
        // Gestion manuelle des erreurs
      }
    };
    fetchData();
  }, []);

  return <div>{/* Affichage des données */}</div>;
};
```

### Après (avec le hook)
```typescript
import { useApi } from '@core/hooks';

const MyComponent = () => {
  const api = useApi();
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await api.searchDictionary('hello');
        setData(result);
      } catch (error) {
        // Les erreurs sont automatiquement affichées en snackbar !
        // Plus besoin de gestion manuelle
      }
    };
    fetchData();
  }, [api]);

  return <div>{/* Affichage des données */}</div>;
};
```

### Encore mieux (avec TanStack Query)
```typescript
import { useApi } from '@core/hooks';
import { useQuery } from '@tanstack/react-query';

const MyComponent = () => {
  const api = useApi();
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['dictionary', 'search', 'hello'],
    queryFn: () => api.searchDictionary('hello'),
  });

  if (isLoading) return <div>Chargement...</div>;
  // Les erreurs sont automatiquement gérées !

  return <div>{/* Affichage des données */}</div>;
};
```

## 🎯 Avantages du hook useApi

### ✅ **Gestion automatique des erreurs**
- Toutes les erreurs API sont automatiquement affichées en snackbar
- Plus besoin de try/catch répétitifs

### ✅ **Intégration React native**
- Utilise `useCallback` pour les performances
- Compatible avec tous les hooks React

### ✅ **Type safety complète**
- Toutes les méthodes sont correctement typées
- Intellisense et autocomplétion

### ✅ **Flexibilité**
- Peut être utilisé avec useState, useEffect, TanStack Query, etc.
- S'adapte à tous les patterns React

## 🚀 API disponible

Le hook `useApi()` retourne un objet avec toutes les méthodes :

```typescript
const api = useApi();

// Méthode de base
api.request(endpoint, options)

// Dictionary API
api.searchDictionary(query, language)
api.getDictionaryEntry(id)

// Flashcards API
api.getFlashcards(userId)
api.createFlashcard(userId, flashcard)
api.updateFlashcard(userId, flashcardId, updates)
api.deleteFlashcard(userId, flashcardId)

// Exercises API
api.getExercises(filters)
api.getExercise(id)
api.submitExerciseResult(exerciseId, userId, answers)
```

## 📝 Notes importantes

1. **Hook rules** : `useApi()` doit être appelé au niveau du composant (pas dans des callbacks)
2. **Notifications automatiques** : Les erreurs sont affichées automatiquement
3. **Performance** : Utilisez la destructuration pour extraire seulement les méthodes nécessaires

## 🔍 Exemple complet

```typescript
import { useApi } from '@core/hooks';
import { useState } from 'react';

const FlashcardManager = ({ userId }: { userId: string }) => {
  const api = useApi();
  const [flashcards, setFlashcards] = useState([]);

  // Charger les cartes
  const loadFlashcards = async () => {
    const result = await api.getFlashcards(userId);
    setFlashcards(result.data);
  };

  // Créer une carte
  const createCard = async (cardData) => {
    await api.createFlashcard(userId, cardData);
    await loadFlashcards(); // Recharger la liste
  };

  return (
    <div>
      {/* Interface utilisateur */}
    </div>
  );
};
```
