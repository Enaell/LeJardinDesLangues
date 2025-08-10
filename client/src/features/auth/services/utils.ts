
// Utilitaires pour la gestion des tokens
export const tokenUtils = {
  // Clé pour le stockage local
  TOKEN_KEY: 'auth_token',

  // Sauvegarder le token
  saveToken: (token: string): void => {
    localStorage.setItem(tokenUtils.TOKEN_KEY, token);
  },

  // Récupérer le token
  getToken: (): string | null => {
    return localStorage.getItem(tokenUtils.TOKEN_KEY);
  },

  // Supprimer le token
  removeToken: (): void => {
    localStorage.removeItem(tokenUtils.TOKEN_KEY);
  },

  // Vérifier si un token existe
  hasToken: (): boolean => {
    return !!tokenUtils.getToken();
  },
};
