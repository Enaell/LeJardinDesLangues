import { useLoginForm, useGoogleAuth } from '../hooks';

export const LoginForm = () => {
  const {
    formData,
    updateField,
    handleSubmit,
    isFormValid,
    isLoading,
    isError,
    error,
  } = useLoginForm();

  const googleAuth = useGoogleAuth();

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div>
        <label htmlFor="emailOrUsername" className="block text-sm font-medium text-gray-700">
          Email ou nom d'utilisateur
        </label>
        <input
          id="emailOrUsername"
          type="text"
          value={formData.emailOrUsername}
          onChange={(e) => updateField('emailOrUsername', e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="votre.email@exemple.com"
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Mot de passe
        </label>
        <input
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) => updateField('password', e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Votre mot de passe"
          required
        />
      </div>

      {isError && error && (
        <div className="text-red-600 text-sm">
          {error.message}
        </div>
      )}

      <div className="space-y-3">
        <button
          type="submit"
          disabled={!isFormValid || isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Connexion...' : 'Se connecter'}
        </button>

        <button
          type="button"
          onClick={() => googleAuth.mutate()}
          disabled={googleAuth.isPending}
          className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {googleAuth.isPending ? 'Redirection...' : 'Continuer avec Google'}
        </button>
      </div>
    </form>
  );
};
