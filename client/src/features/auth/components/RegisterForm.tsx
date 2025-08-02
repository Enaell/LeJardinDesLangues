import { Box, Button, Typography } from '@mui/material';
import { Form, FormTextField, FormPasswordField, FormSelect, FormSubmitButton } from '@core/components/forms';
import { useRegister } from '../hooks';
import { useTranslation } from '@core/hooks';
import type { RegisterFormData } from '../types/forms';

type RegisterFormProps = {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
};

export const RegisterForm = ({ onSuccess, onSwitchToLogin }: RegisterFormProps) => {
  const { t } = useTranslation();
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
      return t('auth.validation.usernameMinLength');
    }
    if (value.length > 50) {
      return t('auth.validation.usernameMaxLength');
    }
    if (!/^[a-zA-Z0-9_-]+$/.test(value)) {
      return t('auth.validation.usernameInvalidChars');
    }
    return undefined;
  };

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return t('auth.validation.emailInvalid');
    }
    return undefined;
  };

  const validatePassword = (value: string) => {
    if (value.length < 8) {
      return t('auth.validation.passwordMinLength');
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
      return t('auth.validation.passwordComplexity');
    }
    return undefined;
  };

  const validateName = (value: string) => {
    if (value.length === 0) {
      return t('auth.validation.nameRequired');
    }
    if (value.length > 100) {
      return t('auth.validation.nameMaxLength');
    }
    return undefined;
  };

  const languageOptions = [
    { value: 'fr', label: t('languages.fr') },
    { value: 'en', label: t('languages.en') },
    { value: 'zh', label: t('languages.zh') },
  ];

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
          label={t('auth.register.username')}
          type="text"
          fullWidth
          placeholder={t('auth.register.usernamePlaceholder')}
          validators={{
            onChange: ({ value }: { value: string; }) => validateUsername(value),
            onBlur: ({ value }: { value: string; }) => validateUsername(value),
          }}
        />

        <FormTextField
          name="email"
          label={t('auth.register.email')}
          type="email"
          fullWidth
          placeholder={t('auth.register.emailPlaceholder')}
          validators={{
            onChange: ({ value }: { value: string; }) => validateEmail(value),
            onBlur: ({ value }: { value: string; }) => validateEmail(value),
          }}
        />

        <FormPasswordField
          name="password"
          label={t('auth.register.password')}
          fullWidth
          placeholder={t('auth.register.passwordPlaceholder')}
          validators={{
            onChange: ({ value }: { value: string; }) => validatePassword(value),
            onBlur: ({ value }: { value: string; }) => validatePassword(value),
          }}
        />

        <FormTextField
          name="name"
          label={t('auth.register.fullName')}
          type="text"
          fullWidth
          placeholder={t('auth.register.fullNamePlaceholder')}
          validators={{
            onChange: ({ value }: { value: string; }) => validateName(value),
            onBlur: ({ value }: { value: string; }) => validateName(value),
          }}
        />

        <Box className="grid grid-cols-2 gap-4">
          <FormSelect
            name="nativeLanguage"
            label={t('auth.register.nativeLanguage')}
            options={languageOptions}
          />

          <FormSelect
            name="targetLanguage"
            label={t('auth.register.targetLanguage')}
            options={languageOptions}
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
          {registerMutation.isPending ? t('auth.register.submitButtonLoading') : t('auth.register.submitButton')}
        </FormSubmitButton>
      </Form>

      {onSwitchToLogin && (
        <Box className="text-center mt-4">
          <Typography variant="body2" className="text-gray-600">
            {t('auth.register.hasAccount')}{' '}
            <Button
              onClick={onSwitchToLogin}
              variant="text"
              size="small"
              className="text-indigo-600 hover:text-indigo-500 font-medium p-0 min-w-0"
            >
              {t('auth.register.signIn')}
            </Button>
          </Typography>
        </Box>
      )}
    </Box>
  );
};
