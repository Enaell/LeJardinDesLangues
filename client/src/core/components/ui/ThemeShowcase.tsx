import { Box, Typography, Paper, Grid, Chip } from '@mui/material';
import { colors } from '../../theme/colors';
import { useTheme } from '../../hooks/useTheme';

type ColorSwatchProps = {
  name: string;
  color: string;
  textColor?: string;
};

const ColorSwatch = ({ name, color, textColor = '#000' }: ColorSwatchProps) => (
  <Paper
    elevation={1}
    sx={{
      p: 2,
      backgroundColor: color,
      color: textColor,
      textAlign: 'center',
      minHeight: 80,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      transition: 'transform 0.2s ease-in-out',
      '&:hover': {
        transform: 'scale(1.05)',
      },
    }}
  >
    <Typography variant="body2" fontWeight={500}>
      {name}
    </Typography>
    <Typography variant="caption" sx={{ opacity: 0.8 }}>
      {color}
    </Typography>
  </Paper>
);

type ColorPaletteProps = {
  title: string;
  palette: Record<string, string>;
  textColor?: string;
};

const ColorPalette = ({ title, palette, textColor }: ColorPaletteProps) => (
  <Box sx={{ mb: 4 }}>
    <Typography variant="h6" gutterBottom>
      {title}
    </Typography>
    <Grid container spacing={2}>
      {Object.entries(palette).map(([shade, color]) => (
        <Grid size={{ xs: 6, sm: 4, md: 3, lg: 2 }} key={shade}>
          <ColorSwatch
            name={shade}
            color={color}
            textColor={
              textColor ||
              (parseInt(shade) >= 500 ? '#ffffff' : '#000000')
            }
          />
        </Grid>
      ))}
    </Grid>
  </Box>
);

/**
 * Composant de démonstration de la palette de couleurs du thème
 * Utile pour visualiser toutes les couleurs disponibles dans le design system
 */
export const ThemeShowcase = () => {
  const theme = useTheme();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Palette de Couleurs - Le Jardin des Langues
      </Typography>

      <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
        Cette palette de couleurs s'inspire de la nature et de la croissance,
        reflétant parfaitement l'esprit d'apprentissage et d'épanouissement de notre application.
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Couleurs Principales du Thème
        </Typography>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: '50%',
                  margin: '0 auto 16px',
                  boxShadow: `0 4px 12px ${theme.palette.primary.main}40`,
                }}
              />
              <Typography variant="h6">Primaire</Typography>
              <Chip label={theme.palette.primary.main} size="small" />
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  backgroundColor: theme.palette.secondary.main,
                  borderRadius: '50%',
                  margin: '0 auto 16px',
                  boxShadow: `0 4px 12px ${theme.palette.secondary.main}40`,
                }}
              />
              <Typography variant="h6">Secondaire</Typography>
              <Chip label={theme.palette.secondary.main} size="small" />
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  backgroundColor: colors.accent[500],
                  borderRadius: '50%',
                  margin: '0 auto 16px',
                  boxShadow: `0 4px 12px ${colors.accent[500]}40`,
                }}
              />
              <Typography variant="h6">Accent</Typography>
              <Chip label={colors.accent[500]} size="small" />
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <ColorPalette title="Couleurs Primaires (Vert Jardin)" palette={colors.primary} />
      <ColorPalette title="Couleurs Secondaires (Vert Sauge)" palette={colors.secondary} />
      <ColorPalette title="Couleurs d'Accent (Orange Doux)" palette={colors.accent} />
      <ColorPalette title="Succès" palette={colors.success} />
      <ColorPalette title="Avertissement" palette={colors.warning} />
      <ColorPalette title="Erreur" palette={colors.error} />
      <ColorPalette title="Information" palette={colors.info} />
      <ColorPalette title="Couleurs Neutres" palette={colors.grey} textColor="#000" />
    </Box>
  );
};
