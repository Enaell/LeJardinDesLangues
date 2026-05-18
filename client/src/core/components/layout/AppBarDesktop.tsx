import { Link } from '@tanstack/react-router';
import { useTranslation } from '@core/hooks';
import type { NavigationItem } from '@core/routes.config';

type AppBarDesktopProps = {
  navigationItems: NavigationItem[];
};

export const AppBarDesktop = ({ navigationItems }: AppBarDesktopProps) => {
  const { t } = useTranslation();
  const [_homeItem, ...restNavigationItems] = navigationItems;

  return (
    <nav className="hidden md:flex items-center gap-1 flex-grow">
      {restNavigationItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className="px-3 py-1.5 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          {t(item.translationKey)}
        </Link>
      ))}
    </nav>
  );
};
