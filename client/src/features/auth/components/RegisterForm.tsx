import { useForm } from '@tanstack/react-form';
import { Button } from '@core/components/ui/button';
import { Input } from '@core/components/ui/input';
import { Label } from '@core/components/ui/label';
import { Typography } from '@core/components/ui/typography';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@core/components/ui/select';
import { useTranslation } from '@core/hooks';
import { LANGUAGE_OPTIONS } from '@core/i18n/languages';
import { useRegister, useGoogleAuth } from '../hooks/useAuth';
import type { RegisterFormData } from '../types/forms';
import { nativeLanguageRenderer, targetLanguageRenderer } from '@/core/components/ui/language-selector';
import { GoogleIcon } from '@core/icons';
import { useRouter } from '@tanstack/react-router';

type RegisterFormProps = {
  onSuccess: () => void;
  switchTab: (tab: 'login') => void;
  onGoogleNewUser: (nativeLanguage: string) => void;
};

export const RegisterForm = ({ onSuccess, switchTab, onGoogleNewUser }: RegisterFormProps) => {
  const { t, changeLanguage } = useTranslation();
  const registerMutation = useRegister();
  const googleMutation = useGoogleAuth();
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      name: '',
      nativeLanguage: 'fr',
      targetLanguage: 'zh',
    } satisfies RegisterFormData,
    onSubmit: ({ value }) => {
      registerMutation.mutate(value, { onSuccess });
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
        name="username"
        validators={{
          onChange: ({ value }) =>
            !value
              ? t('validation.required')
              : value.length < 3
                ? t('validation.minLength', { count: 3 })
                : undefined,
        }}
      >
        {(field) => (
          <div className="flex flex-col gap-1.5">
            <Label htmlFor={field.name}>{t('auth.register.username')}</Label>
            <Input
              id={field.name}
              value={field.state.value}
              placeholder={t('auth.register.usernamePlaceholder')}
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
        name="email"
        validators={{
          onChange: ({ value }) =>
            !value
              ? t('validation.required')
              : !value.includes('@')
                ? t('validation.email')
                : undefined,
        }}
      >
        {(field) => (
          <div className="flex flex-col gap-1.5">
            <Label htmlFor={field.name}>{t('auth.register.email')}</Label>
            <Input
              id={field.name}
              type="email"
              value={field.state.value}
              placeholder={t('auth.register.emailPlaceholder')}
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
        name="name"
        validators={{
          onChange: ({ value }) => (!value ? t('validation.required') : undefined),
        }}
      >
        {(field) => (
          <div className="flex flex-col gap-1.5">
            <Label htmlFor={field.name}>{t('auth.register.fullName')}</Label>
            <Input
              id={field.name}
              value={field.state.value}
              placeholder={t('auth.register.fullNamePlaceholder')}
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
          onChange: ({ value }) =>
            !value
              ? t('validation.required')
              : value.length < 8
                ? t('validation.minLength', { count: 8 })
                : undefined,
        }}
      >
        {(field) => (
          <div className="flex flex-col gap-1.5">
            <Label htmlFor={field.name}>{t('auth.register.password')}</Label>
            <Input
              id={field.name}
              type="password"
              value={field.state.value}
              placeholder={t('auth.register.passwordPlaceholder')}
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

      <form.Field name="nativeLanguage">
        {(field) => (
          <div className="flex flex-col gap-1.5">
            <Label>{t('auth.register.nativeLanguage')}</Label>
            <Select
              value={field.state.value}
              onValueChange={(value) => {
                if (!value) return;
                field.handleChange(value);
                changeLanguage(value);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue>
                  {nativeLanguageRenderer}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {LANGUAGE_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </form.Field>

      <form.Field name="targetLanguage">
        {(field) => (
          <div className="flex flex-col gap-1.5">
            <Label>{t('auth.register.targetLanguage')}</Label>
            <Select
              value={field.state.value}
              onValueChange={(value) => field.handleChange(value ?? '')}
            >
              <SelectTrigger className="w-full">
                <SelectValue>
                  {targetLanguageRenderer}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {LANGUAGE_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {t(`languages.${opt.value}`, { defaultValue: opt.label })}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </form.Field>

      <Button type="submit" className="w-full mt-2" disabled={registerMutation.isPending}>
        {registerMutation.isPending
          ? t('auth.register.submitButtonLoading')
          : t('auth.register.submitButton')}
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
        {t('auth.register.hasAccount')}{' '}
        <button
          type="button"
          onClick={() => switchTab('login')}
          className="text-primary underline-offset-4 hover:underline font-medium"
        >
          {t('auth.register.signIn')}
        </button>
      </Typography>
    </form>
  );
};
