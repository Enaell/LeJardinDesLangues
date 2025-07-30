import { Box, Button, Typography } from '@mui/material';
import { Form, FormTextField, FormPasswordField, FormSelect, FormSubmitButton } from '../../../core/components/forms';
import { useRegister } from '../hooks';
import type { RegisterFormData } from '../types/forms';

type RegisterFormProps = {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
};

export const RegisterForm = ({ onSuccess, onSwitchToLogin }: RegisterFormProps) => {
  const registerMutation = useRegister();

  const handleSubmit = async ({ value }: { value: RegisterFormData; }) => {
    try {
      await registerMutation.mutateAsync({
        username: value.username,
        email: value.email,
        password: value.password,
        name: value.name,
        nativeLanguage: value.nativeLanguage,
        targetLanguage: value.targetLanguage,
      });
      onSuccess?.();
    } catch (error) {
      // L'erreur est déjà gérée par React Query
      console.error('Erreur d\'inscription:', error);
    }
  };

  const validateUsername = (value: string) => {
    if (value.length < 3) {
      return 'Le nom d\'utilisateur doit contenir au moins 3 caractères';
    }
    if (value.length > 50) {
      return 'Le nom d\'utilisateur ne peut pas dépasser 50 caractères';
    }
    if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
      return 'Le nom d\'utilisateur ne peut contenir que des lettres, chiffres, tirets et underscores';
    }
    return undefined;
  };

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'L\'adresse email n\'est pas valide';
    }
    return undefined;
  };

  const validatePassword = (value: string) => {
    if (value.length < 8) {
      return 'Le mot de passe doit contenir au moins 8 caractères';
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
      return 'Le mot de passe doit contenir au moins une minuscule, une majuscule et un chiffre';
    }
    return undefined;
  };

  const validateName = (value: string) => {
    if (value.length === 0) {
      return 'Le nom est requis';
    }
    if (value.length > 100) {
      return 'Le nom ne peut pas dépasser 100 caractères';
    }
    return undefined;
  };

  return (
    <Box className="space-y-4 max-w-md mx-auto">
      <Form<RegisterFormData>
        defaultValues={{
          username: '',
          email: '',
          password: '',
          name: '',
          nativeLanguage: 'fr',
          targetLanguage: 'zh',
        }}
        onFormSubmit={handleSubmit}
        className="space-y-4"
      >
        <FormTextField
          name="username"
          label="Nom d'utilisateur"
          type="text"
          fullWidth
          placeholder="johndoe"
          validators={{
            onChange: ({ value }: { value: string; }) => validateUsername(value),
            onBlur: ({ value }: { value: string; }) => validateUsername(value),
          }}
        />

        <FormTextField
          name="email"
          label="Email"
          type="email"
          fullWidth
          placeholder="john.doe@exemple.com"
          validators={{
            onChange: ({ value }: { value: string; }) => validateEmail(value),
            onBlur: ({ value }: { value: string; }) => validateEmail(value),
          }}
        />

        <FormPasswordField
          name="password"
          label="Mot de passe"
          fullWidth
          placeholder="MonMotDePasse123!"
          validators={{
            onChange: ({ value }: { value: string; }) => validatePassword(value),
            onBlur: ({ value }: { value: string; }) => validatePassword(value),
          }}
        />

        <FormTextField
          name="name"
          label="Nom complet"
          type="text"
          fullWidth
          placeholder="John Doe"
          validators={{
            onChange: ({ value }: { value: string; }) => validateName(value),
            onBlur: ({ value }: { value: string; }) => validateName(value),
          }}
        />

        <Box className="grid grid-cols-2 gap-4">
          <FormSelect
            name="nativeLanguage"
            label="Langue native"
            options={[
              { value: 'fr', label: 'Français' },
              { value: 'en', label: 'Anglais' },
              { value: 'zh', label: 'Chinois' },
              { value: 'es', label: 'Espagnol' },
            ]}
          />

          <FormSelect
            name="targetLanguage"
            label="Langue à apprendre"
            options={[
              { value: 'zh', label: 'Chinois' },
              { value: 'fr', label: 'Français' },
              { value: 'en', label: 'Anglais' },
              { value: 'es', label: 'Espagnol' },
            ]}
          />
        </Box>

        {registerMutation.isError && registerMutation.error && (
          <Box className="text-red-600 text-sm">
            {registerMutation.error.message}
          </Box>
        )}

        <FormSubmitButton
          variant="contained"
          fullWidth
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          {registerMutation.isPending ? 'Inscription...' : 'S\'inscrire'}
        </FormSubmitButton>
      </Form>

      {onSwitchToLogin && (
        <Box className="text-center mt-4">
          <Typography variant="body2" className="text-gray-600">
            Déjà un compte ?{' '}
            <Button
              onClick={onSwitchToLogin}
              variant="text"
              size="small"
              className="text-indigo-600 hover:text-indigo-500 font-medium p-0 min-w-0"
            >
              Se connecter
            </Button>
          </Typography>
        </Box>
      )}
    </Box>
  );
};
