# Thème - Le Jardin des Langues

## Vue d'ensemble

Le design de "Le Jardin des Langues" s'inspire de la nature et de la croissance. Le thème est géré via les **CSS variables shadcn/ui** définies dans `src/index.css`.

## Système de couleurs

### shadcn/ui CSS Variables

Le thème utilise les variables CSS standards de shadcn/ui avec une base `neutral`. Les variables sont définies dans `src/index.css` :

```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --radius: 0.625rem;
}
```

### Couleurs personnalisées (Tailwind)

Les couleurs spécifiques au projet sont définies dans `tailwind.config.js` :

- **Primaire (Vert Jardin)** : `#3d8b3d`
- **Secondaire (Vert Sauge)** : `#6b7f6b`

```js
// tailwind.config.js
colors: {
  primary: { 500: '#3d8b3d', ... },
  secondary: { 500: '#6b7f6b', ... },
}
```

## Utilisation

### Composants shadcn/ui

Les composants shadcn/ui utilisent automatiquement les CSS variables du thème :

```tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const MyComponent = () => (
  <Card>
    <CardContent>
      <Button variant="default">Action</Button>
      <Badge variant="secondary">Label</Badge>
    </CardContent>
  </Card>
);
```

### Classes utilitaires Tailwind

Pour utiliser les couleurs du thème via Tailwind :

```tsx
// Via les variables CSS shadcn/ui (recommandé)
<div className="bg-background text-foreground" />
<div className="bg-primary text-primary-foreground" />
<div className="bg-muted text-muted-foreground" />
<div className="border-border" />

// Via les couleurs Tailwind personnalisées
<div className="text-primary-500 bg-secondary-100" />
```

## Mode sombre

Le mode sombre est géré via la classe `.dark` sur l'élément `html` :

```tsx
// Basculer le mode sombre
document.documentElement.classList.toggle('dark');
```

Les variables CSS `.dark` sont définies dans `src/index.css`.

## Composants disponibles

| Composant | Import | Description |
|-----------|--------|-------------|
| `Button` | `@/components/ui/button` | Bouton avec variants |
| `Input` | `@/components/ui/input` | Champ de saisie |
| `Card` | `@/components/ui/card` | Carte avec CardContent, CardHeader |
| `Badge` | `@/components/ui/badge` | Badge/étiquette |
| `Label` | `@/components/ui/label` | Label accessible |
| `Separator` | `@/components/ui/separator` | Séparateur horizontal/vertical |
| `Select` | `@/components/ui/select` | Liste déroulante |
| `Checkbox` | `@/components/ui/checkbox` | Case à cocher |



## Évolutions futures

- Mode sombre avec palette adaptée
- Thèmes par langue (couleurs culturellement appropriées)
- Personnalisation utilisateur des couleurs d'accent
