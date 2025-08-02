import { Button, Avatar, Menu, MenuItem, Divider, CircularProgress } from '@mui/material';
import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { useAuthModal, useLogout } from '../hooks';
import { AuthModal } from './AuthModal';
import { FlexRow } from '@/core';
import { useTranslation } from '@core/hooks';
import { User } from '../types';

export const AuthButtons = ({
  user,
  isLoading,
  isAuthenticated,
  isUnauthenticated
}: {
  user?: User,
  isLoading: boolean,
  isAuthenticated: boolean,
  isUnauthenticated: boolean;
}) => {
  const { isOpen, activeTab, openModal, closeModal, switchTab } = useAuthModal();
  const { t } = useTranslation();

  const logout = useLogout();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout.mutate();
    handleMenuClose();
  };

  if (isLoading) {
    return (
      <FlexRow alignItems="center" spacing={2}>
        <CircularProgress />
      </FlexRow>
    );
  }

  if (isUnauthenticated) {
    return (
      <>
        <FlexRow alignItems="center" spacing={2}>
          <Button
            color="inherit"
            variant="outlined"
            size="small"
            onClick={() => openModal('login')}
            className="text-white border-white hover:bg-white hover:text-primary-600"
          >
            {t('auth.login.title')}
          </Button>
          <Button
            color="inherit"
            variant="contained"
            size="small"
            onClick={() => openModal('register')}
            className="bg-white text-primary-600 hover:bg-gray-100"
          >
            {t('auth.register.title')}
          </Button>
        </FlexRow>
        <AuthModal
          isOpen={isOpen}
          activeTab={activeTab}
          onClose={closeModal}
          onTabChange={switchTab}
        />
      </>
    );
  }

  if (isAuthenticated && user) {
    return (
      <FlexRow alignItems='center'>
        <Button
          onClick={handleMenuClick}
          color="inherit"
          startIcon={
            user.avatarUrl ? (
              <Avatar
                src={user.avatarUrl}
                alt={user.name}
                sx={{ width: 32, height: 32 }}
              />
            ) : (
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'white', color: 'primary.main' }}>
                {user.name.charAt(0).toUpperCase()}
              </Avatar>
            )
          }
          className="text-white"
        >
          {user.name}
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={!!anchorEl}
          onClose={handleMenuClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>
            {t('navigation.profile')}
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={handleLogout}
            disabled={logout.isPending}
          >
            {logout.isPending ? t('auth.status.loggingOut') : t('auth.status.logout')}
          </MenuItem>
        </Menu>
      </FlexRow>
    );
  }

  return null;
};
