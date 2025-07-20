import { createFileRoute } from '@tanstack/react-router';

export function CommunityPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Communauté</h1>
        <p className="text-gray-600">
          Partagez et découvrez du contenu avec la communauté d'apprenants.
        </p>
        {/* TODO: Intégrer le composant Community de la feature */}
      </div>
    </div>
  );
}

export const Route = createFileRoute('/community')({
  component: CommunityPage,
});
