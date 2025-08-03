import { createTheme, Theme } from '@mui/material/styles';
import { colors } from './colors';

/**
 * Thème Material-UI pour Le Jardin des Langues
 * Inspiré par la nature et l'apprentissage, avec le vert comme couleur dominante
 */
export const createAppTheme = (): Theme => {
  return createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: colors.primary[500],
        light: colors.primary[300],
        dark: colors.primary[700],
        contrastText: '#ffffff',
        // contrastText: colors.text.primaryContrast,
      },
      secondary: {
        main: colors.secondary[500],
        light: colors.secondary[300],
        dark: colors.secondary[700],
        contrastText: '#ffffff',
        // contrastText: colors.text.secondaryContrast,
      },
      error: {
        main: colors.error[500],
        light: colors.error[300],
        dark: colors.error[700],
        contrastText: '#ffffff',
      },
      warning: {
        main: colors.warning[500],
        light: colors.warning[300],
        dark: colors.warning[700],
        contrastText: '#ffffff',
      },
      info: {
        main: colors.info[500],
        light: colors.info[300],
        dark: colors.info[700],
        contrastText: '#ffffff',
      },
      success: {
        main: colors.success[500],
        light: colors.success[300],
        dark: colors.success[700],
        contrastText: '#ffffff',
      },
      grey: colors.grey,
      background: {
        default: colors.background.default,
        paper: colors.background.paper,
      },
      text: {
        primary: colors.text.primary,
        secondary: colors.text.secondary,
        disabled: colors.text.disabled,
      },
      divider: colors.grey[200],
    },
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      h1: {
        fontSize: '2.5rem',
        fontWeight: 600,
        lineHeight: 1.2,
        color: colors.text.primary,
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 600,
        lineHeight: 1.3,
        color: colors.text.primary,
      },
      h3: {
        fontSize: '1.75rem',
        fontWeight: 600,
        lineHeight: 1.4,
        color: colors.text.primary,
      },
      h4: {
        fontSize: '1.5rem',
        fontWeight: 500,
        lineHeight: 1.4,
        color: colors.text.primary,
      },
      h5: {
        fontSize: '1.25rem',
        fontWeight: 500,
        lineHeight: 1.5,
        color: colors.text.primary,
      },
      h6: {
        fontSize: '1.125rem',
        fontWeight: 500,
        lineHeight: 1.5,
        color: colors.text.primary,
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.6,
        color: colors.text.primary,
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.6,
        color: colors.text.secondary,
      },
    },
    shape: {
      borderRadius: 12,
    },
    spacing: 8,
    components: {
      // Personnalisation des composants
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none', // Pas de transformation en majuscules
            fontWeight: 500,
            borderRadius: 12,
            padding: '10px 24px',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0 2px 8px rgba(74, 157, 74, 0.24)',
            },
          },
          contained: {
            backgroundColor: colors.primary[600],
            color: colors.text.primaryContrast,
            '&:hover': {
              backgroundColor: colors.primary[700],
              boxShadow: '0 4px 12px rgba(74, 157, 74, 0.32)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
            '&:hover': {
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 8,
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: colors.primary[400],
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: colors.primary[500],
                borderWidth: 2,
              },
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 20,
            fontWeight: 500,
          },
          colorPrimary: {
            backgroundColor: colors.primary[100],
            color: colors.primary[800],
            '&:hover': {
              backgroundColor: colors.primary[200],
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: colors.background.primary,
            color: colors.text.primaryContrast,
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12)',
            borderRadius: 0,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12,
          },
          elevation1: {
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12)',
          },
          elevation2: {
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.16)',
          },
          elevation3: {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.16)',
          },
        },
      },
    },
  });
};

// Instance du thème par défaut
export const theme = createAppTheme();

export type AppTheme = typeof theme;
