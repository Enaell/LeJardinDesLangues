import { useAuth, useLogout } from '../hooks';

export const AuthStatus = () => {
  const { user, isAuthenticated, isUnauthenticated, isLoading } = useAuth();
  const logout = useLogout();

  const handleLogout = () => {
    logout.mutate();
  };

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600"></div>
        <span className="text-sm text-gray-600">Chargement...</span>
      </div>
    );
  }

  if (isUnauthenticated) {
    return (
      <div className="text-sm text-gray-600">
        Non connecté
      </div>
    );
  }

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="h-8 w-8 rounded-full"
            />
          ) : (
            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
              <span className="text-sm font-medium text-indigo-600">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-500">@{user.username}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          disabled={logout.isPending}
          className="text-sm text-gray-600 hover:text-gray-900 disabled:opacity-50"
        >
          {logout.isPending ? 'Déconnexion...' : 'Se déconnecter'}
        </button>
      </div>
    );
  }

  return null;
};
