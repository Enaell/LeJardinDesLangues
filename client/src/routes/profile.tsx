import { createFileRoute } from '@tanstack/react-router';
import { ProtectedRoute } from '@features/auth/components/ProtectedRoute';
import { Typography } from '@core/components/ui/typography';

const ProfilePage = () => {
  return (
    <main className="container mx-auto px-4 py-8">
      <Typography variant="h2">Paramètres du profil</Typography>
      <Typography variant="lead" className="text-muted-foreground mt-2">
        Gérez vos informations personnelles et vos préférences d'apprentissage.
      </Typography>
    </main>
  );
};

export const Route = createFileRoute('/profile')({
  component: () => (
    <ProtectedRoute requireAuth>
      <ProfilePage />
    </ProtectedRoute>
  ),
});

