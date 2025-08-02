import { User } from "./user";

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