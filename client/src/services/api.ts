import { ApiResponse, PaginatedResponse, DictionaryEntry, Flashcard, Exercise } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Dictionary API
  async searchDictionary(query: string, language: 'fr' | 'zh' = 'fr'): Promise<ApiResponse<DictionaryEntry[]>> {
    return this.request(`/dictionary/search?q=${encodeURIComponent(query)}&lang=${language}`);
  }

  async getDictionaryEntry(id: string): Promise<ApiResponse<DictionaryEntry>> {
    return this.request(`/dictionary/${id}`);
  }

  // Flashcards API
  async getFlashcards(userId: string): Promise<ApiResponse<Flashcard[]>> {
    return this.request(`/users/${userId}/flashcards`);
  }

  async createFlashcard(userId: string, flashcard: Omit<Flashcard, 'id'>): Promise<ApiResponse<Flashcard>> {
    return this.request(`/users/${userId}/flashcards`, {
      method: 'POST',
      body: JSON.stringify(flashcard),
    });
  }

  async updateFlashcard(userId: string, flashcardId: string, updates: Partial<Flashcard>): Promise<ApiResponse<Flashcard>> {
    return this.request(`/users/${userId}/flashcards/${flashcardId}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  }

  async deleteFlashcard(userId: string, flashcardId: string): Promise<ApiResponse<void>> {
    return this.request(`/users/${userId}/flashcards/${flashcardId}`, {
      method: 'DELETE',
    });
  }

  // Exercises API
  async getExercises(filters?: { difficulty?: string; type?: string; }): Promise<PaginatedResponse<Exercise>> {
    const params = new URLSearchParams();
    if (filters?.difficulty) params.append('difficulty', filters.difficulty);
    if (filters?.type) params.append('type', filters.type);

    return this.request(`/exercises?${params.toString()}`);
  }

  async getExercise(id: string): Promise<ApiResponse<Exercise>> {
    return this.request(`/exercises/${id}`);
  }

  async submitExerciseResult(exerciseId: string, userId: string, answers: Record<string, string>): Promise<ApiResponse<{ score: number; correct: number; total: number; }>> {
    return this.request(`/exercises/${exerciseId}/submit`, {
      method: 'POST',
      body: JSON.stringify({ userId, answers }),
    });
  }
}

export const apiService = new ApiService();
