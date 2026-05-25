// Supported languages — labels written in the language itself (endonym)
export type LanguageCode = 'fr' | 'en' | 'zh';

export type LanguageOption = {
  value: LanguageCode;
  label: string;
};

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { value: 'fr', label: 'Français' },
  { value: 'en', label: 'English' },
  { value: 'zh', label: '中文' },
];
