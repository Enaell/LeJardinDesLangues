import { Link } from '@tanstack/react-router';
import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  Box
} from '@mui/material';
import { AppBarDesktop } from './AppBarDesktop';
import { AppBarMobile } from './AppBarMobile';
import { AuthButtons } from '@features/auth/components/AuthButtons';
import { LanguageSelector } from '@core/components/ui';
import { useTranslation } from '@core/hooks';
import type { NavigationItem } from '@core/routes.config';

type AppBarProps = {
  navigationItems: NavigationItem[];
};

export const AppBar = ({ navigationItems }: AppBarProps) => {
  const { t } = useTranslation();

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

          {true && <>
            <AppBarDesktop navigationItems={navigationItems} />
            <AppBarMobile navigationItems={navigationItems} />
          </>}

          <Box className="flex items-center gap-2">
            <LanguageSelector />
            <AuthButtons />
          </Box>
        </Toolbar>
      </MuiAppBar>

    </>
  );
};
