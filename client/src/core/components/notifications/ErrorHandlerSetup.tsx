import { useEffect, ReactNode } from 'react';
import { useNotify } from '@core/hooks';
import { useTranslation } from '@core/hooks';

type ErrorHandlerSetupProps = {
  children: ReactNode;
};

export const ErrorHandlerSetup = ({ children }: ErrorHandlerSetupProps) => {
  const { notifyApiError } = useNotify();
  const { t } = useTranslation();

  useEffect(() => {
    // Configuration des intercepteurs globaux d'erreurs une fois le système de notifications prêt
    // Note: Pour TanStack Query, nous pouvons aussi configurer les erreurs directement 
    // dans les hooks personnalisés ou via des callbacks onError

    // Intercepteur global pour les erreurs non gérées
    const handleUnhandledError = (event: ErrorEvent) => {
      console.error('Unhandled error:', event.error);
      notifyApiError(event.error, t('errors.unexpected'));
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', event.reason);
      notifyApiError(event.reason, t('errors.unexpected'));
    };

    // Ajouter les listeners d'erreurs globales
    window.addEventListener('error', handleUnhandledError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    // Cleanup
    return () => {
      window.removeEventListener('error', handleUnhandledError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, [notifyApiError, t]);

  return <>{children}</>;
};
