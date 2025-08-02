import { Box, Button, Divider, Typography } from '@mui/material';
import { Form, FormTextField, FormPasswordField, FormSubmitButton } from '@core/components/forms';
import { useLogin, useGoogleAuth } from '../hooks';
import { useTranslation } from '@core/hooks';
import type { LoginFormData } from '../types/forms';

type LoginFormProps = {
  onSuccess?: () => void;
  onSwitchToRegister?: () => void;
};

export const LoginForm = ({ onSuccess, onSwitchToRegister }: LoginFormProps) => {
  const { t } = useTranslation();
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
          label={t('auth.login.emailOrUsername')}
          type="text"
          fullWidth
          placeholder={t('auth.login.emailOrUsernamePlaceholder')}
          validators={{
            onChange: ({ value }: { value: string; }) =>
              !value ? t('auth.validation.required') : undefined,
          }}
        />

        <FormPasswordField
          name="password"
          label={t('auth.login.password')}
          fullWidth
          placeholder={t('auth.login.passwordPlaceholder')}
          validators={{
            onChange: ({ value }: { value: string; }) =>
              !value ? t('auth.validation.passwordRequired') : undefined,
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
          {loginMutation.isPending ? t('auth.login.submitButtonLoading') : t('auth.login.submitButton')}
        </FormSubmitButton>
      </Form>

      <Divider className="my-4">
        <Typography variant="body2" className="text-gray-500">
          {t('auth.login.dividerText')}
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
        {googleAuth.isPending ? t('auth.login.googleButtonLoading') : t('auth.login.googleButton')}
      </Button>

      {onSwitchToRegister && (
        <Box className="text-center mt-4">
          <Typography variant="body2" className="text-gray-600">
            {t('auth.login.noAccount')}{' '}
            <Button
              onClick={onSwitchToRegister}
              variant="text"
              size="small"
              className="text-indigo-600 hover:text-indigo-500 font-medium p-0 min-w-0"
            >
              {t('auth.login.createAccount')}
            </Button>
          </Typography>
        </Box>
      )}
    </Box>
  );
};
