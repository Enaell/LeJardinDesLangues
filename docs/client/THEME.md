# Thème - Le Jardin des Langues

## Vue d'ensemble

Le design de "Le Jardin des Langues" s'inspire de la nature et de la croissance ("LinguaGarden" UI Kit). Le thème est géré via les **CSS variables shadcn/ui** définies dans `src/index.css`, avec style `base-nova` et primitives `@base-ui/react`.

## Typographie

| Rôle | Police | Variable CSS | Package |
|------|--------|-------------|---------|
| Titres (`font-heading`) | **Playfair Display Variable** | `--font-heading` | `@fontsource-variable/playfair-display` |
| Corps de texte | **Lora** | — | `@fontsource/lora` |
| UI / Boutons (`font-sans`) | **Geist Variable** | `--font-sans` | `@fontsource-variable/geist` |

Utilisation :
```tsx
<h1 className="font-heading text-2xl">Titre en Playfair Display</h1>
<p className="font-sans text-base">Corps de texte Geist</p>
```

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
| `Button`, `buttonVariants` | `button` | Bouton avec variants (default, outline, secondary, ghost, destructive, link) |
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

### Composants custom (spécifiques au design LinguaGarden)

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

## Évolutions futures

- Thèmes par langue (couleurs culturellement appropriées)
- Personnalisation utilisateur des couleurs d'accent
