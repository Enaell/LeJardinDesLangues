# Thème Material-UI - Le Jardin des Langues

## Vue d'ensemble

Le thème de "Le Jardin des Langues" s'inspire de la nature et de la croissance, utilisant le vert comme couleur principale pour évoquer l'apprentissage, l'épanouissement et la progression naturelle dans l'acquisition des langues.

## Palette de couleurs

### Couleurs principales

- **Primaire (Vert Jardin)** : `#4a9d4a` - Évoque la croissance et l'apprentissage
- **Secondaire (Vert Sauge)** : `#6b7f6b` - Apporte une nuance douce et naturelle
- **Accent (Orange Doux)** : `#ee7a44` - Pour les éléments interactifs et d'attention

### Couleurs sémantiques

- **Succès** : `#22c55e` - Pour les réussites et validations
- **Avertissement** : `#f59e0b` - Pour les alertes importantes
- **Erreur** : `#ef4444` - Pour les erreurs et problèmes
- **Information** : `#3b82f6` - Pour les informations générales

## Philosophie du design

### Inspiration naturelle
- Bords arrondis (12px par défaut, 16px pour les cartes) pour un aspect organique
- Ombres douces et subtiles pour créer de la profondeur
- Palette de couleurs inspirée de la nature

### Accessibilité
- Ratios de contraste conformes aux standards WCAG
- Tailles de police lisibles et hiérarchie claire
- États focus et hover bien définis

### Cohérence
- System de spacing cohérent (8px de base)
- Composants personnalisés pour Material-UI
- Types TypeScript pour une utilisation sûre

## Utilisation

### Dans les composants React

```tsx
import { useTheme } from '../core/hooks/useTheme';
import { colors } from '../core/theme/colors';

const MyComponent = () => {
  const theme = useTheme();
  
  return (
    <Box sx={{ 
      backgroundColor: theme.palette.primary.main,
      color: colors.primary[100]
    }}>
      Contenu
    </Box>
  );
};
```

### Avec Tailwind CSS

Les couleurs personnalisées peuvent être étendues dans Tailwind si nécessaire :

```typescript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'jardin-primary': '#4a9d4a',
        'jardin-secondary': '#6b7f6b',
        'jardin-accent': '#ee7a44',
      }
    }
  }
}
```

## Composants personnalisés

### Boutons
- Texte non transformé en majuscules
- Bords arrondis de 12px
- Ombres subtiles au hover

### Cartes
- Bords arrondis de 16px
- Effet de survol avec ombre plus prononcée
- Transition fluide

### Champs de saisie
- Bords arrondis de 12px
- États focus avec couleur primaire
- Bordure de 2px en focus

## Bonnes pratiques

1. **Utilisez le hook `useTheme`** pour accéder au thème dans vos composants
2. **Préférez Tailwind pour les layouts** et Material-UI `sx` pour les styles spécifiques au thème
3. **Respectez la hiérarchie des couleurs** : primaire pour les actions principales, secondaire pour les actions secondaires, accent pour attirer l'attention
4. **Testez l'accessibilité** en utilisant les outils de développement du navigateur

## Évolutions futures

- Mode sombre avec palette adaptée
- Thèmes par langue (couleurs culturellement appropriées)
- Personnalisation utilisateur des couleurs d'accent
