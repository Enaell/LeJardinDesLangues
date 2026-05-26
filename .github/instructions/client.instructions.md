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
import { Button, buttonVariants } from '@core/components/ui/button';
import { Input } from '@core/components/ui/input';
import { Card, CardContent } from '@core/components/ui/card';
import { Badge } from '@core/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@core/components/ui/tabs';
import { Dialog, DialogContent, DialogTitle, DialogClose } from '@core/components/ui/dialog';
import { Avatar, AvatarImage, AvatarFallback } from '@core/components/ui/avatar';
import { Progress } from '@core/components/ui/progress';
import { Switch } from '@core/components/ui/switch';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@core/components/ui/pagination';
// Composants custom Jardin des Langues
import { LevelBadge } from '@core/components/ui/level-badge';
import { StarRating } from '@core/components/ui/star-rating';
import { Stepper } from '@core/components/ui/stepper';
import { SearchInput } from '@core/components/ui/search-input';
import { FeatureCard } from '@core/components/ui/feature-card';
import { PersonCard } from '@core/components/ui/person-card';
import { TestimonialCard } from '@core/components/ui/testimonial-card';
import { CtaBanner } from '@core/components/ui/cta-banner';
import { Fab } from '@core/components/ui/fab';
import { Typography } from '@core/components/ui/typography';
import { LanguageSelector } from '@core/components/ui/language-selector';
import { cn } from '@/lib/utils'; // utilitaire clsx
// Icônes SVG custom (non disponibles dans lucide-react)
import { GoogleIcon, XIcon, LinkedinIcon, GithubIcon } from '@core/icons';
```

### Règle absolue : toujours `@core/components/ui/` en premier

> **Ne jamais créer un élément raw quand un composant `core/ui` existe.**

```typescript
// ✅ Bouton — toujours <Button> ou buttonVariants()
<Button variant="ghost-white" size="icon" onClick={fn}><Menu /></Button>
<Link className={cn(buttonVariants({ variant: 'inverted' }), 'rounded-full')}>CTA</Link>

// ❌ Jamais de <button> ou <a> raw pour des actions/navigation
<button className="bg-white text-primary px-8 ...">CTA</button>
<a href="/" className="hover:bg-muted ...">Lien</a>

// ✅ Texte — toujours <Typography>
<Typography variant="h1">Titre principal</Typography>
<Typography variant="lead" className="text-white/80">Sous-titre hero</Typography>
<Typography variant="small" as="span">texte inline</Typography>

// ❌ Jamais de balises texte raw
<h1 className="font-heading text-4xl ...">Titre</h1>
<p className="text-muted-foreground ...">Texte</p>
```

**Variants `Button` disponibles :**
| Variant | Usage |
|---------|-------|
| `default` | Bouton principal (bg-primary) |
| `outline` | Bouton secondaire avec bordure |
| `secondary` | Fond sauge clair |
| `ghost` | Transparent, hover muted — sur fonds clairs |
| `ghost-white` | Transparent, texte/hover blanc — sur fonds sombres/transparents |
| `inverted` | Fond blanc, texte primary — CTA sur hero/bandeaux sombres |
| `destructive` | Actions destructives |
| `link` | Lien souligné |

**Pattern `Link` + `buttonVariants` (quand la navigation doit avoir l'apparence d'un bouton) :**
```typescript
import { buttonVariants } from '@core/components/ui/button';
import { cn } from '@/lib/utils';

<Link to="/register" className={cn(buttonVariants({ variant: 'inverted', size: 'sm' }), 'rounded-full')}>
  Commencer
</Link>
```

### Typographie
- Utiliser `<Typography variant="...">` pour tous les titres et textes — **jamais de `<h1>`–`<h6>` ou `<p>` raw**
- Prop `as` pour séparer la sémantique HTML du style visuel : `<Typography variant="h2" as="h3">`
- `font-heading` (Playfair Display Variable) → variants `h1`–`h6`
- `font-sans` (Geist Variable) → variants `p`, `lead`, `large`, `small`, `muted`, `blockquote`, `code`
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
├── features/landing/   ← landing page publique (HeroSection, sections marketing)
├── core/
│   ├── api/          ← hooks + types générés (orval — ne pas modifier manuellement)
│   │   ├── authentification/
│   │   ├── dictionnaire/
│   │   ├── flashcards/
│   │   ├── utilisateurs/
│   │   └── model/        ← types TypeScript (AuthResponseDto, LoginDto, etc.)
│   ├── components/
│   │   ├── layout/       ← Layout, AppBar (dual-mode), Footer
│   │   ├── notifications/ ← GlobalNotifications, useNotify
│   │   └── ui/           ← TOUS les composants UI (shadcn + custom Jardin des Langues)
│   ├── icons/            ← Icônes SVG custom : GoogleIcon, XIcon, LinkedinIcon, GithubIcon
│   ├── hooks, services, utils, types, i18n
│   └── services/apiClient.ts  ← fetch custom (credentials, erreurs typées, intercepteur 401 → refresh)
├── lib/utils.ts        ← cn() de shadcn
└── routes/             ← TanStack Router (un fichier par route)
```

### AppBar dual-mode
L'`AppBar` adapte son rendu selon `location.pathname` (via `useRouterState`) :
- **`/` (landing)** : `absolute top-0`, transparent, `text-white`, nav vers les sections de la landing (`#features`, `#languages`, `#about`, `#team`) via `LANDING_NAV_ITEMS`
- **Autres routes** : `sticky top-0`, `bg-primary`, `text-primary-foreground`, nav vers les modules app via `APP_NAV_ITEMS`

Les deux configs sont dans `src/core/routes.config.ts`.

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
