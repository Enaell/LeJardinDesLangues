import { createContext, useContext, useState } from 'react';
import { useAuthModal, type AuthModalTab } from '../hooks/useAuthModal';
import { AuthModal } from './AuthModal';
import { LanguageOnboardingModal } from './LanguageOnboardingModal';

type AuthModalContextType = {
  openModal: (tab?: AuthModalTab) => void;
  closeModal: () => void;
  openOnboarding: (nativeLanguage: string) => void;
};

export const AuthModalContext = createContext<AuthModalContextType>({
  openModal: () => { },
  closeModal: () => { },
  openOnboarding: () => { },
});

type AuthModalProviderProps = {
  children: React.ReactNode;
};

export const AuthModalProvider = ({ children }: AuthModalProviderProps) => {
  const { isOpen, activeTab, openModal, closeModal, switchTab } = useAuthModal();
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [onboardingNativeLanguage, setOnboardingNativeLanguage] = useState('');

  const openOnboarding = (nativeLanguage: string) => {
    setOnboardingNativeLanguage(nativeLanguage);
    setOnboardingOpen(true);
  };

  const closeOnboarding = () => {
    setOnboardingOpen(false);
  };

  return (
    <AuthModalContext.Provider value={{ openModal, closeModal, openOnboarding }}>
      {children}
      <AuthModal
        isOpen={isOpen}
        activeTab={activeTab}
        onClose={closeModal}
        onSwitchTab={switchTab}
        onGoogleNewUser={openOnboarding}
      />
      {onboardingOpen && (
        <LanguageOnboardingModal
          isOpen={onboardingOpen}
          onClose={closeOnboarding}
          nativeLanguage={onboardingNativeLanguage}
        />
      )}
    </AuthModalContext.Provider>
  );
};

export const useAuthModalContext = () => useContext(AuthModalContext);
