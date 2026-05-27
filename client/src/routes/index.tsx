import { createFileRoute } from '@tanstack/react-router';
import { HeroSection } from '@features/landing';
import { ProtectedRoute } from '@features/auth/components/ProtectedRoute';

const HomePage = () => {
  return <HeroSection />;
};

export const Route = createFileRoute('/')({
  component: () => (
    <ProtectedRoute>
      <HomePage />
    </ProtectedRoute>
  ),
});

