import { useTranslation } from '@core/hooks';
import { Button } from '@core/components/ui/button';
import { Typography } from '@core/components/ui/typography';
import { FeatureCard } from '@core/components/ui/feature-card';

export const FeaturesSection = () => {
  const { t } = useTranslation();

  return (
    <section id="features" className="py-16 px-6 md:px-16 lg:px-24 bg-muted">
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
              <div className="h-full w-full bg-emerald-100 flex items-center justify-center rounded-t-xl text-4xl">
                🌱
              </div>
            }
            title={t('landing.features.card1.title')}
            description={t('landing.features.card1.description')}
          />
          <FeatureCard
            image={
              <div className="h-full w-full bg-green-100 flex items-center justify-center rounded-t-xl text-4xl">
                🌳
              </div>
            }
            title={t('landing.features.card2.title')}
            description={t('landing.features.card2.description')}
          />
          <FeatureCard
            image={
              <div className="h-full w-full bg-pink-100 flex items-center justify-center rounded-t-xl text-4xl">
                🌸
              </div>
            }
            title={t('landing.features.card3.title')}
            description={t('landing.features.card3.description')}
          />
        </div>
      </div>
    </section>
  );
};
