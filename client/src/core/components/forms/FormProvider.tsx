import { createContext, ReactNode } from 'react';
import { FormApi, FormContextType } from './types';

export const FormContext = createContext<FormContextType>(null);

type FormProviderProps<TFormData = any> = {
  form: FormApi<TFormData>;
  children: ReactNode;
};

export const FormProvider = <TFormData,>({ form, children }: FormProviderProps<TFormData>) => {
  return (
    <FormContext.Provider value={{ form }}>
      {children}
    </FormContext.Provider>
  );
};
