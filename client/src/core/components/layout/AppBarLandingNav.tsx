import { Link } from '@tanstack/react-router';
import { useTranslation } from '@core/hooks';
import { LANDING_NAV_ITEMS, ROUTES } from '@core/routes.config';
import { Button, buttonVariants } from '@core/components/ui/button';
import { cn } from '@/lib/utils';

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
        <Button
          key={item.sectionId}
          variant="ghost-white"
          size="sm"
          onClick={() => handleScrollTo(item.sectionId)}
        >
          {t(item.translationKey)}
        </Button>
      ))}
      <div className="ml-auto flex items-center gap-2">
        <Link
          to={ROUTES.HOME}
          className={cn(buttonVariants({ variant: 'ghost-white', size: 'sm' }))}
        >
          {t('auth.login.submitButton')}
        </Link>
        <Link
          to={ROUTES.HOME}
          className={cn(buttonVariants({ variant: 'inverted', size: 'sm' }), 'rounded-full px-5')}
        >
          {t('landing.cta')}
        </Link>
      </div>
    </nav>
  );
};
