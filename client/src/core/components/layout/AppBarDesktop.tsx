import { Link } from '@tanstack/react-router';
import { Button } from '@mui/material';

type AppBarDesktopProps = {
  navigationItems: Array<{ label: string; path: string; }>;
};

export const AppBarDesktop = ({ navigationItems }: AppBarDesktopProps) => {
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
          {item.label}
        </Button>
      ))}
    </div>
  );
};
