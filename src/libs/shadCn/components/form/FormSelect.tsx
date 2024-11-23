import { SimpleSelectProps, SimpleSelect } from '../custom';
import { FormField } from '../ui/form';
import { Control, FieldValues, Path } from 'react-hook-form';

type Props<T extends FieldValues> = Omit<
  SimpleSelectProps,
  'value' | 'onChange'
> & {
  formControl: Control<T>;
  name: Path<T>;
};

export const FormSelect = <T extends FieldValues>({
  formControl,
  name,
  ...selectProps
}: Props<T>) => {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <SimpleSelect
          value={field.value}
          onChange={field.onChange}
          {...selectProps}
        />
      )}
    />
  );
};
