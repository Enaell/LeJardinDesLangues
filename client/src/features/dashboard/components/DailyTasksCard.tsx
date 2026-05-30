import { Typography } from '@core/components/ui/typography';
import { Card, CardContent } from '@core/components/ui/card';
import { ChevronRight } from 'lucide-react';

type DailyTask = {
  icon: string;
  label: string;
  detail: string;
};

const tasks: DailyTask[] = [
  { icon: '📚', label: 'Review flashcards', detail: '12 new' },
  { icon: '🌿', label: 'Learn new words', detail: '8' },
  { icon: '✏️', label: 'Do a quick exercise', detail: '5 min' },
  { icon: '🎤', label: 'Practice speaking', detail: '10 min' },
];

export const DailyTasksCard = () => {
  return (
    <Card className="rounded-2xl bg-card">
      <CardContent className="pt-6">
        <Typography variant="h5" className="mb-2">
          Today in your garden
        </Typography>
        {tasks.map((task) => (
          <div
            key={task.label}
            className="flex items-center justify-between py-3 border-b last:border-0 cursor-pointer hover:bg-muted/30 rounded-lg px-2"
          >
            <div className="flex items-center gap-2">
              <span>{task.icon}</span>
              <Typography variant="small">{task.label}</Typography>
            </div>
            <div className="flex items-center gap-1">
              <Typography variant="muted" className="text-xs">
                {task.detail}
              </Typography>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
