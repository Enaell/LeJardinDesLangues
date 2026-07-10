import { useParallax, useTranslation } from '@core/hooks';
import { Typography } from '@core/components/ui/typography';
import bonsai from '@/assets/landingPage/rounded_bonzai.png';
import book from '@/assets/landingPage/rounded_book.png';
import kiosk from '@/assets/landingPage/rounded_kiosk.png';
import wateringCan from '@/assets/landingPage/rounded_watering_can.png';

type Step = {
  number: number;
  image: string;
  titleKey: string;
  descriptionKey: string;
};

const STEPS: Step[] = [
  { number: 1, image: bonsai, titleKey: 'landing.howItWorks.step1.title', descriptionKey: 'landing.howItWorks.step1.description' },
  { number: 2, image: book, titleKey: 'landing.howItWorks.step2.title', descriptionKey: 'landing.howItWorks.step2.description' },
  { number: 3, image: kiosk, titleKey: 'landing.howItWorks.step3.title', descriptionKey: 'landing.howItWorks.step3.description' },
  { number: 4, image: wateringCan, titleKey: 'landing.howItWorks.step4.title', descriptionKey: 'landing.howItWorks.step4.description' },
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
                <img
                  src={step.image}
                  alt=""
                  className="w-48 h-48 rounded-full object-cover"
                  aria-hidden
                />
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-10 h-10 rounded-full bg-primary text-primary-foreground text-default font-bold flex items-center justify-center border-4 border-surface">
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
