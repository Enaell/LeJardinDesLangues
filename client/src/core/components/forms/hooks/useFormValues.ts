import { useStore } from '@tanstack/react-form';
import { useFormContext } from './useFormContext';

export const useFormValues = <T = any>(): T => {
  const { form } = useFormContext();
  // Utilisation de useStore pour une réactivité correcte
  const state = useStore(form.store, (state: any) => state.values);
  return state as T;
};

export const useFieldValue = <T,>(fieldName: string): T => {
  const { form } = useFormContext();
  // Utilisation de useStore pour écouter les changements d'un champ spécifique

  const value = useStore(form.store, (state: any) => state.values[fieldName]);
  return value as T;
};
