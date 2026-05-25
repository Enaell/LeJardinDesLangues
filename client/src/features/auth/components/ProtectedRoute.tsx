import { ReactNode } from 'react';
import { useAuth } from '../hooks';
import { useTranslation } from '@core/hooks';

type ProtectedRouteProps = {
  children: ReactNode;
  fallback?: ReactNode;
  requireAuth?: boolean;
};

const DefaultFallback = () => {
  const { t } = useTranslation();
  return <div>{t('auth.status.accessDenied')}</div>;
};

export const ProtectedRoute = ({
  children,
  fallback,
  requireAuth = true
}: ProtectedRouteProps) => {
  const { isAuthenticated, isUnauthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (requireAuth && isUnauthenticated) {
    return <>{fallback || <DefaultFallback />}</>;
  }

  if (!requireAuth && isAuthenticated) {
    return <>{fallback || <DefaultFallback />}</>;
  }

  return <>{children}</>;
};
