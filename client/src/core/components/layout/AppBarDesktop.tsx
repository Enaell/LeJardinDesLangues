import { Link } from '@tanstack/react-router';
import { Button } from '@mui/material';
import { useTranslation } from '@core/hooks';
import { FlexRow } from '@core/components';
import type { NavigationItem } from '@core/routes.config';

type AppBarDesktopProps = {
  navigationItems: NavigationItem[];
};

export const AppBarDesktop = ({ navigationItems }: AppBarDesktopProps) => {
  const { t } = useTranslation();
  const [_homeItem, ...restNavigationItems] = navigationItems;

  return (
    <FlexRow className="hidden md:flex" spacing={1}>
      {restNavigationItems.map((item) => (
        <Button
          key={item.path}
          component={Link}
          to={item.path}
          color="inherit"
        >
          {t(item.translationKey)}
        </Button>
      ))}
    </FlexRow>
  );
};
