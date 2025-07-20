// Types pour les langues supportées
export type Language = 'fr' | 'zh' | 'en';

// Types pour le dictionnaire
export interface DictionaryEntry {
  id: string;
  french: string;
  chinese: string;
  english?: string;
  pinyin?: string;
  category?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  examples?: Example[];
}

export interface Example {
  id: string;
  french: string;
  chinese: string;
  english?: string;
  audio?: string;
}

// Types pour les flashcards
export interface Flashcard {
  id: string;
  front: string;
  back: string;
  language: Language;
  category?: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  lastReviewed?: Date;
  nextReview?: Date;
  correctStreak?: number;
}

// Types pour les utilisateurs
export interface User {
  id: string;
  username: string;
  email: string;
  preferredLanguage: Language;
  level: 'beginner' | 'intermediate' | 'advanced';
  createdAt: Date;
  lastLogin?: Date;
}

// Types pour les exercices
export interface Exercise {
  id: string;
  title: string;
  description: string;
  type: 'translation' | 'multiple-choice' | 'writing' | 'listening';
  language: Language;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  audio?: string;
}

// Types pour l'API
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}
