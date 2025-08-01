import type { User } from '../../auth/types/user';

export type ProfileProps = {
  user: User;
};

export const Profile = ({ user }: ProfileProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-xl mx-auto">
      <div className="flex items-center mb-4">
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt={user.username}
            className="w-16 h-16 rounded-full mr-4 border"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-200 mr-4 flex items-center justify-center text-2xl text-gray-500">
            {user.name?.[0] || user.username?.[0]}
          </div>
        )}
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{user.name || user.username}</h2>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <span className="font-medium text-gray-700">Langue native :</span>
          <span className="ml-2 text-gray-900">{user.nativeLanguage}</span>
        </div>
        <div>
          <span className="font-medium text-gray-700">Langue cible :</span>
          <span className="ml-2 text-gray-900">{user.targetLanguage}</span>
        </div>
        <div>
          <span className="font-medium text-gray-700">Rôle :</span>
          <span className="ml-2 text-gray-900">{user.role}</span>
        </div>
        <div>
          <span className="font-medium text-gray-700">Inscrit le :</span>
          <span className="ml-2 text-gray-900">{new Date(user.createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};
