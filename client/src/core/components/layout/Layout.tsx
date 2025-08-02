import React from 'react';
import { AppBar } from './AppBar';
import { Footer } from './Footer';

const navigationItems = [
  { label: 'Accueil', path: '/' },
  { label: 'Dictionnaire', path: '/dictionary' },
  { label: 'Cartes Mémoire', path: '/flashcards' },
  { label: 'Exercices', path: '/exercises' },
  { label: 'Communauté', path: '/community' },
  { label: 'Profil', path: '/profile' },
];

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {

  return (
    <div className="flex flex-col min-h-screen">
      <AppBar navigationItems={navigationItems} />

      <main className="flex-grow">
        {children}
      </main>

      <Footer />
    </div>
  );
};
