import { createFileRoute } from '@tanstack/react-router';

export function FlashcardsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Cartes Mémoire</h1>
        <p className="text-gray-600">
          Créez et étudiez vos cartes mémoire personnalisées.
        </p>
        {/* TODO: Intégrer le composant Flashcards de la feature */}
      </div>
    </div>
  );
}

export const Route = createFileRoute('/flashcards')({
  component: FlashcardsPage,
});
