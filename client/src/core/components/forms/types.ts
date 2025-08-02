import { FormValidators, ReactFormExtendedApi } from "@tanstack/react-form";

// Type pour le contexte de formulaire
export type FormContextType = {
  form: AnyReactFormExtendedApi;
  //  form: FormApi<TFormData>;

} | null;

export type AnyFormValidators = FormValidators<any, any, any, any, any, any, any, any>;

export type AnyReactFormExtendedApi = ReactFormExtendedApi<any, any, any, any, any, any, any, any, any, any>;
