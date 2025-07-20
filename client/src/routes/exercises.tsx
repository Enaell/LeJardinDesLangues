import { createFileRoute } from '@tanstack/react-router';

export function ExercisesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Exercices</h1>
        <p className="text-gray-600">
          Pratiquez avec des exercices interactifs et des jeux d'apprentissage.
        </p>
        {/* TODO: Intégrer le composant Exercises de la feature */}
      </div>
    </div>
  );
}

export const Route = createFileRoute('/exercises')({
  component: ExercisesPage,
});
