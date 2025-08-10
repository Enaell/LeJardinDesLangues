import { useCallback } from 'react';
import { useApi } from '@core/services/api';

// Types placeholder - à définir plus tard
export type Exercise = {
  id: string;
  title: string;
  description: string;
  type: 'multiple-choice' | 'fill-blank' | 'matching' | 'translation';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  questions: ExerciseQuestion[];
  estimatedTime: number; // en minutes
  tags: string[];
  createdAt: string;
  // ... autres propriétés à définir
};

export type ExerciseQuestion = {
  id: string;
  question: string;
  options?: string[]; // Pour multiple-choice
  correctAnswer: string;
  explanation?: string;
};

export type ExerciseFilters = {
  type?: Exercise['type'];
  difficulty?: Exercise['difficulty'];
  tags?: string[];
  search?: string;
};

export type ExerciseResult = {
  exerciseId: string;
  userId: string;
  answers: Record<string, string>; // questionId -> answer
  score: number;
  completedAt: string;
};

export type ExerciseSubmission = {
  score: number;
  correct: number;
  total: number;
  details: Array<{
    questionId: string;
    isCorrect: boolean;
    userAnswer: string;
    correctAnswer: string;
  }>;
};

// Hook spécialisé pour les API d'exercices
export const useExercisesApi = () => {
  const { requestWithErrorHandling } = useApi();

  // Obtenir la liste des exercices
  const getExercises = useCallback(async (filters?: ExerciseFilters): Promise<Exercise[]> => {
    // TODO: Implémenter la récupération réelle
    console.log('[useExercisesApi] getExercises - Placeholder implementation', filters);

    // Simulation temporaire
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: '1',
            title: 'Les salutations de base',
            description: 'Apprenez les salutations essentielles en chinois',
            type: 'multiple-choice',
            difficulty: 'beginner',
            questions: [
              {
                id: 'q1',
                question: 'Comment dit-on "Bonjour" en chinois ?',
                options: ['你好', '再见', '谢谢', '对不起'],
                correctAnswer: '你好',
                explanation: '你好 (nǐ hǎo) est la salutation la plus courante en chinois.'
              }
            ],
            estimatedTime: 5,
            tags: ['greetings', 'beginner', 'vocabulary'],
            createdAt: new Date().toISOString(),
          },
          {
            id: '2',
            title: 'Conjugaison française',
            description: 'Exercices sur les verbes du premier groupe',
            type: 'fill-blank',
            difficulty: 'intermediate',
            questions: [],
            estimatedTime: 10,
            tags: ['grammar', 'verbs', 'french'],
            createdAt: new Date().toISOString(),
          }
        ]);
      }, 600);
    });

    // Code réel (commenté pour l'instant) :
    // const params = new URLSearchParams();
    // if (filters?.type) params.append('type', filters.type);
    // if (filters?.difficulty) params.append('difficulty', filters.difficulty);
    // if (filters?.tags?.length) params.append('tags', filters.tags.join(','));
    // if (filters?.search) params.append('search', filters.search);
    // return await requestWithErrorHandling(`/exercises?${params.toString()}`);
  }, [requestWithErrorHandling]);

  // Obtenir un exercice spécifique
  const getExercise = useCallback(async (id: string): Promise<Exercise> => {
    // TODO: Implémenter la récupération réelle
    console.log('[useExercisesApi] getExercise - Placeholder implementation', id);

    // Simulation temporaire
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id,
          title: `Exercice ${id}`,
          description: `Description de l'exercice ${id}`,
          type: 'multiple-choice',
          difficulty: 'beginner',
          questions: [
            {
              id: 'q1',
              question: 'Question exemple ?',
              options: ['Option A', 'Option B', 'Option C', 'Option D'],
              correctAnswer: 'Option A',
              explanation: 'Explication de la réponse correcte.'
            }
          ],
          estimatedTime: 5,
          tags: ['example'],
          createdAt: new Date().toISOString(),
        });
      }, 400);
    });

    // Code réel (commenté pour l'instant) :
    // return await requestWithErrorHandling(`/exercises/${id}`);
  }, [requestWithErrorHandling]);

  // Soumettre les réponses d'un exercice
  const submitExercise = useCallback(async (exerciseId: string, userId: string, answers: Record<string, string>): Promise<ExerciseSubmission> => {
    // TODO: Implémenter la soumission réelle
    console.log('[useExercisesApi] submitExercise - Placeholder implementation', { exerciseId, userId, answers });

    // Simulation temporaire
    return new Promise((resolve) => {
      setTimeout(() => {
        const totalQuestions = Object.keys(answers).length;
        const correctAnswers = Math.floor(totalQuestions * 0.7); // 70% de réussite simulée

        resolve({
          score: Math.round((correctAnswers / totalQuestions) * 100),
          correct: correctAnswers,
          total: totalQuestions,
          details: Object.entries(answers).map(([questionId, userAnswer], index) => ({
            questionId,
            isCorrect: index < correctAnswers,
            userAnswer,
            correctAnswer: `Correct answer for ${questionId}`,
          })),
        });
      }, 800);
    });

    // Code réel (commenté pour l'instant) :
    // return await requestWithErrorHandling(`/exercises/${exerciseId}/submit`, {
    //   method: 'POST',
    //   body: JSON.stringify({ userId, answers }),
    // });
  }, [requestWithErrorHandling]);

  // Obtenir les résultats d'un utilisateur
  const getUserResults = useCallback(async (userId: string): Promise<ExerciseResult[]> => {
    // TODO: Implémenter la récupération réelle
    console.log('[useExercisesApi] getUserResults - Placeholder implementation', userId);

    // Simulation temporaire
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            exerciseId: '1',
            userId,
            answers: { 'q1': '你好' },
            score: 85,
            completedAt: new Date().toISOString(),
          }
        ]);
      }, 300);
    });

    // Code réel (commenté pour l'instant) :
    // return await requestWithErrorHandling(`/users/${userId}/exercise-results`);
  }, [requestWithErrorHandling]);

  return {
    getExercises,
    getExercise,
    submitExercise,
    getUserResults,
  };
};
