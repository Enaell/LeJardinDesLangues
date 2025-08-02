import { ReactNode } from 'react';
import { useAuth } from '../hooks';
import { useTranslation } from '@core/hooks';
import { CircularProgress } from '@mui/material';

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

  // Afficher un indicateur de chargement pendant la vérification
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <CircularProgress />
      </div>
    );
  }

  // Si l'authentification est requise mais l'utilisateur n'est pas connecté
  if (requireAuth && isUnauthenticated) {
    return <>{fallback || <DefaultFallback />}</>;
  }

  // Si l'authentification n'est pas requise mais l'utilisateur est connecté
  // (ex: pages de login/register)
  if (!requireAuth && isAuthenticated) {
    return <>{fallback || <DefaultFallback />}</>;
  }

  return <>{children}</>;
};
