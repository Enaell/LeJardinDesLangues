import { Link } from '@tanstack/react-router';
import { useTranslation } from '@core/hooks';
import { APP_NAV_ITEMS } from '@core/routes.config';

export const AppBarDesktop = () => {
  const { t } = useTranslation();

  return (
    <nav className="hidden md:flex items-center gap-1 flex-grow">
      {APP_NAV_ITEMS.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10 px-3 py-1.5 rounded-md text-sm font-medium transition-all"
        >
          {t(item.translationKey)}
        </Link>
      ))}
    </nav>
  );
};
