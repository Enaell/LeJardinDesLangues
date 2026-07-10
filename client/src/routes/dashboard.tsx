import { createFileRoute } from '@tanstack/react-router';
import { ProtectedRoute } from '@features/auth/components/ProtectedRoute';
import { useAuth } from '@features/auth/hooks';
import { Typography } from '@core/components/ui/typography';
import {
  DailyGrowthCard,
  QuickExerciseCard,
  NewsCard,
  ProgressCard,
  DailyTasksCard,
  ExploreSection,
  QuoteCard,
} from '@features/dashboard';

const DashboardPage = () => {
  const { user } = useAuth();
  const displayName = user?.name ?? user?.username ?? 'Apprenant';

  return (
    <div className="min-h-screen bg-background">
      <main className="px-6 py-8 max-w-screen-xl mx-auto flex flex-col gap-6">
        {/* Welcome */}
        <section>
          <Typography variant="h2">Welcome back, {displayName} 🌿</Typography>
          <Typography variant="p" className="text-muted-foreground mt-1">
            Keep growing your language garden today.
          </Typography>
        </section>

        {/* Main 2-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6">
          {/* Left column */}
          <div className="flex flex-col gap-5">
            <DailyGrowthCard />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <QuickExerciseCard />
              <NewsCard />
            </div>
          </div>
          {/* Right column */}
          <div className="flex flex-col gap-5">
            <ProgressCard />
            <QuoteCard />
            <DailyTasksCard />
          </div>
        </div>

        {/* Explore */}
        <ExploreSection />
      </main>
    </div>
  );
};

export const Route = createFileRoute('/dashboard')({
  component: () => (
    <ProtectedRoute requireAuth>
      <DashboardPage />
    </ProtectedRoute>
  ),
});
