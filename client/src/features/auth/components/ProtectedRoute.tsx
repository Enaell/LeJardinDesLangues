import { ReactNode } from 'react';
import { useAuth } from '../hooks';

type ProtectedRouteProps = {
  children: ReactNode;
  fallback?: ReactNode;
  requireAuth?: boolean;
};

export const ProtectedRoute = ({
  children,
  fallback = <div>Accès non autorisé</div>,
  requireAuth = true
}: ProtectedRouteProps) => {
  const { isAuthenticated, isUnauthenticated, isLoading } = useAuth();

  // Afficher un indicateur de chargement pendant la vérification
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Si l'authentification est requise mais l'utilisateur n'est pas connecté
  if (requireAuth && isUnauthenticated) {
    return <>{fallback}</>;
  }

  // Si l'authentification n'est pas requise mais l'utilisateur est connecté
  // (ex: pages de login/register)
  if (!requireAuth && isAuthenticated) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
