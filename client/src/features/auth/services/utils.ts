
// Lit le cookie non-httpOnly posé par le serveur pour savoir si une session est active.
// Ne contient aucune donnée sensible — les vrais tokens sont en httpOnly cookies.
export const isAuthenticatedCookie = (): boolean => {
  return document.cookie.split(';').some((c) => c.trim().startsWith('is_authenticated=true'));
};
