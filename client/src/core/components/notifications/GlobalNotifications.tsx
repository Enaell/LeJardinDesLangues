import { X } from 'lucide-react';
import { useNotifications, type NotificationType } from './NotificationContext';

const typeClasses: Record<NotificationType, string> = {
  success: 'bg-green-600 text-white',
  error: 'bg-destructive text-destructive-foreground',
  warning: 'bg-yellow-500 text-white',
  info: 'bg-blue-600 text-white',
};

export const GlobalNotifications = () => {
  const { notifications, removeNotification } = useNotifications();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 w-80">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`flex items-start gap-3 rounded-md px-4 py-3 shadow-md ${typeClasses[notification.type]
            }`}
        >
          <span className="flex-grow text-sm">{notification.message}</span>
          <button
            aria-label="Fermer"
            onClick={() => removeNotification(notification.id)}
            className="flex-shrink-0 opacity-80 hover:opacity-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
