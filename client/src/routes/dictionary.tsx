import { createFileRoute } from "@tanstack/react-router";

const DictionaryPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Dictionnaire</h1>
        <p className="text-gray-600">
          Recherchez des mots et découvrez leurs traductions et définitions.
        </p>
        {/* TODO: Intégrer le composant Dictionary de la feature */}
      </div>
    </div>
  );
};

export const Route = createFileRoute('/dictionary')({
  component: DictionaryPage,
});
