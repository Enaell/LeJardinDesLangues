import { ReactNode, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useAuth } from '../hooks';

type ProtectedRouteProps = {
  children: ReactNode;
  requireAuth?: boolean;
};

export const ProtectedRoute = ({ children, requireAuth = false }: ProtectedRouteProps) => {
  const { isAuthenticated, isUnauthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;
    if (requireAuth && isUnauthenticated) {
      navigate({ to: '/' });
    } else if (!requireAuth && isAuthenticated) {
      navigate({ to: '/dashboard' });
    }
  }, [isLoading, requireAuth, isAuthenticated, isUnauthenticated, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (requireAuth && isUnauthenticated) return null;
  if (!requireAuth && isAuthenticated) return null;

  return <>{children}</>;
};
