import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Menu, X } from 'lucide-react';
import { useTranslation } from '@core/hooks';
import { LANDING_NAV_ITEMS, ROUTES } from '@core/routes.config';
import { Button, buttonVariants } from '@core/components/ui/button';
import { cn } from '@/lib/utils';

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
      <Button
        variant="ghost-white"
        size="icon"
        aria-label={t('common.menu')}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>
      {open && (
        <div className="absolute right-0 top-full mt-1 w-52 rounded-md border border-white/20 bg-primary/95 shadow-md z-50 backdrop-blur-sm">
          {LANDING_NAV_ITEMS.map((item) => (
            <Button
              key={item.sectionId}
              variant="ghost-white"
              className="w-full justify-start h-auto py-3 rounded-none first:rounded-t-md"
              onClick={() => handleScrollTo(item.sectionId)}
            >
              {t(item.translationKey)}
            </Button>
          ))}
          <div className="border-t border-white/20 p-3 flex flex-col gap-2">
            <Link
              to={ROUTES.HOME}
              onClick={() => setOpen(false)}
              className={cn(buttonVariants({ variant: 'ghost-white', size: 'sm' }), 'justify-center')}
            >
              {t('auth.login.submitButton')}
            </Link>
            <Link
              to={ROUTES.HOME}
              onClick={() => setOpen(false)}
              className={cn(buttonVariants({ variant: 'inverted', size: 'sm' }), 'rounded-full justify-center')}
            >
              {t('landing.cta')}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
