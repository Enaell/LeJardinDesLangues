import { RouterProvider } from '@tanstack/react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient, ThemeProvider } from './core';
import { NotificationProvider, GlobalNotifications } from './core/components/notifications';
import { createRouter } from '@tanstack/react-router';

import { routeTree } from './routeTree.gen';

// Create the router
export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <NotificationProvider>
          <RouterProvider router={router} />
          <GlobalNotifications />
        </NotificationProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
