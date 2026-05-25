import React from 'react';
import { useRouterState } from '@tanstack/react-router';
import { AppBar } from './AppBar';
import { Footer } from './Footer';

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  const { location } = useRouterState();
  const isLandingPage = location.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <AppBar />
      <main className={isLandingPage ? '' : 'flex-grow'}>
        {children}
      </main>
      {!isLandingPage && <Footer />}
    </div>
  );
};
