import { useRegisterForm, useAuthValidation } from '../hooks';

export const RegisterForm = () => {
  const {
    formData,
    updateField,
    handleSubmit,
    isFormValid,
    isLoading,
    isError,
    error,
  } = useRegisterForm();

  const {
    validateUsername,
    validateEmail,
    validatePassword,
    validateName,
  } = useAuthValidation();

  // États des erreurs de validation
  const usernameError = formData.username ? validateUsername(formData.username) : null;
  const emailError = formData.email ? validateEmail(formData.email) : null;
  const passwordError = formData.password ? validatePassword(formData.password) : null;
  const nameError = formData.name ? validateName(formData.name) : null;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          Nom d'utilisateur
        </label>
        <input
          id="username"
          type="text"
          value={formData.username}
          onChange={(e) => updateField('username', e.target.value)}
          className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${usernameError ? 'border-red-300' : 'border-gray-300'
            }`}
          placeholder="johndoe"
          required
        />
        {usernameError && (
          <p className="mt-1 text-sm text-red-600">{usernameError}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => updateField('email', e.target.value)}
          className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${emailError ? 'border-red-300' : 'border-gray-300'
            }`}
          placeholder="john.doe@exemple.com"
          required
        />
        {emailError && (
          <p className="mt-1 text-sm text-red-600">{emailError}</p>
        )}
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
          className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${passwordError ? 'border-red-300' : 'border-gray-300'
            }`}
          placeholder="MonMotDePasse123!"
          required
        />
        {passwordError && (
          <p className="mt-1 text-sm text-red-600">{passwordError}</p>
        )}
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nom complet
        </label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => updateField('name', e.target.value)}
          className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${nameError ? 'border-red-300' : 'border-gray-300'
            }`}
          placeholder="John Doe"
          required
        />
        {nameError && (
          <p className="mt-1 text-sm text-red-600">{nameError}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="nativeLanguage" className="block text-sm font-medium text-gray-700">
            Langue native
          </label>
          <select
            id="nativeLanguage"
            value={formData.nativeLanguage}
            onChange={(e) => updateField('nativeLanguage', e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="fr">Français</option>
            <option value="en">Anglais</option>
            <option value="zh">Chinois</option>
            <option value="es">Espagnol</option>
          </select>
        </div>

        <div>
          <label htmlFor="targetLanguage" className="block text-sm font-medium text-gray-700">
            Langue à apprendre
          </label>
          <select
            id="targetLanguage"
            value={formData.targetLanguage}
            onChange={(e) => updateField('targetLanguage', e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="zh">Chinois</option>
            <option value="fr">Français</option>
            <option value="en">Anglais</option>
            <option value="es">Espagnol</option>
          </select>
        </div>
      </div>

      {isError && error && (
        <div className="text-red-600 text-sm">
          {error.message}
        </div>
      )}

      <button
        type="submit"
        disabled={!isFormValid || isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Inscription...' : 'S\'inscrire'}
      </button>
    </form>
  );
};
