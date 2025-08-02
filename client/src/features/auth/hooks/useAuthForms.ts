import { useState, useEffect } from 'react';
import { useRegister, useLogin } from './useAuth';
import type { RegisterRequest, LoginRequest } from '../types';

// Hook pour gérer le formulaire d'inscription
export const useRegisterForm = (onSuccess?: () => void) => {
  const [formData, setFormData] = useState<RegisterRequest>({
    username: '',
    email: '',
    password: '',
    name: '',
    nativeLanguage: 'fr',
    targetLanguage: 'zh',
  });

  const registerMutation = useRegister();

  // Surveiller le succès de la mutation
  useEffect(() => {
    if (registerMutation.isSuccess && onSuccess) {
      onSuccess();
    }
  }, [registerMutation.isSuccess, onSuccess]);

  const updateField = (field: keyof RegisterRequest, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
      name: '',
      nativeLanguage: 'fr',
      targetLanguage: 'zh',
    });
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    return registerMutation.mutate(formData);
  };

  const isFormValid = () => {
    return (
      formData.username.length >= 3 &&
      formData.email.includes('@') &&
      formData.password.length >= 8 &&
      formData.name.length > 0 &&
      formData.nativeLanguage.length === 2 &&
      formData.targetLanguage.length === 2
    );
  };

  return {
    formData,
    updateField,
    resetForm,
    handleSubmit,
    isFormValid: isFormValid(),
    isLoading: registerMutation.isPending,
    isSuccess: registerMutation.isSuccess,
    isError: registerMutation.isError,
    error: registerMutation.error,
  };
};

// Hook pour gérer le formulaire de connexion
export const useLoginForm = (onSuccess?: () => void) => {
  const [formData, setFormData] = useState<LoginRequest>({
    emailOrUsername: '',
    password: '',
  });

  const loginMutation = useLogin();

  // Surveiller le succès de la mutation
  useEffect(() => {
    if (loginMutation.isSuccess && onSuccess) {
      onSuccess();
    }
  }, [loginMutation.isSuccess, onSuccess]);

  const updateField = (field: keyof LoginRequest, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      emailOrUsername: '',
      password: '',
    });
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    return loginMutation.mutate(formData);
  };

  const isFormValid = () => {
    return (
      formData.emailOrUsername.length > 0 &&
      formData.password.length > 0
    );
  };

  return {
    formData,
    updateField,
    resetForm,
    handleSubmit,
    isFormValid: isFormValid(),
    isLoading: loginMutation.isPending,
    isSuccess: loginMutation.isSuccess,
    isError: loginMutation.isError,
    error: loginMutation.error,
  };
};

// Hook pour la validation côté client (optionnel)
export const useAuthValidation = () => {
  const validateUsername = (username: string): string | null => {
    if (username.length < 3) {
      return 'Le nom d\'utilisateur doit contenir au moins 3 caractères';
    }
    if (username.length > 50) {
      return 'Le nom d\'utilisateur ne peut pas dépasser 50 caractères';
    }
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      return 'Le nom d\'utilisateur ne peut contenir que des lettres, chiffres, tirets et underscores';
    }
    return null;
  };

  const validateEmail = (email: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'L\'adresse email n\'est pas valide';
    }
    return null;
  };

  const validatePassword = (password: string): string | null => {
    if (password.length < 8) {
      return 'Le mot de passe doit contenir au moins 8 caractères';
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return 'Le mot de passe doit contenir au moins une minuscule, une majuscule et un chiffre';
    }
    return null;
  };

  const validateName = (name: string): string | null => {
    if (name.length === 0) {
      return 'Le nom est requis';
    }
    if (name.length > 100) {
      return 'Le nom ne peut pas dépasser 100 caractères';
    }
    return null;
  };

  const validateLanguageCode = (code: string): string | null => {
    if (!/^[a-z]{2}$/.test(code)) {
      return 'Le code de langue doit être au format ISO 639-1 (2 lettres)';
    }
    return null;
  };

  return {
    validateUsername,
    validateEmail,
    validatePassword,
    validateName,
    validateLanguageCode,
  };
};
