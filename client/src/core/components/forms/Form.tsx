import { ReactNode } from 'react';
import { useForm } from '@tanstack/react-form';
import { FormProvider } from './FormProvider';
import { AnyFormValidators } from './types';

type FormProps<TFormData> = {
  children: ReactNode;
  className?: string;
  onFormSubmit: (values: { value: TFormData; }) => void | Promise<void>;
  defaultValues?: TFormData;
  validators?: AnyFormValidators;
};

export const Form = <TFormData,>({
  children,
  className,
  onFormSubmit,
  defaultValues,
  validators,
}: FormProps<TFormData>) => {
  const form = useForm({
    defaultValues,
    validators,
    onSubmit: async ({ value }) => {
      await onFormSubmit({ value });
    }
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    form.handleSubmit();
  };

  return (
    <FormProvider form={form}>
      <form onSubmit={handleSubmit} className={className}>
        {children}
      </form>
    </FormProvider>
  );
};
