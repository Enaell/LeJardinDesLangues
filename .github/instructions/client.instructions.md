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
| `@store` | `src/store/` |

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
import { Button } from '@/components/ui/button';      // shadcn/ui
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';                     // utilitaire clsx
```

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
├── core/{components/layout,components/notifications,hooks,services,utils,types,i18n}
├── components/ui/      ← shadcn/ui générés (ne pas modifier manuellement)
├── lib/utils.ts        ← cn() de shadcn
└── routes/             ← TanStack Router (un fichier par route)
```

## Exports
- Exports **nommés** uniquement — `export default` réservé aux fichiers de route TanStack
- Chaque feature expose ses publics via `index.ts`
