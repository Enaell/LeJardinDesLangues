import { RouterProvider } from '@tanstack/react-router';
import { router } from './routes/AppRouter';

export default function App() {

  // Register the router instance for type safety
  return <RouterProvider router={router} />;
}
