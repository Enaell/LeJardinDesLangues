import { TextField } from '@mui/material';
import { useFormContext } from './hooks/useFormContext';

type FormDatePickerProps = {
  name: string;
  label: string;
  validators?: any;
};

export const FormDatePicker = ({ name, label, validators }: FormDatePickerProps) => {
  const { form } = useFormContext();

  return (
    <form.Field name={name} validators={validators}>
      {(field: any) => (
        <TextField
          type="date"
          label={label}
          value={field.state.value || ''}
          onChange={(e) => field.handleChange(e.target.value)}
          error={!!field.state.meta.errors.length}
          helperText={field.state.meta.errors.join(', ')}
          onBlur={field.handleBlur}
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
        />
      )}
    </form.Field>
  );
};
