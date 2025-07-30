import { Link } from '@tanstack/react-router';
import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography
} from '@mui/material';
import { AppBarDesktop } from './AppBarDesktop';
import { AppBarMobile } from './AppBarMobile';
import { AuthButtons } from '../../../features/auth/components/AuthButtons';
import { AuthModal } from '../../../features/auth/components';
import { useAuthModal } from '../../../features/auth/hooks';

type AppBarProps = {
  navigationItems: Array<{ label: string; path: string; }>;
};

export const AppBar = ({ navigationItems }: AppBarProps) => {
  const { isOpen, activeTab, openModal, closeModal, switchTab } = useAuthModal();

  return (
    <>
      <MuiAppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            className="flex-grow font-bold text-inherit no-underline"
            color='primary.contrastText'
          >
            🌸 Le Jardin des Langues
          </Typography>

          <AppBarDesktop navigationItems={navigationItems} />
          <AppBarMobile navigationItems={navigationItems} />

          <AuthButtons onOpenAuthModal={openModal} />
        </Toolbar>
      </MuiAppBar>

      <AuthModal
        isOpen={isOpen}
        activeTab={activeTab}
        onClose={closeModal}
        onTabChange={switchTab}
      />
    </>
  );
};
