import { Flex } from './Flex';
import { Input } from './ui';

type Props = {
  label?: string;
  value?: string;
  onChange: (p1: string) => void;
};

export const SimpleInput = ({ label, value, onChange }: Props) => {
  return (
    <Flex vertical>
      {label}
      <Input value={value} onChange={(e) => onChange(e.currentTarget.value)} />
    </Flex>
  );
};
