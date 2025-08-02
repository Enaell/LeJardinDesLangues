import { useTheme as useMuiTheme } from '@mui/material/styles';
import { AppTheme } from '../theme/theme';

/**
 * Hook personnalisé pour accéder au thème Material-UI typé
 * @returns Le thème Material-UI avec les types personnalisés de l'application
 */
export const useTheme = (): AppTheme => {
  return useMuiTheme() as AppTheme;
};
