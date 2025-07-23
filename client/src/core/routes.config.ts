// Routes configuration and constants
export const ROUTES = {
  HOME: '/',
  DICTIONARY: '/dictionary',
  FLASHCARDS: '/flashcards',
  EXERCISES: '/exercises',
  COMMUNITY: '/community',
  PROFILE: '/profile',
} as const;

export type RouteKeys = keyof typeof ROUTES;
export type RoutePaths = typeof ROUTES[RouteKeys];

// Navigation items configuration
export const NAVIGATION_ITEMS = [
  { label: 'Accueil', path: ROUTES.HOME, icon: '🏠' },
  { label: 'Dictionnaire', path: ROUTES.DICTIONARY, icon: '📚' },
  { label: 'Cartes Mémoire', path: ROUTES.FLASHCARDS, icon: '🗂️' },
  { label: 'Exercices', path: ROUTES.EXERCISES, icon: '🎯' },
  { label: 'Communauté', path: ROUTES.COMMUNITY, icon: '👥' },
  { label: 'Profil', path: ROUTES.PROFILE, icon: '👤' },
] as const;
