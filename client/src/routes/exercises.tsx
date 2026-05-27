import { createFileRoute } from '@tanstack/react-router';
import { ProtectedRoute } from '@features/auth/components/ProtectedRoute';

const ExercisesPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Exercices</h1>
      <p className="text-muted-foreground">
        Pratiquez avec des exercices interactifs et des jeux d'apprentissage.
      </p>
    </div>
  );
};

export const Route = createFileRoute('/exercises')({
  component: () => (
    <ProtectedRoute requireAuth>
      <ExercisesPage />
    </ProtectedRoute>
  ),
});

