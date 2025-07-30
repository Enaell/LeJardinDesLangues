import { ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme } from './theme';

type ThemeProviderProps = {
  children: ReactNode;
};

/**
 * Fournisseur de thème pour l'application Le Jardin des Langues
 * Encapsule l'application avec le thème Material-UI personnalisé
 */
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
