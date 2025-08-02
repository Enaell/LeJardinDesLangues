import React from 'react';
import { AppBar } from './AppBar';
import { Footer } from './Footer';
import { NAVIGATION_ITEMS } from '@core/routes.config';

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {

  return (
    <div className="flex flex-col min-h-screen">
      <AppBar navigationItems={NAVIGATION_ITEMS} />

      <main className="flex-grow">
        {children}
      </main>

      <Footer />
    </div>
  );
};
