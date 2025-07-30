import { FormControl, InputLabel, Select, MenuItem, FormHelperText, SelectProps } from '@mui/material';
import { useFormContext } from './hooks/useFormContext';
import { useFieldValue } from './hooks/useFormValues';

type FormSelectProps = {
  name: string;
  label: string;
  options: Array<{ value: string | number; label: string; }>;
  validators?: any;
} & Omit<SelectProps, 'value' | 'onChange' | 'error'>;

export const FormSelect = ({ name, label, options, validators, ...selectProps }: FormSelectProps) => {
  const { form } = useFormContext();

  const value = useFieldValue<string>(name);
  console.log('FormSelect value:', value);

  return (
    <form.Field name={name} validators={validators}>
      {(field: any) => (
        <FormControl fullWidth error={!!field.state.meta.errors.length}>
          <InputLabel>{label}</InputLabel>
          <Select
            {...selectProps}
            value={field.state.value || ''}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            label={label}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {field.state.meta.errors.length > 0 && (
            <FormHelperText>{field.state.meta.errors.join(', ')}</FormHelperText>
          )}
        </FormControl>
      )}
    </form.Field>
  );
};
