import { SimpleInput, SimpleInputProps } from '../custom';
import { FormField } from '../ui/form';
import { Control, FieldValues, Path } from 'react-hook-form';

type Props<T extends FieldValues> = Omit<
  SimpleInputProps,
  'value' | 'onChange'
> & {
  formControl: Control<T>;
  name: Path<T>;
};

export const FormInput = <T extends FieldValues>({
  formControl,
  name,
  ...inputProps
}: Props<T>) => {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <SimpleInput
          value={field.value}
          onChange={field.onChange}
          {...inputProps}
        />
      )}
    />
  );
};
