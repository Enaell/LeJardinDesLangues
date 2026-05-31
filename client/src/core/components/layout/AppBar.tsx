import { Link, useRouterState } from '@tanstack/react-router';
import { AppBarDesktop } from './AppBarDesktop';
import { AppBarMobile } from './AppBarMobile';
import { AppBarLandingNav } from './AppBarLandingNav';
import { AppBarLandingNavMobile } from './AppBarLandingNavMobile';
import { useTranslation } from '@core/hooks';
import { useAuth } from '@/features/auth/hooks/useAuth';
import logo from '@/assets/Logo2.png';

export const AppBar = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth();
  const { location } = useRouterState();
  const isLandingPage = location.pathname === '/';

  if (isLandingPage) {
    return (
      <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
        <div className="flex items-center h-20 px-8 w-full">
          <Link to="/" className="font-logo  font-semibold text-2xl mr-6 flex-shrink-0 flex items-center gap-2 text-white tracking-wide">
            <img src={logo} alt={t('app.title')} className="h-10 w-auto" />
            {t('app.title')}
          </Link>
          <AppBarLandingNav />
          <div className="ml-auto">
            <AppBarLandingNavMobile />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-primary sticky top-0 z-50 shadow-sm">
      <div className="flex items-center h-20 px-4 max-w-screen-xl mx-auto">
        <Link to="/" className="font-logo italic font-semibold text-2xl mr-6 flex-shrink-0 flex items-center gap-2 text-primary-foreground tracking-wide">
          <img src={logo} alt={t('app.title')} className="h-10 w-auto" />
          {t('app.title')}
        </Link>
        {isAuthenticated && <AppBarDesktop />}
        <div className="ml-auto">
          {isAuthenticated && <AppBarMobile />}
        </div>
      </div>
    </header>
  );
};
