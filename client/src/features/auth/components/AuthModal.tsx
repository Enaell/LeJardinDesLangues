import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Tabs,
  Tab,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import type { AuthModalTab } from '../hooks/useAuthModal';
import { useCallback } from 'react';

type AuthModalProps = {
  isOpen: boolean;
  activeTab: AuthModalTab;
  onClose: () => void;
  onTabChange: (tab: AuthModalTab) => void;
};
export const AuthModal = ({
  isOpen,
  activeTab,
  onClose,
  onTabChange
}: AuthModalProps) => {

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    const tab = newValue === 0 ? 'login' : 'register';
    onTabChange(tab);
  };

  const handleTabChangeToRegister = useCallback(() => {
    onTabChange('register');
  }, [onTabChange]);

  const handleTabChangeToLogin = useCallback(() => {
    onTabChange('login');
  }, [onTabChange]);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          className: "min-h-[500px]"
        }
      }}
    >
      <DialogTitle className="flex justify-between items-center">
        <Box className="flex-1">
          <Tabs
            value={activeTab === 'login' ? 0 : 1}
            onChange={handleTabChange}
            variant="fullWidth"
            indicatorColor="primary"
          >
            <Tab label="Connexion" />
            <Tab label="Inscription" />
          </Tabs>
        </Box>
        <IconButton
          onClick={onClose}
          size="small"
          className="ml-2"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent className="pt-4">
        <Box className="min-h-[400px]">
          {activeTab === 'login' ? (
            <LoginForm
              onSuccess={onClose}
              onSwitchToRegister={handleTabChangeToRegister}
            />
          ) : (
            <RegisterForm
              onSuccess={onClose}
              onSwitchToLogin={handleTabChangeToLogin}
            />
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};
