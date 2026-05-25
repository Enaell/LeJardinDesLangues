import heroBackground from '@/assets/HeroBackground.png';
import { useTranslation } from '@core/hooks';

export const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <img
        src={heroBackground}
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />
      <div className="relative z-10 px-6 md:pl-[10%] md:pr-4 max-w-2xl">
        <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
          {t('landing.hero.title')}
        </h1>
        <p className="text-lg text-white/80 mb-8 max-w-md leading-relaxed">
          {t('landing.hero.subtitle')}
        </p>
        <div className="flex flex-col items-start gap-3">
          <button className="bg-white text-primary font-semibold px-8 py-3 rounded-full text-base hover:bg-white/90 transition-all duration-200 shadow-lg">
            {t('landing.hero.cta')}
          </button>
          <p className="text-sm text-white/60">
            {t('landing.hero.ctaSubtext')}
          </p>
        </div>
      </div>
    </section>
  );
};
