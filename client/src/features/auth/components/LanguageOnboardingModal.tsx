import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogTitle } from '@core/components/ui/dialog';
import { Button } from '@core/components/ui/button';
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
import { usersControllerUpdateMyProfile } from '@core/api/utilisateurs/utilisateurs';
import { authKeys } from '../hooks/useAuth';

type LanguageOnboardingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  nativeLanguage: string;
};

export const LanguageOnboardingModal = ({
  isOpen,
  onClose,
  nativeLanguage: initialNativeLanguage,
}: LanguageOnboardingModalProps) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const [nativeLanguage, setNativeLanguage] = useState(initialNativeLanguage);
  const [targetLanguage, setTargetLanguage] = useState('');
  const [targetError, setTargetError] = useState('');

  const mutation = useMutation({
    mutationFn: (data: { nativeLanguage: string; targetLanguage: string }) =>
      usersControllerUpdateMyProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.profile() });
      onClose();
    },
  });

  const handleSubmit = () => {
    if (!targetLanguage) {
      setTargetError(t('auth.validation.required'));
      return;
    }
    setTargetError('');
    mutation.mutate({ nativeLanguage, targetLanguage });
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent hideCloseButton>
        <DialogTitle className="sr-only">
          {t('auth.onboarding.title')}
        </DialogTitle>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <Typography variant="h3">{t('auth.onboarding.title')}</Typography>
            <Typography variant="muted">{t('auth.onboarding.subtitle')}</Typography>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label>{t('auth.onboarding.nativeLanguage')}</Label>
              <Select
                value={nativeLanguage}
                onValueChange={(value) => {
                  if (!value) return;
                  setNativeLanguage(value);
                  if (targetLanguage === value) setTargetLanguage('');
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
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

            <div className="flex flex-col gap-1.5">
              <Label>{t('auth.onboarding.targetLanguage')}</Label>
              <Select
                value={targetLanguage}
                onValueChange={(value) => {
                  if (!value) return;
                  setTargetLanguage(value);
                  setTargetError('');
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t('auth.onboarding.targetLanguagePlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  {LANGUAGE_OPTIONS.filter((opt) => opt.value !== nativeLanguage).map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {targetError && (
                <Typography variant="small" className="text-destructive">
                  {targetError}
                </Typography>
              )}
            </div>
          </div>

          <Button
            type="button"
            className="w-full"
            onClick={handleSubmit}
            disabled={mutation.isPending}
          >
            {mutation.isPending
              ? t('auth.onboarding.submitButtonLoading')
              : t('auth.onboarding.submitButton')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
