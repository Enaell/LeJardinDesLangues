// Types for authentication

export type User = {
  id: number;
  username: string;
  email: string;
  name: string;
  role: string;
  avatarUrl?: string;
  nativeLanguage: string;
  targetLanguage: string;
  createdAt: string;
  updatedAt: string;
};

export type AuthResponse = {
  user: User;
  accessToken: string;
};

export type RegisterRequest = {
  username: string;
  email: string;
  password: string;
  name: string;
  nativeLanguage: string;
  targetLanguage: string;
};

export type LoginRequest = {
  emailOrUsername: string;
  password: string;
};

export type AuthError = {
  message: string;
  statusCode: number;
};

// Auth hook result types
export type AuthMutationResult<TData = AuthResponse> = {
  data?: TData;
  error?: AuthError;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
};
