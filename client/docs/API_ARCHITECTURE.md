# Architecture API Client

## 🏗️ Vue d'ensemble

L'accès à l'API repose sur **3 couches** :

1. **`core/api/`** — hooks et types générés automatiquement par orval depuis le spec OpenAPI
2. **`core/services/apiClient.ts`** — transport fetch partagé (credentials, erreurs typées, intercepteur 401)
3. **`features/<feature>/hooks/`** — hooks métier TanStack Query (cache, notifications, navigation)

## 📁 Structure

```
src/
├── core/
│   ├── api/                        # ⚠️ Généré par orval — ne pas modifier manuellement
│   │   ├── authentification/authentification.ts
│   │   ├── dictionnaire/dictionnaire.ts
│   │   ├── flashcards/flashcards.ts
│   │   ├── utilisateurs/utilisateurs.ts
│   │   └── model/                  # AuthResponseDto, LoginDto, RegisterDto…
│   └── services/
│       ├── apiClient.ts            # Transport fetch (credentials, erreurs, intercepteur 401)
│       └── queryClient.ts          # QueryClient global TanStack Query
└── features/
    └── auth/
        ├── services/
        │   ├── useAuthApi.ts       # Adaptateur : wrapp les fonctions orval + popup Google
        │   └── utils.ts            # isAuthenticatedCookie()
        └── hooks/
            └── useAuth.ts          # Hooks métier TanStack Query
```

## 🔧 Couche 1 — Transport : `apiClient.ts`

Utilisé par orval comme `SecondParameter<typeof apiClient>`. Gère :
- `credentials: 'include'` sur toutes les requêtes (cookies httpOnly)
- Erreurs typées `ErrorType<T>` avec `statusCode`
- Réponses 204 (body vide)
- **Intercepteur 401** : si une requête reçoit un 401, tente automatiquement `POST /auth/refresh` avant de rejouer la requête initiale. Si le refresh échoue, efface le cookie `is_authenticated` et propage l'erreur.

Race condition évitée via un singleton `refreshPromise` — un seul appel refresh en vol simultané.

**Variable d'environnement** : `VITE_API_URL` (défaut : `http://localhost:3000`)

## 🤖 Couche 2 — Hooks générés : `core/api/`

Générés depuis `openapi.json` via **orval**. Convention de nommage :

| Pattern | Exemple |
|---------|---------|
| Fonction brute | `authControllerLogin(loginDto)` |
| Hook query | `useAuthControllerGetProfile()` |
| Hook mutation | `useAuthControllerGoogleAuth()` |

Régénérer après un changement d'API serveur :
```bash
make generate-api   # depuis la racine du projet
```

## 🎯 Couche 3 — Hooks métier : `features/<feature>/hooks/`

Les hooks de la couche 3 wrappent la couche 2 (ou l'adaptateur de la couche 2.5) pour ajouter :
- Gestion du cache TanStack Query (`setQueryData`, `invalidateQueries`)
- Notifications (`useNotify`)
- Navigation post-action (`useRouter`)

### Pattern auth (exemple de référence)

```
authControllerLogin()          ← orval (couche 2)
       ↓
useAuthApi().login             ← adaptateur (couche 2.5, optionnelle)
       ↓
useLogin() / useAuth()         ← hook métier (couche 3)
       ↓
<LoginForm />                  ← composant
```

La couche 2.5 (`useAuthApi.ts`) n'est nécessaire que quand la logique d'adaptation est non-triviale (normalisation des réponses, logique popup OAuth).

### Utilisation dans un composant

```typescript
// ✅ Recommandé — hook métier de la feature
import { useLogin } from '@features/auth/hooks';

const loginMutation = useLogin();
loginMutation.mutate({ emailOrUsername, password });

// ✅ Acceptable — hook généré directement (si pas de logique métier supplémentaire)
import { useAuthControllerLogin } from '@core/api/authentification/authentification';
import type { LoginDto } from '@core/api/model';

const mutation = useAuthControllerLogin();
mutation.mutate({ emailOrUsername, password } satisfies LoginDto);
```

## 🔒 Authentification — persistance de session

Basé sur 3 cookies posés par le serveur à chaque login/register :

| Cookie | httpOnly | Durée | Rôle |
|--------|----------|-------|------|
| `access_token` | ✅ | 15 min | Token JWT envoyé automatiquement |
| `refresh_token` | ✅ | 7 jours | Renouvellement silencieux via intercepteur |
| `is_authenticated` | ❌ | 7 jours | Sentinelle lisible par JS (sans exposer le token) |

`isAuthenticatedCookie()` lit `is_authenticated` pour décider si `useProfile()` doit s'activer (évite un appel API inutile quand l'utilisateur n'est clairement pas connecté).

## 💡 Bonnes pratiques

1. **Ne jamais modifier `core/api/`** — regénérer avec `make generate-api`
2. **Couche métier dans `features/`** — ne pas mettre de logique React Query dans `core/api/`
3. **Types depuis `@core/api/model`** — utiliser les DTOs générés plutôt que des types manuels
4. **Pas de `fetch` direct** dans les composants — toujours passer par la chaîne de hooks
