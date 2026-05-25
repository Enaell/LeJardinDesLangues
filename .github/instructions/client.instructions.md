---
applyTo: "client/src/**"
---

# Conventions Frontend — Le Jardin des Langues

## Stack
- React 19 + TypeScript, Vite, Node.js 22
- **UI** : shadcn/ui (`@base-ui/react`, style `base-nova`) + Tailwind CSS v4 — **pas de Material-UI**
- **Routing** : TanStack Router (fichiers dans `src/routes/`, tree généré dans `routeTree.gen.ts`)
- **Data fetching** : TanStack Query (`useQuery`, `useMutation`)
- **Formulaires** : TanStack Form — approche vanilla, voir `.github/prompts/tanstack-form-guidelines.prompt.md`
- **i18n** : react-i18next via le hook `useTranslation` de `@core/hooks`

## Alias de chemins (`vite.config.ts`)
| Alias | Résout vers |
|-------|-------------|
| `@` | `src/` |
| `@core` | `src/core/` |
| `@features` | `src/features/` |
| `@routes` | `src/routes/` |

## Conventions de code

### Composants
```typescript
// ✅ Toujours
export const MyComponent = (props: MyComponentProps) => { ... };
type MyComponentProps = { title: string };

// ❌ Jamais
export default function MyComponent() { ... }
interface MyComponentProps { ... }
```

### Imports UI
```typescript
// Composants UI (tous dans @core/components/ui/)
import { Button } from '@core/components/ui/button';
import { Input } from '@core/components/ui/input';
import { Card, CardContent } from '@core/components/ui/card';
import { Badge } from '@core/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@core/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@core/components/ui/avatar';
import { Progress } from '@core/components/ui/progress';
import { Switch } from '@core/components/ui/switch';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@core/components/ui/pagination';
// Composants custom LinguaGarden
import { LevelBadge } from '@core/components/ui/level-badge';
import { StarRating } from '@core/components/ui/star-rating';
import { Stepper } from '@core/components/ui/stepper';
import { SearchInput } from '@core/components/ui/search-input';
import { FeatureCard } from '@core/components/ui/feature-card';
import { PersonCard } from '@core/components/ui/person-card';
import { TestimonialCard } from '@core/components/ui/testimonial-card';
import { CtaBanner } from '@core/components/ui/cta-banner';
import { Fab } from '@core/components/ui/fab';
import { cn } from '@/lib/utils'; // utilitaire clsx
```

### Typographie
- `font-heading` (Playfair Display Variable) pour les titres : `<h1 className="font-heading">...</h1>`
- `font-sans` (Geist Variable) pour le texte UI/boutons (par défaut)
- Ne pas importer les fonts manuellement — déjà configurées dans `index.css`

### Storybook
- Stories dans `client/.storybook/stories/<nom>.stories.tsx`
- Import via alias absolu : `import { X } from '@core/components/ui/x'`
- Tout nouveau composant `core/components/ui/` doit avoir sa story correspondante

### Formulaires (TanStack Form)
```typescript
// ✅ Vanilla — pas de wrappers FormProvider
const form = useForm({ defaultValues: { email: '' }, onSubmit: ... });
<form.Field name="email">{(field) => <Input value={field.state.value} onChange={...} />}</form.Field>
```

### Styles
- Tailwind pour layouts/spacing : `flex flex-col gap-4 min-h-screen`
- shadcn/ui pour les composants interactifs
- **Pas de prop `sx`**, pas de `style={}` inline sauf cas exceptionnel
- Balises sémantiques : `<header>`, `<main>`, `<nav>`, `<section>` plutôt que `<div>`

## Architecture
```
src/
├── features/<feature>/{components,hooks,services,types,index.ts}
├── core/
│   ├── api/          ← hooks + types générés (orval — ne pas modifier manuellement)
│   │   ├── authentification/
│   │   ├── dictionnaire/
│   │   ├── flashcards/
│   │   ├── utilisateurs/
│   │   └── model/        ← types TypeScript (AuthResponseDto, LoginDto, etc.)
│   ├── components/
│   │   ├── layout/       ← Layout, AppBar, Footer
│   │   ├── notifications/ ← GlobalNotifications, useNotify
│   │   └── ui/           ← TOUS les composants UI (shadcn + custom LinguaGarden)
│   ├── hooks, services, utils, types, i18n
│   └── services/apiClient.ts  ← fetch custom (credentials, erreurs typées, intercepteur 401 → refresh)
├── lib/utils.ts        ← cn() de shadcn
└── routes/             ← TanStack Router (un fichier par route)
```

## Client API généré (orval)

Préférer les hooks de `features/<feature>/hooks/` pour la logique métier. Les hooks générés de `@core/api/` servent de couche bas niveau :

```typescript
// ✅ Utiliser les hooks métier de la feature (recommandé)
import { useLogin } from '@features/auth/hooks';

// ✅ Utiliser les hooks générés directement si pas de logique supplémentaire nécessaire
import { useAuthControllerLogin } from '@core/api/authentification/authentification';
import type { LoginDto } from '@core/api/model';

const mutation = useAuthControllerLogin();
mutation.mutate({ emailOrUsername, password } satisfies LoginDto);

// ❌ Éviter les appels fetch manuels dans les nouvelles features
```

Pour régénérer après un changement d'API serveur :
```bash
make generate-api   # depuis la racine du projet
```

## Exports
- Exports **nommés** uniquement — `export default` réservé aux fichiers de route TanStack
- Chaque feature expose ses publics via `index.ts`
