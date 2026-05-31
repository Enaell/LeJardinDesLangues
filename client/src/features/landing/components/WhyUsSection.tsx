import { useTranslation } from '@core/hooks';
import { Typography } from '@core/components/ui/typography';
import { Card, CardContent } from '@core/components/ui/card';

type WhyUsItem = {
  bg: string;
  emoji: string;
  titleKey: string;
  descriptionKey: string;
};

const WHY_US_ITEMS: WhyUsItem[] = [
  { bg: 'bg-pink-100', emoji: '🌸', titleKey: 'landing.whyUs.item1.title', descriptionKey: 'landing.whyUs.item1.description' },
  { bg: 'bg-stone-100', emoji: '⚖️', titleKey: 'landing.whyUs.item2.title', descriptionKey: 'landing.whyUs.item2.description' },
  { bg: 'bg-teal-100', emoji: '🍵', titleKey: 'landing.whyUs.item3.title', descriptionKey: 'landing.whyUs.item3.description' },
  { bg: 'bg-emerald-100', emoji: '🌟', titleKey: 'landing.whyUs.item4.title', descriptionKey: 'landing.whyUs.item4.description' },
];

export const WhyUsSection = () => {
  const { t } = useTranslation();

  return (
    <section className="py-16 px-6 md:px-16 lg:px-24 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Typography variant="h2" className="mb-3">
            {t('landing.whyUs.title')}
          </Typography>
          <div className="w-12 h-1 bg-primary rounded-full mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_US_ITEMS.map((item) => (
            <Card key={item.titleKey} className="hover:shadow-md transition-shadow">
              <CardContent className="flex flex-col items-center text-center gap-4 py-8 px-6">
                <div
                  className={`w-16 h-16 rounded-full ${item.bg} flex items-center justify-center text-3xl`}
                >
                  {item.emoji}
                </div>
                <Typography variant="h5">{t(item.titleKey)}</Typography>
                <Typography variant="muted">{t(item.descriptionKey)}</Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
