import {
  Form,
  FormTextField,
  FormPasswordField,
  FormSubmitButton
} from '../index';

// Interface typée pour les données du formulaire
interface LoginFormData {
  email: string;
  password: string;
}

export const TypedLoginFormExample = () => {
  // La fonction onFormSubmit reçoit maintenant des valeurs typées
  const handleSubmit = async ({ value }: { value: LoginFormData; }) => {
    // TypeScript connaît maintenant la structure de 'value'
    console.log('Email:', value.email); // ✅ Typé comme string
    console.log('Password:', value.password); // ✅ Typé comme string

    // Simulation d'un appel API
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(value)
      });

      if (response.ok) {
        console.log('Connexion réussie !');
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Connexion</h2>

      <Form<LoginFormData>
        defaultValues={{
          email: '',
          password: '',
        }}
        onFormSubmit={handleSubmit}
        className="flex flex-col gap-4"
        validators={{
          onChange: ({ value }: { value: Partial<LoginFormData>; }) => {
            // Validation globale du formulaire avec types
            if (value.email && value.password && value.email === value.password) {
              return {
                form: 'L\'email et le mot de passe ne peuvent pas être identiques',
              };
            }
            return undefined;
          },
        }}
      >
        <FormTextField
          name="email"
          label="Adresse email"
          type="email"
          fullWidth
          validators={{
            onChange: ({ value }: { value: string; }) => {
              if (!value) return 'L\'email est requis';
              if (!value.includes('@')) return 'Format d\'email invalide';
              if (value.length < 5) return 'Email trop court';
              return undefined;
            },
            onBlur: ({ value }: { value: string; }) => {
              // Validation plus stricte au blur
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              if (value && !emailRegex.test(value)) {
                return 'Veuillez entrer un email valide';
              }
              return undefined;
            },
          }}
        />

        <FormPasswordField
          name="password"
          label="Mot de passe"
          fullWidth
          validators={{
            onChange: ({ value }: { value: string; }) => {
              if (!value) return 'Le mot de passe est requis';
              if (value.length < 6) return 'Le mot de passe doit contenir au moins 6 caractères';
              if (!/[A-Z]/.test(value)) return 'Le mot de passe doit contenir au moins une majuscule';
              if (!/[0-9]/.test(value)) return 'Le mot de passe doit contenir au moins un chiffre';
              return undefined;
            },
          }}
        />

        <FormSubmitButton
          variant="contained"
          size="large"
          fullWidth
          className="mt-4"
        >
          Se connecter
        </FormSubmitButton>
      </Form>
    </div>
  );
};

// Exemple d'utilisation du hook typé
export const FormStateExample = () => {
  // Cette approche n'est plus recommandée avec notre nouvelle architecture,
  // mais montre comment on pourrait accéder au form si nécessaire
  return (
    <div className="p-4">
      <p>Les valeurs du formulaire sont maintenant typées !</p>
      <p>Voir LoginFormExample pour l'usage recommandé.</p>
    </div>
  );
};
