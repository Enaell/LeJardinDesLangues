import { Autocomplete, TextField } from '@mui/material';
import { useFormContext } from './hooks/useFormContext';
import { AnyFormValidators } from './types';

type FormAutocompleteProps = {
  name: string;
  label: string;
  options: Array<{ value: string | number; label: string; }>;
  validators?: AnyFormValidators;
  multiple?: boolean;
  freeSolo?: boolean;
};

export const FormAutocomplete = ({
  name,
  label,
  options,
  validators,
  multiple = false,
  freeSolo = false
}: FormAutocompleteProps) => {
  const { form } = useFormContext();

  return (
    <form.Field name={name} validators={validators}>
      {(field) => (
        <Autocomplete
          multiple={multiple}
          freeSolo={freeSolo}
          options={options}
          getOptionLabel={(option) => {
            // Gérer les cas où option peut être un string ou un objet
            if (typeof option === 'string') {
              return option;
            }
            return option.label || '';
          }}
          value={field.state.value || (multiple ? [] : null)}
          onChange={(_, newValue) => field.handleChange(newValue)}
          onBlur={field.handleBlur}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              error={!!field.state.meta.errors.length}
              helperText={field.state.meta.errors.join(', ')}
            />
          )}
        />
      )}
    </form.Field>
  );
};
