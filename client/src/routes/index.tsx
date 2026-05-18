import { createFileRoute } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import { useTranslation } from '@core/hooks';

const features = [
  { titleKey: 'features.dictionary.title', descriptionKey: 'features.dictionary.description', path: '/dictionary' },
  { titleKey: 'features.flashcards.title', descriptionKey: 'features.flashcards.description', path: '/flashcards' },
  { titleKey: 'features.exercises.title', descriptionKey: 'features.exercises.description', path: '/exercises' },
  { titleKey: 'features.community.title', descriptionKey: 'features.community.description', path: '/community' },
  { titleKey: 'features.profile.title', descriptionKey: 'features.profile.description', path: '/profile' },
] as const;

export const HomePage = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-3">{t('app.title')}</h1>
      <p className="text-xl text-muted-foreground text-center mb-10">{t('app.subtitle')}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {features.map((feature) => (
          <div key={feature.path} className="rounded-lg border bg-card p-6 flex flex-col gap-3">
            <h2 className="text-lg font-semibold">{t(feature.titleKey)}</h2>
            <p className="text-sm text-muted-foreground flex-grow">{t(feature.descriptionKey)}</p>
            <Link
              to={feature.path}
              className="text-sm font-medium text-primary hover:underline"
            >
              {t('features.discover')} →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Route = createFileRoute('/')({
  component: HomePage,
});


