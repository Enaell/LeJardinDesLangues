import heroBackground from '@/assets/HeroBackground.png';
import { useTranslation } from '@core/hooks';
import { Button } from '@core/components/ui/button';
import { Typography } from '@core/components/ui/typography';
import { useAuthModalContext } from '@features/auth/components/AuthModalContext';

export const HeroSection = () => {
  const { t } = useTranslation();
  const { openModal } = useAuthModalContext();

  return (
    <section className="relative min-h-[120vh] flex items-center overflow-hidden">
      <img
        src={heroBackground}
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />
      <div className="relative z-10 px-6 md:pl-[10%] md:pr-4 max-w-2xl lg:max-w-4xl lg:self-start lg:pt-[33vh]">
        <Typography variant="h1" className="text-5xl md:text-6xl lg:text-7xl text-white mb-6">
          {t('landing.hero.title')}
        </Typography>
        <Typography variant="lead" className="text-white/80 mb-8 max-w-md">
          {t('landing.hero.subtitle')}
        </Typography>
        <div className="flex flex-col items-start gap-3">
          <Button variant="inverted" size="lg" className="rounded-full px-8 text-base" onClick={() => openModal('register')}>
            {t('landing.hero.cta')}
          </Button>
          <Typography variant="small" className="text-white/60 font-normal">
            {t('landing.hero.ctaSubtext')}
          </Typography>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full z-10">
        <svg
          viewBox="0 0 1400 350"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-48 fill-muted"
        >
          <path d="M 0 250 C 880 360 920 10 1400 60 L 1400 370 L 0 370 Z" />
        </svg>
      </div>
    </section>
  );
};
