import { Link } from '@tanstack/react-router';
import { Button } from '@core/components/ui/button';
import { Typography } from '@core/components/ui/typography';
import { Card, CardContent } from '@core/components/ui/card';

type ExploreNavItem = {
  to: string;
  emoji: string;
  bgColor: string;
  title: string;
  subtitle: string;
};

const navItems: ExploreNavItem[] = [
  {
    to: '/flashcards',
    emoji: '📦',
    bgColor: 'bg-amber-100',
    title: 'My Decks',
    subtitle: 'Your words, your way',
  },
  {
    to: '/exercises',
    emoji: '📖',
    bgColor: 'bg-emerald-100',
    title: 'Learn',
    subtitle: 'Lessons & courses',
  },
  {
    to: '/exercises',
    emoji: '🎯',
    bgColor: 'bg-teal-100',
    title: 'Practice',
    subtitle: 'Exercises & games',
  },
  {
    to: '/community',
    emoji: '👥',
    bgColor: 'bg-blue-100',
    title: 'Community',
    subtitle: 'Share & connect',
  },
  {
    to: '/dictionary',
    emoji: '📚',
    bgColor: 'bg-purple-100',
    title: 'Library',
    subtitle: 'Texts & books',
  },
  {
    to: '/dashboard',
    emoji: '🤖',
    bgColor: 'bg-pink-100',
    title: 'AI Assistant',
    subtitle: 'Chat & speak',
  },
];

export const ExploreSection = () => {
  return (
    <section className="flex flex-col gap-4">
      <Typography variant="h4">Explore your garden</Typography>
      <div className="flex flex-wrap gap-4 items-start">
        {/* Navigation cards */}
        {navItems.map((item) => (
          <Link
            key={item.title}
            to={item.to}
            className="flex flex-col items-center gap-2 cursor-pointer group w-[120px]"
          >
            <div
              className={`w-28 h-24 rounded-2xl flex items-center justify-center text-4xl ${item.bgColor} group-hover:opacity-90 transition-opacity`}
            >
              {item.emoji}
            </div>
            <Typography variant="small" className="font-semibold text-center">
              {item.title}
            </Typography>
            <Typography variant="muted" className="text-xs text-center">
              {item.subtitle}
            </Typography>
            <Typography variant="muted" className="text-xs">
              ›
            </Typography>
          </Link>
        ))}

        {/* Motivational card */}
        <Card className="rounded-2xl flex-1 min-w-[200px]">
          <CardContent className="flex items-center gap-3 py-4">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-3xl flex-shrink-0">
              🪴
            </div>
            <div className="flex flex-col gap-2">
              <Typography variant="h6">Your garden needs care</Typography>
              <Typography variant="muted" className="text-xs">
                Consistency is the water that helps your garden grow.
              </Typography>
              <Button variant="default" size="sm" className="self-start">
                Keep going!
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
