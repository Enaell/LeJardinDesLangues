import { Link } from '@tanstack/react-router';
import { useTranslation } from '@core/hooks';
import { LANDING_NAV_ITEMS, ROUTES } from '@core/routes.config';

export const AppBarLandingNav = () => {
  const { t } = useTranslation();

  const handleScrollTo = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="hidden md:flex items-center gap-1 flex-grow">
      {LANDING_NAV_ITEMS.map((item) => (
        <button
          key={item.sectionId}
          onClick={() => handleScrollTo(item.sectionId)}
          className="text-white/90 hover:text-white hover:bg-white/10 px-4 py-2 rounded-md text-sm font-medium transition-all"
        >
          {t(item.translationKey)}
        </button>
      ))}
      <div className="ml-auto flex items-center gap-2">
        <Link
          to={ROUTES.HOME}
          className="text-white/90 hover:text-white hover:bg-white/10 px-4 py-2 rounded-md text-sm font-medium transition-all"
        >
          {t('auth.login.submitButton')}
        </Link>
        <Link
          to={ROUTES.HOME}
          className="bg-white text-primary hover:bg-white/90 rounded-full px-5 py-2 text-sm font-semibold transition-all"
        >
          {t('landing.cta')}
        </Link>
      </div>
    </nav>
  );
};
