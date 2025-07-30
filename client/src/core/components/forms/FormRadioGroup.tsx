import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText
} from '@mui/material';
import { useFormContext } from './hooks/useFormContext';

type FormRadioGroupProps = {
  name: string;
  label: string;
  options: Array<{ value: string | number; label: string; }>;
  validators?: any;
  row?: boolean;
};

export const FormRadioGroup = ({
  name,
  label,
  options,
  validators,
  row = false
}: FormRadioGroupProps) => {
  const { form } = useFormContext();

  return (
    <form.Field name={name} validators={validators}>
      {(field: any) => (
        <FormControl error={!!field.state.meta.errors.length}>
          <FormLabel component="legend">{label}</FormLabel>
          <RadioGroup
            value={field.state.value || ''}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            row={row}
          >
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio />}
                label={option.label}
              />
            ))}
          </RadioGroup>
          {field.state.meta.errors.length > 0 && (
            <FormHelperText>{field.state.meta.errors.join(', ')}</FormHelperText>
          )}
        </FormControl>
      )}
    </form.Field>
  );
};
