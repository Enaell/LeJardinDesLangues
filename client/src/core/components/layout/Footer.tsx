import { Container } from '@mui/material';
import { Copyright } from '../ui/Copiright';

export const Footer = () => {
  return (
    <footer className="py-6 px-4 mt-auto bg-gray-100">
      <Container maxWidth="sm">
        <Copyright />
      </Container>
    </footer>
  );
};
