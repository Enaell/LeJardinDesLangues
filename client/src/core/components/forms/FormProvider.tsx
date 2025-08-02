import { createContext, ReactNode } from 'react';
import { AnyReactFormExtendedApi, FormContextType } from './types';

export const FormContext = createContext<FormContextType>(null);

type FormProviderProps = {
  // form: AnyFormApi;
  form: AnyReactFormExtendedApi,
  children: ReactNode;
};

export const FormProvider = ({ form, children }: FormProviderProps) => {
  return (
    <FormContext.Provider value={{ form }}>
      {children}
    </FormContext.Provider>
  );
};
