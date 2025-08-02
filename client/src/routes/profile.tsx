import { createFileRoute } from '@tanstack/react-router';
import { useProfile } from '@features/auth/hooks/useAuth';
import { Profile } from '@features/profile/components/Profile';

const ProfilePage = () => {
  const { data: user, isLoading, isError, error } = useProfile();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Profil</h1>
        <p className="text-gray-600 mb-6">
          Gérez votre profil et vos préférences d'apprentissage.
        </p>
        {isLoading && <div>Chargement du profil…</div>}
        {isError && <div className="text-red-500">Erreur : {error?.message || 'Impossible de charger le profil.'}</div>}
        {user && <Profile user={user} />}
      </div>
    </div>
  );
};

export const Route = createFileRoute('/profile')({
  component: ProfilePage,
});
