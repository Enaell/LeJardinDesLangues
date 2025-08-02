import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useTranslation } from '@core/hooks';

export const LanguageSelector = () => {
  const { t, changeLanguage, currentLanguage } = useTranslation();

  const handleLanguageChange = (event: { target: { value: string; }; }) => {
    changeLanguage(event.target.value);
  };

  const languages = [
    { code: 'fr', label: t('languages.fr') },
    { code: 'en', label: t('languages.en') },
    { code: 'zh', label: t('languages.zh') },
  ];

  return (
    <FormControl size="small" variant="outlined" sx={{ minWidth: 120 }}>
      <InputLabel id="language-select-label">
        Langue
      </InputLabel>
      <Select
        labelId="language-select-label"
        value={currentLanguage}
        onChange={handleLanguageChange}
        label="Langue"
      >
        {languages.map((language) => (
          <MenuItem key={language.code} value={language.code}>
            {language.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
