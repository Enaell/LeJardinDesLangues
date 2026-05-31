import { useTranslation } from '@core/hooks';
import { Typography } from '@core/components/ui/typography';

type Step = {
  number: number;
  bg: string;
  titleKey: string;
  descriptionKey: string;
};

const STEPS: Step[] = [
  { number: 1, bg: 'bg-emerald-100', titleKey: 'landing.howItWorks.step1.title', descriptionKey: 'landing.howItWorks.step1.description' },
  { number: 2, bg: 'bg-teal-100', titleKey: 'landing.howItWorks.step2.title', descriptionKey: 'landing.howItWorks.step2.description' },
  { number: 3, bg: 'bg-green-200', titleKey: 'landing.howItWorks.step3.title', descriptionKey: 'landing.howItWorks.step3.description' },
  { number: 4, bg: 'bg-emerald-200', titleKey: 'landing.howItWorks.step4.title', descriptionKey: 'landing.howItWorks.step4.description' },
];

export const HowItWorksSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 px-6 md:px-16 lg:px-24 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Typography variant="h2" className="mb-3">
            {t('landing.howItWorks.title')}
          </Typography>
          <div className="w-12 h-1 bg-primary rounded-full mx-auto" />
        </div>

        <div className="relative flex flex-col md:flex-row items-start justify-between gap-8 md:gap-4">
          {/* Dashed connector line (desktop only) */}
          <div
            className="hidden md:block absolute top-16 left-[10%] right-[10%] border-t-2 border-dashed border-primary/40"
            aria-hidden
          />

          {STEPS.map((step) => (
            <div key={step.number} className="relative flex flex-col items-center text-center flex-1 gap-4">
              {/* Circle with badge */}
              <div className="relative">
                <div className={`w-32 h-32 rounded-full ${step.bg} flex items-center justify-center`} />
                <span className="absolute bottom-0 left-0 w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                  {step.number}
                </span>
              </div>
              <Typography variant="h5">{t(step.titleKey)}</Typography>
              <Typography variant="muted" className="max-w-[180px]">
                {t(step.descriptionKey)}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
