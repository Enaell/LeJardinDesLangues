/**
 * Palette de couleurs pour Le Jardin des Langues
 * Basée sur le vert comme couleur principale, évoquant la nature, la croissance et l'apprentissage
 */

// Couleurs principales - Nuances de vert
export const colors = {
  // Vert principal - inspiré des feuilles fraîches
  primary: {
    50: '#f0f9f0',
    100: '#dcf2dc',
    200: '#bae5ba',
    300: '#8fd48f',
    400: '#5fb85f',
    500: '#4a9d4a', // Couleur principale
    600: '#3d8b3d',
    700: '#327032',
    800: '#2a5a2a',
    900: '#244a24',
    950: '#0f2a0f',
  },

  // Couleur secondaire - Vert sauge pour contraste doux
  secondary: {
    50: '#f4f6f4',
    100: '#e7ebe7',
    200: '#d1d8d1',
    300: '#b0bdb0',
    400: '#8a9c8a',
    500: '#6b7f6b', // Couleur secondaire
    600: '#556b55',
    700: '#455645',
    800: '#3a4739',
    900: '#323b32',
    950: '#191f19',
  },

  // Couleur d'accent - Orange doux pour les éléments interactifs
  accent: {
    50: '#fef7f0',
    100: '#fdede0',
    200: '#fad8c0',
    300: '#f6be95',
    400: '#f29968',
    500: '#ee7a44', // Couleur d'accent
    600: '#e05f2a',
    700: '#ba4b20',
    800: '#943e1f',
    900: '#78351d',
    950: '#41190c',
  },

  // Couleurs sémantiques
  success: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },

  warning: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },

  error: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },

  info: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },

  // Couleurs neutres - Grès naturel
  grey: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },

  // Couleurs de fond
  background: {
    default: '#fefefe',
    paper: '#ffffff',
    disabled: '#f5f5f5',
  },

  // Couleurs de texte
  text: {
    primary: 'rgba(0, 0, 0, 0.87)',
    secondary: 'rgba(0, 0, 0, 0.6)',
    disabled: 'rgba(0, 0, 0, 0.38)',
  },
} as const;

export type ColorPalette = typeof colors;
