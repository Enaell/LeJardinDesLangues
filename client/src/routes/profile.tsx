import { createFileRoute } from '@tanstack/react-router';
import { ProtectedRoute } from '@features/auth/components/ProtectedRoute';

const ProfilePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Profil</h1>
      <p className="text-muted-foreground">
        Gérez votre profil et vos préférences d'apprentissage.
      </p>
    </div>
  );
};

export const Route = createFileRoute('/profile')({
  component: () => (
    <ProtectedRoute requireAuth>
      <ProfilePage />
    </ProtectedRoute>
  ),
});

