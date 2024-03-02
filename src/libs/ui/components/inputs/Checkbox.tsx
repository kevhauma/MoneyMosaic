import {Checkbox as AntCheckbox, CheckboxProps } from 'antd';

export const Checkbox = ({
  children,
...props
}: CheckboxProps) => {
  return (
<AntCheckbox {...props} >{children}</AntCheckbox>
  );
};
