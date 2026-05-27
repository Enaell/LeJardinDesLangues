import { createFileRoute } from "@tanstack/react-router";
import { ProtectedRoute } from '@features/auth/components/ProtectedRoute';

const DictionaryPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Dictionnaire</h1>
      <p className="text-muted-foreground">
        Recherchez des mots et découvrez leurs traductions et définitions.
      </p>
    </div>
  );
};

export const Route = createFileRoute('/dictionary')({
  component: () => (
    <ProtectedRoute requireAuth>
      <DictionaryPage />
    </ProtectedRoute>
  ),
});

