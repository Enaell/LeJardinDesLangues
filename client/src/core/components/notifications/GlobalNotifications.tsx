import { Snackbar, Alert, AlertColor } from '@mui/material';
import { useNotifications, NotificationType } from './NotificationContext';

const getAlertSeverity = (type: NotificationType): AlertColor => {
  switch (type) {
    case 'success':
      return 'success';
    case 'error':
      return 'error';
    case 'warning':
      return 'warning';
    case 'info':
      return 'info';
    default:
      return 'info';
  }
};

export const GlobalNotifications = () => {
  const { notifications, removeNotification } = useNotifications();

  return (
    <>
      {notifications.map((notification, index) => (
        <Snackbar
          key={notification.id}
          open={true}
          autoHideDuration={notification.autoHideDuration}
          onClose={() => removeNotification(notification.id)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          sx={{
            // Décaler les notifications multiples
            mt: index * 7,
          }}
        >
          <Alert
            onClose={() => removeNotification(notification.id)}
            severity={getAlertSeverity(notification.type)}
            variant="filled"
            className="w-full"
          >
            {notification.message}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
};
