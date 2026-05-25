import { cn } from "@/lib/utils";
import { Button } from "@core/components/ui/button";
import { Typography } from "@core/components/ui/typography";

type CtaBannerProps = {
  title: string;
  description?: string;
  ctaLabel: string;
  onCtaClick?: () => void;
  backgroundImage?: string;
  className?: string;
  children?: React.ReactNode;
};

export const CtaBanner = ({
  title,
  description,
  ctaLabel,
  onCtaClick,
  backgroundImage,
  className,
  children,
}: CtaBannerProps) => {
  return (
    <section
      className={cn(
        'relative overflow-hidden rounded-2xl bg-gradient-to-br from-secondary to-accent px-8 py-12 text-center',
        className
      )}
      style={
        backgroundImage
          ? {
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }
          : undefined
      }
    >
      {/* Overlay when backgroundImage is set */}
      {backgroundImage && (
        <div className="absolute inset-0 bg-background/70" aria-hidden />
      )}

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center gap-4">
        <Typography variant="h3" className="sm:text-3xl">
          {title}
        </Typography>
        {description && (
          <Typography variant="muted" className="sm:text-base">
            {description}
          </Typography>
        )}
        <Button size="lg" onClick={onCtaClick} className="mt-2">
          {ctaLabel}
        </Button>
        {children}
      </div>
    </section>
  );
};
