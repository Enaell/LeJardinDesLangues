import { useState, useCallback } from 'react';

export type AuthModalTab = 'login' | 'register';

type UseAuthModalReturn = {
  isOpen: boolean;
  activeTab: AuthModalTab;
  openModal: (tab?: AuthModalTab) => void;
  closeModal: () => void;
  switchTab: (tab: AuthModalTab) => void;
};

export const useAuthModal = (): UseAuthModalReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<AuthModalTab>('login');

  const openModal = useCallback((tab: AuthModalTab = 'login') => {
    setActiveTab(tab);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const switchTab = useCallback((tab: AuthModalTab) => {
    setActiveTab(tab);
  }, []);

  return {
    isOpen,
    activeTab,
    openModal,
    closeModal,
    switchTab,
  };
};
