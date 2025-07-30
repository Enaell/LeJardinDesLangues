import { ReactNode } from 'react';
import { useForm } from '@tanstack/react-form';
import { FormProvider } from './FormProvider';

type FormProps<TFormData> = {
  children: ReactNode;
  className?: string;
  onFormSubmit: (values: { value: TFormData; }) => void | Promise<void>;
  defaultValues?: TFormData;
  validators?: any;
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

  console.log(form.state.values);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted with values:', form.state.values);
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
