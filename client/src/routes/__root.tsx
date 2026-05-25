import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Layout } from '@core';
import { AuthModalProvider } from '@features/auth/components/AuthModalContext';

export const Route = createRootRoute({
  component: () => (
    <>
      <AuthModalProvider>
        <Layout>
          <Outlet />
        </Layout>
      </AuthModalProvider>
      <TanStackRouterDevtools />
    </>
  ),
});