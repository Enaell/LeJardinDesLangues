import { createContext, useContext } from 'react';
import { useAuthModal, type AuthModalTab } from '../hooks/useAuthModal';
import { AuthModal } from './AuthModal';

type AuthModalContextType = {
  openModal: (tab?: AuthModalTab) => void;
  closeModal: () => void;
};

export const AuthModalContext = createContext<AuthModalContextType>({
  openModal: () => { },
  closeModal: () => { },
});

type AuthModalProviderProps = {
  children: React.ReactNode;
};

export const AuthModalProvider = ({ children }: AuthModalProviderProps) => {
  const { isOpen, activeTab, openModal, closeModal, switchTab } = useAuthModal();

  return (
    <AuthModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <AuthModal
        isOpen={isOpen}
        activeTab={activeTab}
        onClose={closeModal}
        onSwitchTab={switchTab}
      />
    </AuthModalContext.Provider>
  );
};

export const useAuthModalContext = () => useContext(AuthModalContext);
