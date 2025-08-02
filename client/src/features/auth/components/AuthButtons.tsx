import { Button, Avatar, Menu, MenuItem, Divider } from '@mui/material';
import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { useAuth, useAuthModal, useLogout } from '../hooks';
import { AuthModal } from './AuthModal';

export const AuthButtons = () => {
  const { user, isAuthenticated, isUnauthenticated, isLoading } = useAuth();
  const { isOpen, activeTab, openModal, closeModal, switchTab } = useAuthModal();

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
      <div className="flex items-center space-x-2">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
      </div>
    );
  }

  if (isUnauthenticated) {
    return (
      <>
        <div className="flex items-center space-x-2">
          <Button
            color="inherit"
            variant="outlined"
            size="small"
            onClick={() => openModal('login')}
            className="text-white border-white hover:bg-white hover:text-primary-600"
          >
            Connexion
          </Button>
          <Button
            color="inherit"
            variant="contained"
            size="small"
            onClick={() => openModal('register')}
            className="bg-white text-primary-600 hover:bg-gray-100"
          >
            Inscription
          </Button>
        </div>
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
      <div className="flex items-center">
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
            Mon Profil
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={handleLogout}
            disabled={logout.isPending}
          >
            {logout.isPending ? 'Déconnexion...' : 'Se déconnecter'}
          </MenuItem>
        </Menu>
      </div>
    );
  }

  return null;
};
