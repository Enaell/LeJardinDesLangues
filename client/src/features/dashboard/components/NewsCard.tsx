import { Badge } from '@core/components/ui/badge';
import { Button } from '@core/components/ui/button';
import { Typography } from '@core/components/ui/typography';
import { Card, CardContent, CardHeader } from '@core/components/ui/card';

type NewsItem = {
  emoji: string;
  badgeLabel: string;
  title: string;
  description: string;
  timeAgo: string;
};

const newsItems: NewsItem[] = [
  {
    emoji: '🏯',
    badgeLabel: 'NEW FEATURE',
    title: 'AI Conversation: now in beta!',
    description: 'Practice speaking Chinese with our new AI assistant.',
    timeAgo: '2 days ago',
  },
  {
    emoji: '🌉',
    badgeLabel: 'COMMUNITY',
    title: 'New deck shared by Kenji',
    description: 'Discover "Everyday expressions" – 50 useful words!',
    timeAgo: '3 days ago',
  },
  {
    emoji: '📜',
    badgeLabel: 'ARTICLE',
    title: 'The beauty of Chinese poetry',
    description: 'Explore a poem and its cultural background.',
    timeAgo: '5 days ago',
  },
];

export const NewsCard = () => {
  return (
    <Card className="rounded-2xl bg-card">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Typography variant="h5">🌿 News from the garden</Typography>
          <Button variant="link" size="sm">
            View all
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {newsItems.map((item) => (
          <div
            key={item.title}
            className="flex gap-3 items-start py-3 border-b last:border-0"
          >
            <div className="w-16 h-16 rounded-lg bg-emerald-100 flex-shrink-0 flex items-center justify-center text-2xl">
              {item.emoji}
            </div>
            <div className="flex flex-col gap-1 min-w-0">
              <Badge variant="secondary" className="text-xs uppercase w-fit">
                {item.badgeLabel}
              </Badge>
              <Typography variant="small" className="font-semibold mt-1">
                {item.title}
              </Typography>
              <Typography variant="muted" className="text-xs">
                {item.description}
              </Typography>
              <Typography variant="muted" className="text-xs mt-1">
                {item.timeAgo}
              </Typography>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
