import { Flex } from './Flex';
import { Input } from '../ui';

export type SimpleInputProps = {
  label?: string;
  value?: string;
  onChange: (p1: string) => void;
};

export const SimpleInput = ({ label, value, onChange }: SimpleInputProps) => {
  return (
    <Flex vertical>
      {label}
      <Input value={value} onChange={(e) => onChange(e.currentTarget.value)} />
    </Flex>
  );
};
