import { useContext } from 'react';
import { FormContext } from '../FormProvider';
import { FormContextType } from '../types';

export const useFormContext = <TFormData = any>(): NonNullable<FormContextType<TFormData>> => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context as NonNullable<FormContextType<TFormData>>;
};
