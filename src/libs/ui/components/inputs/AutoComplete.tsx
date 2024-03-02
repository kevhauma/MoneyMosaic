import {
  AutoComplete as AntAutocomplete,
  AutoCompleteProps as AntAutocompleteProps,
} from 'antd';

export const Autocomplete = ({ ...props }: AntAutocompleteProps) => {
  return <AntAutocomplete style={{ width: 200 }} {...props} />;
};
