import { User } from "@/features/auth";

// Types pour les langues supportées
export type Language = 'fr' | 'zh' | 'en';

// Types pour le dictionnaire
export type DictionaryEntry = {
  id: string;
  french: string;
  chinese: string;
  english?: string;
  pinyin?: string;
  category?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  examples?: Example[];
};

export type Example = {
  id: string;
  french: string;
  chinese: string;
  english?: string;
  audio?: string;
};

// Types pour les flashcards
export type Flashcard = {
  id: string;
  front: string;
  back: string;
  language: Language;
  category?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  lastReviewed?: Date;
  nextReview?: Date;
  correctStreak?: number;
};

// Types pour les utilisateurs
export type UserExtended = User & {
  level?: 'beginner' | 'intermediate' | 'advanced';
};

// Types pour les exercices
export type Exercise = {
  id: string;
  title: string;
  description: string;
  type: 'translation' | 'multiple-choice' | 'writing' | 'listening';
  language: Language;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  questions: Question[];
};

export type Question = {
  id: string;
  text: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  audio?: string;
};

// Types pour l'API
export type ApiResponse<T> = {
  data: T;
  success: boolean;
  message?: string;
};

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
};
