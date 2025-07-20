import { createFileRoute } from '@tanstack/react-router';

export function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Profil</h1>
        <p className="text-gray-600">
          Gérez votre profil et vos préférences d'apprentissage.
        </p>
        {/* TODO: Intégrer le composant Profile de la feature */}
      </div>
    </div>
  );
}

export const Route = createFileRoute('/profile')({
  component: ProfilePage,
});
