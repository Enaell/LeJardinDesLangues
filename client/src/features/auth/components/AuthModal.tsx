import { Dialog, DialogContent, DialogTitle } from '@core/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent, TabsIndicator } from '@core/components/ui/tabs';
import { useTranslation } from '@core/hooks';
import type { AuthModalTab } from '../hooks/useAuthModal';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

type AuthModalProps = {
  isOpen: boolean;
  activeTab: AuthModalTab;
  onClose: () => void;
  onSwitchTab: (tab: AuthModalTab) => void;
  onGoogleNewUser: (nativeLanguage: string) => void;
};

export const AuthModal = ({ isOpen, activeTab, onClose, onSwitchTab, onGoogleNewUser }: AuthModalProps) => {
  const { t } = useTranslation();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent hideCloseButton>
        <DialogTitle className="sr-only">
          {activeTab === 'login' ? t('auth.login.title') : t('auth.register.title')}
        </DialogTitle>

        <Tabs
          value={activeTab}
          onValueChange={(value) => onSwitchTab(value as AuthModalTab)}
          className="w-full"
        >
          <TabsList className="w-full mb-6">
            <TabsIndicator />
            <TabsTrigger value="login" className="flex-1">
              {t('auth.login.title')}
            </TabsTrigger>
            <TabsTrigger value="register" className="flex-1">
              {t('auth.register.title')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <LoginForm onSuccess={onClose} switchTab={onSwitchTab} onGoogleNewUser={onGoogleNewUser} />
          </TabsContent>

          <TabsContent value="register">
            <RegisterForm onSuccess={onClose} switchTab={onSwitchTab} onGoogleNewUser={onGoogleNewUser} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
