import { createFileRoute } from '@tanstack/react-router';
import { HeroSection } from '@features/landing';

export const HomePage = () => {
  return <HeroSection />;
};

export const Route = createFileRoute('/')({
  component: HomePage,
});


