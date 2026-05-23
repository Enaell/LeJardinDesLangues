import { cn } from "@/lib/utils";

type StepperProps = {
  steps: number;
  currentStep: number;
  className?: string;
};

export const Stepper = ({ steps, currentStep, className }: StepperProps) => {
  return (
    <div
      role="list"
      aria-label="Progress steps"
      className={cn('flex items-center', className)}
    >
      {Array.from({ length: steps }, (_, i) => {
        const isPast = i < currentStep;
        const isCurrent = i === currentStep;

        return (
          <div key={i} role="listitem" className="flex items-center">
            {/* Step circle */}
            <div
              aria-current={isCurrent ? 'step' : undefined}
              className={cn(
                'flex size-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors',
                isPast || isCurrent
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-background text-muted-foreground'
              )}
            >
              {i + 1}
            </div>

            {/* Connector line */}
            {i < steps - 1 && (
              <div
                className={cn(
                  'h-0.5 w-8 transition-colors',
                  i < currentStep ? 'bg-primary' : 'bg-border border-dashed'
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
