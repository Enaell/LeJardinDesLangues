import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTranslation } from '@core/hooks';
import { FlexRow } from '@core/components';
import type { NavigationItem } from '@core/routes.config';

type AppBarMobileProps = {
  navigationItems: NavigationItem[];
};

export const AppBarMobile = ({ navigationItems }: AppBarMobileProps) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <FlexRow className="flex md:hidden">
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label={t('common.menu')}
        onClick={handleMenuClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
      >
        {navigationItems.map((item) => (
          <MenuItem
            key={item.path}
            component={Link}
            to={item.path}
            onClick={handleMenuClose}
          >
            {item.icon} {t(item.translationKey)}
          </MenuItem>
        ))}
      </Menu>
    </FlexRow>
  );
};
