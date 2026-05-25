import { Link } from '@tanstack/react-router';
import { useTranslation } from '@core/hooks';
import { APP_NAV_ITEMS } from '@core/routes.config';
import { buttonVariants } from '@core/components/ui/button';
import { cn } from '@/lib/utils';

export const AppBarDesktop = () => {
  const { t } = useTranslation();

  return (
    <nav className="hidden md:flex items-center gap-1 flex-grow">
      {APP_NAV_ITEMS.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={cn(
            buttonVariants({ variant: 'ghost', size: 'sm' }),
            'text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10'
          )}
        >
          {t(item.translationKey)}
        </Link>
      ))}
    </nav>
  );
};
