import { useForm } from '@tanstack/react-form';
import { useRouter } from '@tanstack/react-router';
import { Button } from '@core/components/ui/button';
import { Input } from '@core/components/ui/input';
import { Label } from '@core/components/ui/label';
import { Typography } from '@core/components/ui/typography';
import { useTranslation } from '@core/hooks';
import { useLogin, useGoogleAuth } from '../hooks/useAuth';
import { GoogleIcon } from '@core/icons';
import type { LoginFormData } from '../types/forms';

type LoginFormProps = {
  onSuccess: () => void;
  switchTab: (tab: 'register') => void;
  onGoogleNewUser: (nativeLanguage: string) => void;
};

export const LoginForm = ({ onSuccess, switchTab, onGoogleNewUser }: LoginFormProps) => {
  const { t } = useTranslation();
  const loginMutation = useLogin();
  const googleMutation = useGoogleAuth();
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      emailOrUsername: '',
      password: '',
    } satisfies LoginFormData,
    onSubmit: ({ value }) => {
      loginMutation.mutate(value, { onSuccess });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="flex flex-col gap-4"
    >
      <form.Field
        name="emailOrUsername"
        validators={{
          onChange: ({ value }) => (!value ? t('validation.required') : undefined),
        }}
      >
        {(field) => (
          <div className="flex flex-col gap-1.5">
            <Label htmlFor={field.name}>{t('auth.login.emailOrUsername')}</Label>
            <Input
              id={field.name}
              value={field.state.value}
              placeholder={t('auth.login.emailOrUsernamePlaceholder')}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
            />
            {field.state.meta.errors.length > 0 && (
              <Typography variant="small" className="text-destructive">
                {field.state.meta.errors.join(', ')}
              </Typography>
            )}
          </div>
        )}
      </form.Field>

      <form.Field
        name="password"
        validators={{
          onChange: ({ value }) => (!value ? t('validation.required') : undefined),
        }}
      >
        {(field) => (
          <div className="flex flex-col gap-1.5">
            <Label htmlFor={field.name}>{t('auth.login.password')}</Label>
            <Input
              id={field.name}
              type="password"
              value={field.state.value}
              placeholder={t('auth.login.passwordPlaceholder')}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
            />
            {field.state.meta.errors.length > 0 && (
              <Typography variant="small" className="text-destructive">
                {field.state.meta.errors.join(', ')}
              </Typography>
            )}
          </div>
        )}
      </form.Field>

      <Button type="submit" className="w-full" disabled={loginMutation.isPending}>
        {loginMutation.isPending ? t('auth.login.submitButtonLoading') : t('auth.login.submitButton')}
      </Button>

      <div className="relative flex items-center gap-3">
        <div className="flex-1 border-t border-border" />
        <Typography variant="small" className="text-muted-foreground">
          {t('auth.login.dividerText')}
        </Typography>
        <div className="flex-1 border-t border-border" />
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full gap-2"
        onClick={() => googleMutation.mutate(undefined, {
          onSuccess: (data) => {
            if (data.isNewUser) {
              onSuccess();
              onGoogleNewUser(data.user.nativeLanguage);
            } else {
              onSuccess();
              router.navigate({ to: '/profile' }).catch(() => router.navigate({ to: '/' }));
            }
          },
        })}
        disabled={googleMutation.isPending}
      >
        <GoogleIcon />
        {googleMutation.isPending ? t('auth.login.googleButtonLoading') : t('auth.login.googleButton')}
      </Button>

      <Typography variant="small" className="text-center text-muted-foreground">
        {t('auth.login.noAccount')}{' '}
        <button
          type="button"
          onClick={() => switchTab('register')}
          className="text-primary underline-offset-4 hover:underline font-medium"
        >
          {t('auth.login.createAccount')}
        </button>
      </Typography>
    </form>
  );
};
