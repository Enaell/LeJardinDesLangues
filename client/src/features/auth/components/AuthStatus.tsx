import { useAuth, useLogout } from '../hooks';
import { useTranslation } from '@core/hooks';
import { FlexRow, FlexColumn, CachedAvatar } from '@/core';
import { Box } from '@mui/material';

export const AuthStatus = () => {
  const { user, isAuthenticated, isUnauthenticated, isLoading } = useAuth();
  const logout = useLogout();
  const { t } = useTranslation();

  const handleLogout = () => {
    logout.mutate();
  };

  if (isLoading) {
    return (
      <FlexRow alignItems="center" spacing={2}>
        <Box className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600" />
        <span className="text-sm text-gray-600">{t('common.loading')}</span>
      </FlexRow>
    );
  }

  if (isUnauthenticated) {
    return (
      <Box className="text-sm text-gray-600">
        {t('auth.status.notConnected')}
      </Box>
    );
  }

  if (isAuthenticated && user) {
    return (
      <FlexRow alignItems="center" spacing={4}>
        <FlexRow alignItems="center" spacing={2}>
          <CachedAvatar
            src={user.avatarUrl}
            alt={user.name}
            fallbackText={user.name.charAt(0).toUpperCase()}
            sx={{ width: 32, height: 32 }}
          />
          <FlexColumn>
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-500">@{user.username}</p>
          </FlexColumn>
        </FlexRow>

        <button
          onClick={handleLogout}
          disabled={logout.isPending}
          className="text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50"
        >
          {logout.isPending ? t('auth.status.loggingOut') : t('auth.status.logout')}
        </button>
      </FlexRow>
    );
  }

  return null;
};
