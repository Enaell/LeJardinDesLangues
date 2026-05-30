import { Button } from '@core/components/ui/button';
import { Progress } from '@core/components/ui/progress';
import { Typography } from '@core/components/ui/typography';
import { Card, CardContent } from '@core/components/ui/card';

export const DailyGrowthCard = () => {
  return (
    <Card className="rounded-2xl bg-card">
      <CardContent className="flex items-center justify-between gap-4 p-6">
        <div className="flex flex-col gap-3 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-xl">🌱</span>
            <Typography variant="h4">Daily growth</Typography>
          </div>
          <Typography variant="p" className="text-muted-foreground">
            Small steps every day create big results.
          </Typography>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Typography variant="small" className="text-muted-foreground">
                Today's goal
              </Typography>
              <Typography variant="small" className="font-semibold">
                15 / 20 XP
              </Typography>
            </div>
            <Progress value={75} className="w-full" />
          </div>
          <Button variant="default" className="self-start rounded-lg">
            Continue learning
          </Button>
        </div>
        <div className="w-32 h-32 bg-emerald-100 rounded-full flex items-center justify-center text-5xl flex-shrink-0">
          🌱
        </div>
      </CardContent>
    </Card>
  );
};
