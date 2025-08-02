import { Link } from '@tanstack/react-router';
import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
} from '@mui/material';
import { AppBarDesktop } from './AppBarDesktop';
import { AppBarMobile } from './AppBarMobile';
import { AuthButtons } from '@features/auth/components/AuthButtons';
import { useTranslation } from '@core/hooks';
import type { NavigationItem } from '@core/routes.config';
import { useAuth } from '@/features/auth/hooks/useAuth';

type AppBarProps = {
  navigationItems: NavigationItem[];
};

export const AppBar = ({ navigationItems }: AppBarProps) => {
  const { t } = useTranslation();

  const { user, isAuthenticated, isUnauthenticated, isLoading } = useAuth();

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
            🌸 {t('app.title')}
          </Typography>

          {isAuthenticated && <>
            <AppBarDesktop navigationItems={navigationItems} />
            <AppBarMobile navigationItems={navigationItems} />
          </>}

          <AuthButtons
            user={user}
            isLoading={isLoading}
            isAuthenticated={isAuthenticated}
            isUnauthenticated={isUnauthenticated}
          />
        </Toolbar>
      </MuiAppBar>

    </>
  );
};
