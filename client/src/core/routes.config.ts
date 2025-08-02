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
// Note: Labels are now handled by translations in the components
export type NavigationItem = {
  path: string;
  icon: string;
  translationKey: string;
};

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { path: ROUTES.HOME, icon: '🏠', translationKey: 'navigation.home' },
  { path: ROUTES.DICTIONARY, icon: '📚', translationKey: 'navigation.dictionary' },
  { path: ROUTES.FLASHCARDS, icon: '🗂️', translationKey: 'navigation.flashcards' },
  { path: ROUTES.EXERCISES, icon: '🎯', translationKey: 'navigation.exercises' },
  { path: ROUTES.COMMUNITY, icon: '👥', translationKey: 'navigation.community' },
  { path: ROUTES.PROFILE, icon: '👤', translationKey: 'navigation.profile' },
];
