import { FormControlLabel, Checkbox, FormHelperText, FormControl } from '@mui/material';
import { useFormContext } from './hooks/useFormContext';
import { AnyFormValidators } from './types';

type FormCheckboxProps = {
  name: string;
  label: string;
  validators?: AnyFormValidators;
};

export const FormCheckbox = ({ name, label, validators }: FormCheckboxProps) => {
  const { form } = useFormContext();

  return (
    <form.Field name={name} validators={validators}>
      {(field) => (
        <FormControl error={!!field.state.meta.errors.length}>
          <FormControlLabel
            control={
              <Checkbox
                checked={field.state.value || false}
                onChange={(e) => field.handleChange(e.target.checked)}
                onBlur={field.handleBlur}
              />
            }
            label={label}
          />
          {field.state.meta.errors.length > 0 && (
            <FormHelperText>{field.state.meta.errors.join(', ')}</FormHelperText>
          )}
        </FormControl>
      )}
    </form.Field>
  );
};
