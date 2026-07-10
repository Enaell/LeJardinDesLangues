import { useTranslation } from '@core/hooks';
import { LANGUAGE_OPTIONS } from '@core/i18n/languages';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@core/components/ui/select';

type LanguageSelectorProps = {
  size?: 'sm' | 'default';
  className?: string;
};

export const nativeLanguageRenderer = (value: string | null) => LANGUAGE_OPTIONS.find((opt) => opt.value === value)?.label ?? value ?? '';

export const targetLanguageRenderer = (value: string | null) => {
  const { t } = useTranslation();
  return t(`languages.${value}`, { defaultValue: value });
};

export const LanguageSelector = ({ size = 'default', className }: LanguageSelectorProps) => {
  const { currentLanguage, changeLanguage } = useTranslation();

  return (
    <Select value={currentLanguage} onValueChange={(value) => value && changeLanguage(value)}>
      <SelectTrigger size={size} className={className}>
        <SelectValue>{nativeLanguageRenderer}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {LANGUAGE_OPTIONS.map((lang) => (
          <SelectItem key={lang.value} value={lang.value}>
            {lang.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};;
