// Types spécifiques aux formulaires d'authentification TanStack Form

export type LoginFormData = {
  emailOrUsername: string;
  password: string;
};

export type RegisterFormData = {
  username: string;
  email: string;
  password: string;
  name: string;
  nativeLanguage: string;
  targetLanguage: string;
};
