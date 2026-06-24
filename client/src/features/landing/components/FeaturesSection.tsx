import { useTranslation } from '@core/hooks';
import { Button } from '@core/components/ui/button';
import { Typography } from '@core/components/ui/typography';
import { FeatureCard } from '@core/components/ui/feature-card';
import sproutImg from '@/assets/landingPage/sprout.png';
import branchImg from '@/assets/landingPage/branch.png';
import lotusImg from '@/assets/landingPage/lotus_flower.png';
import lanternImg from '@/assets/landingPage/lantern_flowers.png';
import glissineImg from '@/assets/landingPage/glissine.png';

export const FeaturesSection = () => {
  const { t } = useTranslation();

  return (
    <section id="features" className="relative overflow-hidden pb-16 pt-100 mt-[-352px] px-6 md:px-16 lg:px-24 bg-muted z-1">
      <img
        src={lanternImg}
        alt=""
        aria-hidden
        className="pointer-events-none select-none absolute -left-6 bottom-0 w-36 md:w-44 lg:w-52 opacity-90"
      />
      {/* Decorative wisteria — top right */}
      <img
        src={glissineImg}
        alt=""
        aria-hidden
        className="pointer-events-none select-none absolute -right-4 top-0 w-40 md:w-52 lg:w-64 opacity-90"
      />
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left column */}
        <div className="flex flex-col gap-6">
          <div>
            <Typography variant="h2" className="mb-3">
              {t('landing.features.heading')}
            </Typography>
            <div className="w-12 h-1 bg-primary rounded-full" />
          </div>
          <Typography variant="p" className="text-muted-foreground max-w-md">
            {t('landing.features.description')}
          </Typography>
          <Button variant="default" size="lg" className="w-fit rounded-full">
            {t('landing.features.cta')}
          </Button>
        </div>

        {/* Right column: 3 feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <FeatureCard
            image={
              <img src={sproutImg} alt="" className="h-full w-full object-contain rounded-t-xl" />
            }
            title={t('landing.features.card1.title')}
            description={t('landing.features.card1.description')}
          />
          <FeatureCard
            image={
              <img src={branchImg} alt="" className="h-full w-full object-contain rounded-t-xl" />
            }
            title={t('landing.features.card2.title')}
            description={t('landing.features.card2.description')}
          />
          <FeatureCard
            image={
              <img src={lotusImg} alt="" className="h-full w-full object-contain rounded-t-xl" />
            }
            title={t('landing.features.card3.title')}
            description={t('landing.features.card3.description')}
          />
        </div>
      </div>
    </section>
  );
};
