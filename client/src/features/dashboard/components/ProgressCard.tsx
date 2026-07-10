import { Typography } from '@core/components/ui/typography';
import { Card, CardContent } from '@core/components/ui/card';

export const ProgressCard = () => {
  return (
    <Card className="rounded-2xl bg-card">
      <CardContent className="flex flex-col items-center pt-6 pb-6">
        <Typography variant="h5" className="w-full">
          🌿 Your progress
        </Typography>
        <Typography variant="muted" className="w-full mt-1">
          Level 8 • Sprouting Scholar
        </Typography>

        {/* Circular progress */}
        <div className="relative w-32 h-32 mx-auto my-4">
          <div className="w-32 h-32 rounded-full border-8 border-muted" />
          <div className="absolute inset-0 rounded-full border-8 border-primary border-r-transparent border-b-transparent rotate-[-45deg]" />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Typography variant="h4" as="span">
              420
            </Typography>
            <Typography variant="muted" as="span" className="text-xs">
              / 800 XP
            </Typography>
          </div>
        </div>

        <Typography variant="muted" className="text-center text-xs mb-4">
          XP to next level
        </Typography>

        {/* Stats row */}
        <div className="flex gap-6 justify-center">
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-1">
              <span>🔥</span>
              <Typography variant="large">8</Typography>
            </div>
            <Typography variant="muted" className="text-xs">
              Day streak
            </Typography>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-1">
              <span>🌿</span>
              <Typography variant="large">36</Typography>
            </div>
            <Typography variant="muted" className="text-xs">
              Words learned
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
