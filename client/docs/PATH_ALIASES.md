# Alias de Chemin (Path Aliases)

Ce document explique l'utilisation des alias de chemin dans le projet Le Jardin des Langues.

## Alias Configurés

| Alias | Chemin Réel | Description |
|-------|-------------|-------------|
| `@/*` | `src/*` | Racine du projet source |
| `@core` | `src/core` | Point d'entrée des composants, hooks et utilitaires partagés |
| `@core/*` | `src/core/*` | Sous-modules de core (components, hooks, services, etc.) |
| `@features/*` | `src/features/*` | Fonctionnalités métier (auth, dictionary, etc.) |
| `@routes/*` | `src/routes/*` | Pages et routes de l'application |
| `@store/*` | `src/store/*` | Gestion d'état globale |

## Exemples d'Utilisation

### Avant (avec des chemins relatifs)
```typescript
// ❌ Difficile à lire et maintenir
import { Button } from '../../../core/components/ui';
import { useAuth } from '../../auth/hooks/useAuth';
import { Profile } from '../components/Profile';
```

### Après (avec des alias)
```typescript
// ✅ Plus lisible et maintenable
import { Button } from '@core/components/ui';
import { useAuth } from '@features/auth/hooks/useAuth';
import { Profile } from '@features/profile/components/Profile';
```

## Migration Automatique

Un script de migration automatique est disponible pour convertir les imports existants :

```bash
# Exécuter la migration
node scripts/migrate-imports.js
```

## Configuration

### Vite (vite.config.ts)
```typescript
resolve: {
  alias: {
    '@': resolve(__dirname, './src'),
    '@core': resolve(__dirname, './src/core'),
    '@features': resolve(__dirname, './src/features'),
    '@routes': resolve(__dirname, './src/routes'),
    '@store': resolve(__dirname, './src/store'),
  },
}
```

### TypeScript (tsconfig.app.json)
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@core": ["src/core"],
      "@core/*": ["src/core/*"],
      "@features/*": ["src/features/*"],
      "@routes/*": ["src/routes/*"],
      "@store/*": ["src/store/*"]
    }
  }
}
```

## Bonnes Pratiques

1. **Utiliser les alias pour les imports inter-modules** : Préférer `@features/auth/...` plutôt que `../../auth/...`

2. **Garder les imports relatifs dans le même module** : Pour les imports dans le même dossier, utiliser `./` est acceptable

3. **Consistance** : Toujours utiliser le même alias pour un même chemin

4. **Auto-import** : VS Code devrait automatiquement suggérer les alias grâce à la configuration TypeScript

## Dépannage

### Les alias ne sont pas reconnus par TypeScript

1. Redémarrer le serveur TypeScript dans VS Code :
   - `Ctrl+Shift+P` → "TypeScript: Restart TS Server"

2. Vérifier que `tsconfig.app.json` contient bien la configuration des `paths`

3. Redémarrer le serveur de développement Vite

### Les imports auto-générés n'utilisent pas les alias

1. Vérifier que VS Code utilise la bonne version de TypeScript
2. S'assurer que le projet est ouvert au bon niveau (dossier `client/`)
3. Redémarrer VS Code si nécessaire

## Exemples par Fonctionnalité

### Imports Core
```typescript
// Point d'entrée core (recommandé pour les exports principaux)
import { Layout, Button, Form } from '@core';

// Composants UI spécifiques
import { Button, Card, Modal } from '@core/components/ui';

// Layout
import { Layout, Header, Sidebar } from '@core/components/layout';

// Formulaires
import { Form, FormTextField } from '@core/components/forms';

// Hooks
import { useTheme, useLocalStorage } from '@core/hooks';

// Services
import { apiClient } from '@core/services';
```

### Imports Features
```typescript
// Auth
import { useAuth, useLogin } from '@features/auth/hooks';
import { LoginForm, ProtectedRoute } from '@features/auth/components';
import type { User, AuthResponse } from '@features/auth/types';

// Dictionary
import { useDictionary } from '@features/dictionary/hooks';
import { SearchBar, WordCard } from '@features/dictionary/components';

// Flashcards
import { useFlashcards } from '@features/flashcards/hooks';
import { FlashcardDeck } from '@features/flashcards/components';
```

### Imports Routes
```typescript
import { HomeRoute } from '@routes/index';
import { ProfileRoute } from '@routes/profile';
```

### Imports Store
```typescript
import { useAppStore } from '@store/app';
import { useUserStore } from '@store/user';
```
