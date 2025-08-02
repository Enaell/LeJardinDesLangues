import { Box, Button, Divider, Typography } from '@mui/material';
import { Form, FormTextField, FormPasswordField, FormSubmitButton } from '@core/components/forms';
import { useLogin, useGoogleAuth } from '../hooks';
import type { LoginFormData } from '../types/forms';

type LoginFormProps = {
  onSuccess?: () => void;
  onSwitchToRegister?: () => void;
};

export const LoginForm = ({ onSuccess, onSwitchToRegister }: LoginFormProps) => {
  const loginMutation = useLogin();
  const googleAuth = useGoogleAuth();

  const handleSubmit = async ({ value }: { value: LoginFormData; }) => {
    try {
      await loginMutation.mutateAsync({
        emailOrUsername: value.emailOrUsername,
        password: value.password,
      });
      onSuccess?.();
    } catch (error) {
      // L'erreur est déjà gérée par React Query
      console.error('Erreur de connexion:', error);
    }
  };

  return (
    <Box className="space-y-4 max-w-md mx-auto">
      <Form<LoginFormData>
        defaultValues={{
          emailOrUsername: '',
          password: '',
        }}
        onFormSubmit={handleSubmit}
        className="space-y-4"
      >
        <FormTextField
          name="emailOrUsername"
          label="Email ou nom d'utilisateur"
          type="text"
          fullWidth
          placeholder="votre.email@exemple.com"
          validators={{
            onChange: ({ value }: { value: string; }) =>
              !value ? 'Ce champ est requis' : undefined,
          }}
        />

        <FormPasswordField
          name="password"
          label="Mot de passe"
          fullWidth
          placeholder="Votre mot de passe"
          validators={{
            onChange: ({ value }: { value: string; }) =>
              !value ? 'Le mot de passe est requis' : undefined,
          }}
        />

        {loginMutation.isError && loginMutation.error && (
          <Box className="text-red-600 text-sm">
            {loginMutation.error.message}
          </Box>
        )}

        <FormSubmitButton
          variant="contained"
          fullWidth
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          {loginMutation.isPending ? 'Connexion...' : 'Se connecter'}
        </FormSubmitButton>
      </Form>

      <Divider className="my-4">
        <Typography variant="body2" className="text-gray-500">
          ou
        </Typography>
      </Divider>

      <Button
        type="button"
        onClick={() => googleAuth.mutate()}
        disabled={googleAuth.isPending}
        variant="outlined"
        fullWidth
        className="border-gray-300 text-gray-700 hover:bg-gray-50"
      >
        {googleAuth.isPending ? 'Redirection...' : 'Continuer avec Google'}
      </Button>

      {onSwitchToRegister && (
        <Box className="text-center mt-4">
          <Typography variant="body2" className="text-gray-600">
            Pas encore de compte ?{' '}
            <Button
              onClick={onSwitchToRegister}
              variant="text"
              size="small"
              className="text-indigo-600 hover:text-indigo-500 font-medium p-0 min-w-0"
            >
              Créer un compte
            </Button>
          </Typography>
        </Box>
      )}
    </Box>
  );
};
