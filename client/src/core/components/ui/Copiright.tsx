import { Link, Typography } from "@mui/material";

export const Copyright = () => {
  return (
    <Typography
      variant="body2"
      align="center"
      sx={{
        color: 'text.secondary',
        mt: 4,
      }}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/Enaell/LeJardinDesLangues">
        Le Jardin des Langues
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};