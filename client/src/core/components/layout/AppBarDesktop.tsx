import { Link } from '@tanstack/react-router';
import { Button } from '@mui/material';
import { useTranslation } from '@core/hooks';
import type { NavigationItem } from '@core/routes.config';

type AppBarDesktopProps = {
  navigationItems: NavigationItem[];
};

export const AppBarDesktop = ({ navigationItems }: AppBarDesktopProps) => {
  const { t } = useTranslation();
  const [_homeItem, ...restNavigationItems] = navigationItems;

  return (
    <div className="hidden md:flex">
      {restNavigationItems.map((item) => (
        <Button
          key={item.path}
          component={Link}
          to={item.path}
          color="inherit"
          className="ml-2"
        >
          {t(item.translationKey)}
        </Button>
      ))}
    </div>
  );
};
