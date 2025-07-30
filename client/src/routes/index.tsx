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
import { PopoverMenu, ProTip, ThemeShowcase } from '../core/components/ui';

type FeatureColor = "primary" | "secondary" | "success" | "info" | "warning" | "inherit" | "error";

const features: {
  title: string;
  description: string;
  path: string;
  color: FeatureColor;
}[] = [
    {
      title: 'Dictionnaire',
      description: 'Explorez et recherchez des mots dans différentes langues',
      path: '/dictionary',
      color: 'primary',
    },
    {
      title: 'Cartes Mémoire',
      description: 'Créez et étudiez vos propres cartes mémoire',
      path: '/flashcards',
      color: 'secondary',
    },
    {
      title: 'Exercices',
      description: 'Pratiquez avec des exercices interactifs',
      path: '/exercises',
      color: 'success',
    },
    {
      title: 'Communauté',
      description: 'Partagez et découvrez du contenu avec d\'autres apprenants',
      path: '/community',
      color: 'info',
    },
    {
      title: 'Profil',
      description: 'Gérez votre profil et vos préférences',
      path: '/profile',
      color: 'warning',
    },
  ];

export const HomePage = () => {

  return (
    <Container maxWidth="lg">
      <div className="py-8">
        <Typography variant="h2" component="h1" align="center" gutterBottom>
          Le Jardin des Langues
        </Typography>

        <Typography variant="h5" align="center" color="text.secondary" sx={{ mb: 4 }}>
          Votre application pour apprendre les langues de manière interactive
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
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
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
                    Découvrir
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        <ProTip>
          Commencez par explorer le dictionnaire pour découvrir de nouveaux mots,
          puis créez vos premières cartes mémoire pour les mémoriser !
        </ProTip>

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
