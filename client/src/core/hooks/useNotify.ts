import { useNotifications } from '../components/notifications/NotificationContext';
import { useTranslation } from './useTranslation';

export const useNotify = () => {
  const { addNotification } = useNotifications();
  const { t } = useTranslation();

  const notifySuccess = (message: string, autoHideDuration?: number) => {
    addNotification({
      message,
      type: 'success',
      autoHideDuration,
    });
  };

  const notifyError = (message: string, autoHideDuration?: number) => {
    addNotification({
      message,
      type: 'error',
      autoHideDuration,
    });
  };

  const notifyWarning = (message: string, autoHideDuration?: number) => {
    addNotification({
      message,
      type: 'warning',
      autoHideDuration,
    });
  };

  const notifyInfo = (message: string, autoHideDuration?: number) => {
    addNotification({
      message,
      type: 'info',
      autoHideDuration,
    });
  };

  // Fonction spécialisée pour les erreurs API
  const notifyApiError = (error: unknown, fallbackMessage?: string) => {
    let message = fallbackMessage || t('errors.api.generic');

    if (error && typeof error === 'object') {
      // Gestion des erreurs TanStack Query
      if ('message' in error && typeof error.message === 'string') {
        message = error.message;
      }
      // Gestion des erreurs HTTP avec status code
      else if ('statusCode' in error) {
        const statusCode = error.statusCode as number;
        switch (statusCode) {
          case 400:
            message = t('errors.api.badRequest');
            break;
          case 401:
            message = t('errors.api.unauthorized');
            break;
          case 403:
            message = t('errors.api.forbidden');
            break;
          case 404:
            message = t('errors.api.notFound');
            break;
          case 500:
            message = t('errors.api.serverError');
            break;
          default:
            message = t('errors.api.generic');
        }
      }
      // Gestion des erreurs réseau
      else if ('name' in error && error.name === 'NetworkError') {
        message = t('errors.api.network');
      }
    }

    notifyError(message, 8000); // Erreurs restent plus longtemps
  };

  return {
    notifySuccess,
    notifyError,
    notifyWarning,
    notifyInfo,
    notifyApiError,
  };
};
