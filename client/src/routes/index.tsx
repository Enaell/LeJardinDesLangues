import { createFileRoute } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { LanguageSelector, PopoverMenu, ProTip, ThemeShowcase } from '@core/components/ui';
import { useTranslation } from '@core/hooks';

type FeatureColor = "primary" | "secondary" | "success" | "info" | "warning" | "inherit" | "error";

export const HomePage = () => {
  const { t } = useTranslation();

  const features: {
    titleKey: string;
    descriptionKey: string;
    path: string;
    color: FeatureColor;
  }[] = [
      {
        titleKey: 'features.dictionary.title',
        descriptionKey: 'features.dictionary.description',
        path: '/dictionary',
        color: 'primary',
      },
      {
        titleKey: 'features.flashcards.title',
        descriptionKey: 'features.flashcards.description',
        path: '/flashcards',
        color: 'secondary',
      },
      {
        titleKey: 'features.exercises.title',
        descriptionKey: 'features.exercises.description',
        path: '/exercises',
        color: 'success',
      },
      {
        titleKey: 'features.community.title',
        descriptionKey: 'features.community.description',
        path: '/community',
        color: 'info',
      },
      {
        titleKey: 'features.profile.title',
        descriptionKey: 'features.profile.description',
        path: '/profile',
        color: 'warning',
      },
    ];

  return (
    <Container maxWidth="lg">
      <div className="py-8">
        <Typography variant="h2" component="h1" align="center" gutterBottom>
          {t('app.title')}
        </Typography>

        <Typography variant="h5" align="center" color="text.secondary" sx={{ mb: 4 }}>
          {t('app.subtitle')}
        </Typography>

        <div className="flex justify-center mb-8">
          <PopoverMenu />
        </div>

        <Slider
          className="my-4"
          defaultValue={30}
          classes={{ active: 'shadow-none' }}
          slotProps={{ thumb: { className: 'hover:shadow-none' } }}
          sx={{ mb: 4 }}
        />

        <Grid container spacing={3} sx={{ mb: 4 }}>
          {features.map((feature) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={feature.path}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {t(feature.titleKey)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t(feature.descriptionKey)}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    component={Link}
                    to={feature.path}
                    color={feature.color}
                    variant="outlined"
                    size="small"
                  >
                    {t('features.discover')}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        <ProTip>
          {t('app.proTip')}
        </ProTip>
        <LanguageSelector />
        {/* Démonstration du thème - À supprimer en production */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <ThemeShowcase />
        </div>
      </div>
    </Container>
  );
};


export const Route = createFileRoute('/')({
  component: HomePage,
});
