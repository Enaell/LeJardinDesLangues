import { TextField, TextFieldProps } from '@mui/material';
import { useFormContext } from './hooks/useFormContext';

type FormTextFieldProps = {
  name: string;
  validators?: any;
} & Omit<TextFieldProps, 'value' | 'onChange' | 'error' | 'helperText'>;

export const FormTextField = ({ name, validators, ...textFieldProps }: FormTextFieldProps) => {
  const { form } = useFormContext();
  return (
    <form.Field name={name} validators={validators}>
      {(field: any) => (
        <TextField
          {...textFieldProps}
          value={field.state.value || ''}
          onChange={(e) => field.handleChange(e.target.value)}
          error={!!field.state.meta.errors.length}
          helperText={field.state.meta.errors.join(', ')}
          onBlur={field.handleBlur}
        />
      )}
    </form.Field>
  );
};
