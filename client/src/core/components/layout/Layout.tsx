import React from 'react';
import { AppBar } from './AppBar';
import { Footer } from './Footer';
import { NAVIGATION_ITEMS } from '@core/routes.config';
import { FlexColumn } from '@core/components';

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {

  return (
    <FlexColumn className="min-h-screen">
      <AppBar navigationItems={NAVIGATION_ITEMS} />

      <main className="flex-grow">
        {children}
      </main>

      <Footer />
    </FlexColumn>
  );
};
