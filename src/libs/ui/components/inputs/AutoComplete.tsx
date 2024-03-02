import { AutoComplete as AntAutocomplete, AutoCompleteProps as AntAutocompleteProps } from 'antd';



export const Autocomplete = ({
  ...props
}: AntAutocompleteProps) => {
  return (
    <AntAutocomplete
      {...props}
    />
  );
};
