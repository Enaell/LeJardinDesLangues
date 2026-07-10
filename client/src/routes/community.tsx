import { createFileRoute } from '@tanstack/react-router';
import { ProtectedRoute } from '@features/auth/components/ProtectedRoute';

const CommunityPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Communauté</h1>
      <p className="text-muted-foreground">
        Partagez et découvrez du contenu avec la communauté d'apprenants.
      </p>
    </div>
  );
};

export const Route = createFileRoute('/community')({
  component: () => (
    <ProtectedRoute requireAuth>
      <CommunityPage />
    </ProtectedRoute>
  ),
});

