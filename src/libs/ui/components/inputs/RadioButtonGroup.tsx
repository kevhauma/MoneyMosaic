import { RadioButton } from './RadioButton';
import { Flex } from 'antd';

export type RadioButtonGroupProps =  {
  options: Array<string | number | { label: string; value: string }>;
  value?: number | string;
  onChange: (value: string | number) => void;
};

export const RadioButtonGroup = ({
  options,
  value: selectedValue,
  onChange,
}: RadioButtonGroupProps) => {
  return (
    
      <Flex gap={1}>
        {options.map((option) => {
          const value = typeof option === 'object' ? option.value : option;
          return (
            <RadioButton
              key={value}
              option={option}
              checked={value === selectedValue}
              onChange={onChange}
            />
          );
        })}
        </Flex>

  );
};
