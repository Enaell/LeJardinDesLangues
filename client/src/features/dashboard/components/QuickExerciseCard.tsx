import { Button } from '@core/components/ui/button';
import { Typography } from '@core/components/ui/typography';
import { Card, CardContent, CardHeader } from '@core/components/ui/card';

const options = [
  { label: 'fleur', correct: false },
  { label: 'arbre', correct: true },
  { label: 'pierre', correct: false },
  { label: 'eau', correct: false },
];

export const QuickExerciseCard = () => {
  return (
    <Card className="rounded-2xl bg-card">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <Typography variant="h5">🌿 Quick exercise</Typography>
          <Button variant="link" size="sm">
            View all
          </Button>
        </div>
        <Typography variant="muted">A little practice to bloom your skills.</Typography>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="rounded-xl border bg-muted/30 p-4">
          <div className="flex gap-4 items-start">
            {/* Character display */}
            <div className="bg-white rounded-xl p-4 flex flex-col items-center gap-1 min-w-[80px]">
              <Typography variant="muted" as="span" className="text-xs">
                shù
              </Typography>
              <Typography variant="h2" className="text-4xl font-bold leading-none">
                树
              </Typography>
              <Typography variant="muted" as="span" className="text-xs">
                arbre
              </Typography>
            </div>
            {/* Options */}
            <div className="flex flex-col gap-2 flex-1">
              <Typography variant="muted" className="text-xs mb-1">
                Which meaning is correct?
              </Typography>
              {options.map((opt) => (
                <Button
                  key={opt.label}
                  variant={opt.correct ? 'default' : 'outline'}
                  size="sm"
                  className="w-full justify-start"
                >
                  {opt.label}
                </Button>
              ))}
            </div>
          </div>
          <Button variant="default" className="w-full mt-3">
            Check
          </Button>
        </div>
        {/* Pagination dots */}
        <div className="flex gap-2 justify-center mt-1">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <div className="w-2 h-2 rounded-full bg-muted" />
          <div className="w-2 h-2 rounded-full bg-muted" />
        </div>
      </CardContent>
    </Card>
  );
};
