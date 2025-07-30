import { Button, ButtonProps } from '@mui/material';
import { useFormContext } from './hooks/useFormContext';

type FormSubmitButtonProps = {
  children: React.ReactNode;
} & Omit<ButtonProps, 'type' | 'disabled'>;

export const FormSubmitButton = ({ children, ...buttonProps }: FormSubmitButtonProps) => {
  const { form } = useFormContext();

  return (
    <Button
      {...buttonProps}
      type="submit"
      disabled={!form.state.canSubmit}
    >
      {children}
    </Button>
  );
};
