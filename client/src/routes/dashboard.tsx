import { createFileRoute, Link } from '@tanstack/react-router';
import { ProtectedRoute } from '@features/auth/components/ProtectedRoute';
import { useAuth } from '@features/auth/hooks';
import { Typography } from '@core/components/ui/typography';
import { Card, CardContent } from '@core/components/ui/card';
import { buttonVariants } from '@core/components/ui/button';
import { cn } from '@/lib/utils';

const quickAccessItems = [
  {
    to: '/dictionary',
    icon: '📚',
    title: 'Dictionnaire',
    description: 'Recherchez des mots et explorez leurs définitions.',
  },
  {
    to: '/flashcards',
    icon: '🗂️',
    title: 'Flashcards',
    description: 'Révisez vos mots avec des cartes mémoire personnalisées.',
  },
  {
    to: '/exercises',
    icon: '🎯',
    title: 'Exercices',
    description: 'Pratiquez avec des exercices adaptés à votre niveau.',
  },
  {
    to: '/community',
    icon: '👥',
    title: 'Communauté',
    description: 'Partagez et découvrez des ressources avec la communauté.',
  },
] as const;

export const DashboardPage = () => {
  const { user } = useAuth();
  const displayName = user?.name ?? user?.username ?? 'Apprenant';

  return (
    <main className="container mx-auto px-4 py-8 flex flex-col gap-8">
      {/* Bienvenue */}
      <section>
        <Typography variant="h2">Bonjour, {displayName} 👋</Typography>
        <Typography variant="lead" className="text-muted-foreground mt-1">
          Continuez votre apprentissage là où vous vous êtes arrêté.
        </Typography>
      </section>

      {/* Accès rapide */}
      <section className="flex flex-col gap-4">
        <Typography variant="h4">Accès rapide</Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickAccessItems.map((item) => (
            <Card
              key={item.to}
              className="transition-shadow duration-200 hover:shadow-md"
            >
              <CardContent className="flex flex-col gap-3 p-6">
                <span className="text-3xl">{item.icon}</span>
                <Typography variant="h5">{item.title}</Typography>
                <Typography variant="muted">{item.description}</Typography>
                <Link
                  to={item.to}
                  className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'mt-auto')}
                >
                  Accéder
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Progression */}
      <section className="flex flex-col gap-4">
        <Typography variant="h4">Ma progression</Typography>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="flex flex-col items-center gap-2 p-6 text-center">
              <Typography variant="large" className="text-primary font-bold">
                —
              </Typography>
              <Typography variant="muted">Mots appris</Typography>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center gap-2 p-6 text-center">
              <Typography variant="large" className="text-primary font-bold">
                —
              </Typography>
              <Typography variant="muted">Jours consécutifs</Typography>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center gap-2 p-6 text-center">
              <Typography variant="large" className="text-primary font-bold">
                —
              </Typography>
              <Typography variant="muted">Flashcards maîtrisées</Typography>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
};

export const Route = createFileRoute('/dashboard')({
  component: () => (
    <ProtectedRoute requireAuth>
      <DashboardPage />
    </ProtectedRoute>
  ),
});
