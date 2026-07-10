import { Typography } from '@core/components/ui/typography';
import { Card, CardContent } from '@core/components/ui/card';

export const QuoteCard = () => {
  return (
    <Card className="rounded-2xl bg-primary text-primary-foreground">
      <CardContent className="flex items-center justify-between gap-3 px-5 py-4">
        <div className="flex flex-col gap-2">
          <Typography
            variant="p"
            className="italic text-primary-foreground text-2xl font-heading leading-none"
            as="span"
          >
            "
          </Typography>
          <Typography variant="p" className="italic text-primary-foreground">
            A garden is not made by sitting in the shade.
          </Typography>
          <Typography variant="muted" className="text-primary-foreground/70">
            – Chinese Proverb
          </Typography>
        </div>
        <div className="w-16 h-16 rounded-full bg-primary-foreground/10 flex items-center justify-center text-3xl flex-shrink-0">
          🌸
        </div>
      </CardContent>
    </Card>
  );
};
