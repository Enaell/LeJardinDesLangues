import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Menu, X } from 'lucide-react';
import { useTranslation } from '@core/hooks';
import { LANDING_NAV_ITEMS, ROUTES } from '@core/routes.config';

export const AppBarLandingNavMobile = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const handleScrollTo = (sectionId: string) => {
    setOpen(false);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex md:hidden relative">
      <button
        aria-label={t('common.menu')}
        onClick={() => setOpen((v) => !v)}
        className="p-2 rounded-md text-white hover:bg-white/10 transition-all"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 w-52 rounded-md border border-white/20 bg-primary/95 shadow-md z-50 backdrop-blur-sm">
          {LANDING_NAV_ITEMS.map((item) => (
            <button
              key={item.sectionId}
              onClick={() => handleScrollTo(item.sectionId)}
              className="flex w-full items-center px-4 py-3 text-sm text-white/90 hover:text-white hover:bg-white/10 transition-all"
            >
              {t(item.translationKey)}
            </button>
          ))}
          <div className="border-t border-white/20 p-3 flex flex-col gap-2">
            <Link
              to={ROUTES.HOME}
              onClick={() => setOpen(false)}
              className="text-center text-white/90 hover:text-white px-4 py-2 text-sm font-medium transition-all"
            >
              {t('auth.login.submitButton')}
            </Link>
            <Link
              to={ROUTES.HOME}
              onClick={() => setOpen(false)}
              className="text-center bg-white text-primary hover:bg-white/90 rounded-full px-4 py-2 text-sm font-semibold transition-all"
            >
              {t('landing.cta')}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
