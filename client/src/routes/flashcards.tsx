import { createFileRoute } from '@tanstack/react-router';

const FlashcardsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Cartes Mémoire</h1>
      <p className="text-muted-foreground">
        Créez et étudiez vos cartes mémoire personnalisées.
      </p>
    </div>
  );
};

export const Route = createFileRoute('/flashcards')({
  component: FlashcardsPage,
});

