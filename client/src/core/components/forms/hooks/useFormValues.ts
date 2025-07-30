import { useStore } from '@tanstack/react-form';
import { useFormContext } from './useFormContext';

export const useFormValues = <T>(): T => {
  const { form } = useFormContext();
  const state: T = useStore(form.store, (state) => state.values);
  return state;
};

export const useFieldValue = <T,>(fieldName: string): T => {
  const { form } = useFormContext();
  const value: T = useStore(form.store, (state) => state.values[fieldName]);
  return value;
};
