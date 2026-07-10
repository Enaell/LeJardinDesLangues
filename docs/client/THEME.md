# Thème - Le Jardin des Langues

## Vue d'ensemble

Le design de "Le Jardin des Langues" s'inspire de la nature et de la croissance ("Jardin des Langues" UI Kit). Le thème est géré via les **CSS variables shadcn/ui** définies dans `src/index.css`, avec style `base-nova` et primitives `@base-ui/react`.

## Typographie

| Rôle | Police | Variable CSS | Package |
|------|--------|-------------|---------|
| Titres (`font-heading`) | **Playfair Display Variable** | `--font-heading` | `@fontsource-variable/playfair-display` |
| Corps de texte | **Lora** | — | `@fontsource/lora` |
| UI / Boutons (`font-sans`) | **Geist Variable** | `--font-sans` | `@fontsource-variable/geist` |

> **Règle** : utiliser le composant `<Typography>` plutôt que les balises `<h1>`–`<h6>` ou `<p>` raw — voir section [Composant Typography](#composant-typography) ci-dessous.

### Composant Typography

Le composant `Typography` (`@core/components/ui/typography`) centralise tous les styles textuels via CVA. Il expose 13 variants couvrant les titres et le corps de texte.

**Fonts :**
- `font-heading` (Playfair Display Variable) → variants `h1`–`h6`
- `font-sans` (Geist Variable) → variants `p`, `lead`, `large`, `small`, `muted`, `blockquote`, `code`

**Variants :**

| Variant | Classes Tailwind | Élément par défaut |
|---------|-----------------|-------------------|
| `h1` | `font-heading scroll-m-20 text-4xl font-bold tracking-tight leading-tight` | `<h1>` |
| `h2` | `font-heading scroll-m-20 text-3xl font-bold tracking-tight leading-tight` | `<h2>` |
| `h3` | `font-heading scroll-m-20 text-2xl font-semibold leading-snug` | `<h3>` |
| `h4` | `font-heading scroll-m-20 text-xl font-semibold leading-snug` | `<h4>` |
| `h5` | `font-heading scroll-m-20 text-lg font-semibold` | `<h5>` |
| `h6` | `font-heading scroll-m-20 text-base font-semibold` | `<h6>` |
| `p` | `leading-relaxed` | `<p>` |
| `lead` | `text-xl text-muted-foreground leading-relaxed` | `<p>` |
| `large` | `text-lg font-semibold` | `<p>` |
| `small` | `text-sm font-medium leading-none` | `<small>` |
| `muted` | `text-sm text-muted-foreground` | `<p>` |
| `blockquote` | `border-l-2 border-primary/30 pl-6 italic text-muted-foreground` | `<blockquote>` |
| `code` | `relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold` | `<code>` |

**Usage :**
```tsx
import { Typography } from '@core/components/ui/typography';

// Standard
<Typography variant="h1">Titre principal</Typography>
<Typography variant="muted">Texte secondaire</Typography>

// Prop `as` — sépare la sémantique HTML du style visuel
<Typography variant="small" as="span">texte inline</Typography>
<Typography variant="h2" as="h3">style h2, sémantique h3</Typography>

// Sur fond sombre
<Typography variant="h1" className="text-white">Hero title</Typography>
<Typography variant="lead" className="text-white/80">Sous-titre</Typography>
```

> **Règle** : ne jamais utiliser `<h1>`–`<h6>` ou `<p>` raw — toujours `<Typography variant="...">`. La story Storybook est dans `.storybook/stories/typography.stories.tsx`.

## Système de couleurs

### Palette "Garden Cream" (light mode)

| Token | Valeur oklch | Rôle |
|-------|-------------|------|
| `--background` | `oklch(0.97 0.014 88)` | Parchemin chaud |
| `--foreground` | `oklch(0.17 0.025 155)` | Encre forêt sombre |
| `--primary` | `oklch(0.38 0.09 150)` | Vert forêt profond (#2E5E4E) |
| `--primary-foreground` | `oklch(0.98 0.006 88)` | Crème clair |
| `--secondary` | `oklch(0.91 0.04 140)` | Sauge clair |
| `--muted` | `oklch(0.93 0.02 95)` | Crème neutre |
| `--accent` | `oklch(0.90 0.05 140)` | Accent sauge |
| `--card` | `oklch(0.99 0.008 88)` | Blanc cassé chaud |
| `--border` | `oklch(0.88 0.025 100)` | Bordure chaude |

### Palette "Night Garden" (dark mode — classe `.dark`)

| Token | Rôle |
|-------|------|
| `--background` | Teal nocturne profond |
| `--primary` | Sauge clair sur fond sombre |
| `--card` | Surface légèrement surélevée |

### Palette hexadécimale de référence (UI Kit)
- `#2E5E4E` → `--primary` (vert forêt)
- `#4F7F66` → vert moyen
- `#7DA88D` → sauge
- `#A7C9B3` → sauge clair
- `#BEC5C7` → gris-vert clair
- `#F7F6F1` → `--background` (crème)

## Classes utilitaires Tailwind

```tsx
// Couleurs du thème (recommandé — via variables CSS)
<div className="bg-background text-foreground" />
<div className="bg-primary text-primary-foreground" />
<div className="bg-secondary text-secondary-foreground" />
<div className="bg-muted text-muted-foreground" />
<div className="border-border" />
```

## Mode sombre

Géré via la classe `.dark` sur l'élément `html` :

```tsx
document.documentElement.classList.toggle('dark');
```

## Composants disponibles

Tous les composants UI sont dans `@core/components/ui/` et s'importent via `@core/components/ui/<fichier>`.

### Composants shadcn/ui (primitives `@base-ui/react`)

| Composant | Fichier | Description |
|-----------|---------|-------------|
| `Button`, `buttonVariants` | `button` | Bouton avec variants (voir tableau ci-dessous) |
| `Input` | `input` | Champ de saisie |
| `Card`, `CardHeader`, `CardTitle`, `CardContent`, `CardDescription`, `CardAction`, `CardFooter` | `card` | Carte composable |
| `Badge`, `badgeVariants` | `badge` | Badge/étiquette |
| `Label` | `label` | Label accessible |
| `Separator` | `separator` | Séparateur horizontal/vertical |
| `Select`, `SelectContent`, `SelectItem`, `SelectTrigger`, `SelectValue` | `select` | Liste déroulante |
| `Checkbox` | `checkbox` | Case à cocher |
| `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`, `TabsIndicator` | `tabs` | Navigation par onglets |
| `Dialog`, `DialogContent`, `DialogTitle`, `DialogDescription`, `DialogClose`, `DialogOverlay`, `DialogTrigger`, `DialogPortal` | `dialog` | Fenêtre modale accessible (overlay animé, bouton X) |
| `Progress` | `progress` | Barre de progression |
| `Switch` | `switch` | Interrupteur toggle |
| `Avatar`, `AvatarImage`, `AvatarFallback` | `avatar` | Avatar utilisateur |
| `Pagination`, `PaginationContent`, `PaginationItem`, `PaginationLink`, `PaginationPrevious`, `PaginationNext`, `PaginationEllipsis` | `pagination` | Navigation paginée |

#### Variants Button

| Variant | Style | Usage typique |
|---------|-------|---------------|
| `default` | `bg-primary` + texte crème | Bouton principal |
| `outline` | Bordure + bg transparent | Bouton secondaire |
| `secondary` | `bg-secondary` sauge clair | Action alternative |
| `ghost` | Transparent, hover muted | Nav sur fond clair |
| `ghost-white` | Transparent, texte/hover blanc | Nav AppBar landing, fonds sombres |
| `inverted` | `bg-white` + `text-primary` | CTA sur hero, bandeaux sombres |
| `destructive` | Rouge doux | Actions destructives |
| `link` | Lien souligné | Liens inline |

> **Règle** : ne jamais utiliser `<button>` ou `<a>` raw — toujours `<Button>` ou `buttonVariants()` sur un `<Link>`.

```typescript
// Lien TanStack Router avec apparence bouton
import { buttonVariants } from '@core/components/ui/button';
import { cn } from '@/lib/utils';

<Link to="/register" className={cn(buttonVariants({ variant: 'inverted', size: 'sm' }), 'rounded-full')}>
  Commencer
</Link>
```
| `Input` | `input` | Champ de saisie |
| `Card`, `CardHeader`, `CardTitle`, `CardContent`, `CardDescription`, `CardAction`, `CardFooter` | `card` | Carte composable |
| `Badge`, `badgeVariants` | `badge` | Badge/étiquette |
| `Label` | `label` | Label accessible |
| `Separator` | `separator` | Séparateur horizontal/vertical |
| `Select`, `SelectContent`, `SelectItem`, `SelectTrigger`, `SelectValue` | `select` | Liste déroulante |
| `Checkbox` | `checkbox` | Case à cocher |
| `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`, `TabsIndicator` | `tabs` | Navigation par onglets |
| `Progress` | `progress` | Barre de progression |
| `Switch` | `switch` | Interrupteur toggle |
| `Avatar`, `AvatarImage`, `AvatarFallback` | `avatar` | Avatar utilisateur |
| `Pagination`, `PaginationContent`, `PaginationItem`, `PaginationLink`, `PaginationPrevious`, `PaginationNext`, `PaginationEllipsis` | `pagination` | Navigation paginée |

### Composants custom (spécifiques au design Jardin des Langues)

| Composant | Fichier | Description |
|-----------|---------|-------------|
| `LevelBadge` | `level-badge` | Badge de niveau : `new`, `popular`, `beginner`, `intermediate`, `advanced` |
| `StarRating` | `star-rating` | Notation 0–5 étoiles, interactif ou readonly, demi-étoiles |
| `Stepper` | `stepper` | Indicateur d'étapes horizontal numéroté |
| `SearchInput` | `search-input` | Barre de recherche avec icône + bouton filtre optionnel |
| `FeatureCard` | `feature-card` | Carte avec image, titre (Playfair Display) et description |
| `PersonCard` | `person-card` | Carte équipe/profil : avatar, nom, rôle, liens sociaux |
| `TestimonialCard` | `testimonial-card` | Carte témoignage : citation, auteur, avatar, rating |
| `CtaBanner` | `cta-banner` | Bannière large avec gradient vert, titre et bouton CTA |
| `Fab` | `fab` | Floating Action Button circulaire vert, tailles `sm/md/lg` |
| `LanguageSelector` | `language-selector` | Sélecteur de langue du site (Français / English / 中文), taille `sm` ou `default` |

## AppBar et styles contextuels

L'`AppBar` adapte automatiquement son style selon la route active :

| Contexte | Position | Fond | Texte / liens |
|----------|----------|------|---------------|
| Landing page (`/`) | `absolute` (superposé au hero) | transparent | `text-white`, hover `bg-white/10` |
| Pages app (autres routes) | `sticky top-0` | `bg-primary` | `text-primary-foreground`, hover `bg-white/10` |

**Hero section landing (`HeroSection`) :**
- Image de fond : `@/assets/HeroBackground.png` en `object-cover`
- Overlay : `bg-gradient-to-r from-black/55 via-black/25 to-transparent`
- Titre : `<Typography variant="h1" className="text-white">` (Playfair Display, bold)
- Sous-titre : `<Typography variant="lead" className="text-white/80">`
- CTA : `bg-white text-primary rounded-full px-8 py-3` (pill)

## Évolutions futures

- Thèmes par langue (couleurs culturellement appropriées)
- Personnalisation utilisateur des couleurs d'accent
