import { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useFormContext } from './hooks/useFormContext';

type FormPasswordFieldProps = {
  name: string;
  validators?: any;
  label?: string;
  placeholder?: string;
  fullWidth?: boolean;
};

export const FormPasswordField = ({ name, validators, ...props }: FormPasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const { form } = useFormContext();

  return (
    <form.Field
      name={name}
      validators={validators}
    >
      {(field: {
        state: {
          value: string;
          meta: { errors: string[]; };
        };
        handleChange: (value: string) => void;
        handleBlur: () => void;
      }) => (
        <TextField
          {...props}
          type={showPassword ? 'text' : 'password'}
          value={field.state.value || ''}
          onChange={(e) => field.handleChange(e.target.value)}
          error={!!field.state.meta.errors.length}
          helperText={field.state.meta.errors.join(', ')}
          onBlur={field.handleBlur}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}
    </form.Field>
  );
};
