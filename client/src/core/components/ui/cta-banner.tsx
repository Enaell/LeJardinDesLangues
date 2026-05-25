import { cn } from "@/lib/utils";
import { Button } from "@core/components/ui/button";

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
        <h2 className="font-heading text-2xl font-semibold leading-tight sm:text-3xl">
          {title}
        </h2>
        {description && (
          <p className="text-sm text-muted-foreground sm:text-base">
            {description}
          </p>
        )}
        <Button size="lg" onClick={onCtaClick} className="mt-2">
          {ctaLabel}
        </Button>
        {children}
      </div>
    </section>
  );
};
