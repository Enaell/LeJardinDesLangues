import { useTranslation } from '@core/hooks';
import { Typography } from '@core/components/ui/typography';

type Language = {
  bg: string;
  emoji: string;
  labelKey: string;
};

const LANGUAGES: Language[] = [
  { bg: 'bg-red-100', emoji: '🏯', labelKey: 'landing.languages.japanese' },
  { bg: 'bg-orange-100', emoji: '🏛️', labelKey: 'landing.languages.korean' },
  { bg: 'bg-yellow-100', emoji: '🎋', labelKey: 'landing.languages.chinese' },
  { bg: 'bg-blue-100', emoji: '🗼', labelKey: 'landing.languages.french' },
  { bg: 'bg-amber-100', emoji: '🌞', labelKey: 'landing.languages.spanish' },
  { bg: 'bg-gray-100', emoji: '🌿', labelKey: 'landing.languages.more' },
];

export const LanguagesSection = () => {
  const { t } = useTranslation();

  return (
    <section id="languages" className="py-16 px-6 md:px-16 lg:px-24 bg-muted">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Typography variant="h2" className="mb-3">
            {t('landing.languages.title')}
          </Typography>
          <div className="w-12 h-1 bg-primary rounded-full mx-auto" />
        </div>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-6 justify-items-center">
          {LANGUAGES.map((lang) => (
            <div key={lang.labelKey} className="flex flex-col items-center gap-2">
              <div
                className={`w-24 h-24 rounded-2xl ${lang.bg} flex items-center justify-center text-4xl`}
              >
                {lang.emoji}
              </div>
              <Typography variant="small">{t(lang.labelKey)}</Typography>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
