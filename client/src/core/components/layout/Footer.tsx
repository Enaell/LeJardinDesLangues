import { Typography } from '@core/components/ui/typography';

export const Footer = () => {
  return (
    <footer className="py-6 px-4 mt-auto bg-muted border-t">
      <Typography variant="muted" className="max-w-sm mx-auto text-center">
        {'Copyright © '}
        <a href="https://github.com/Enaell/LeJardinDesLangues" className="hover:underline">
          Le Jardin des Langues
        </a>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </footer>
  );
};
