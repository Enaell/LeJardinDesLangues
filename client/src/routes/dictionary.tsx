import { createFileRoute } from "@tanstack/react-router";

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
  component: DictionaryPage,
});

