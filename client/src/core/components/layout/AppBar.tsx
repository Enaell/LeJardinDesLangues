import { Link } from '@tanstack/react-router';
import { AppBarDesktop } from './AppBarDesktop';
import { AppBarMobile } from './AppBarMobile';
import { useTranslation } from '@core/hooks';
import type { NavigationItem } from '@core/routes.config';
import { useAuth } from '@/features/auth/hooks/useAuth';

type AppBarProps = {
  navigationItems: NavigationItem[];
};

export const AppBar = ({ navigationItems }: AppBarProps) => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();

  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="flex items-center h-14 px-4 max-w-screen-xl mx-auto">
        <Link to="/" className="font-bold text-lg mr-6 flex-shrink-0">
          🌸 {t('app.title')}
        </Link>
        {isAuthenticated && (
          <AppBarDesktop navigationItems={navigationItems} />
        )}
        <div className="ml-auto">
          {isAuthenticated && <AppBarMobile navigationItems={navigationItems} />}
        </div>
      </div>
    </header>
  );
};
