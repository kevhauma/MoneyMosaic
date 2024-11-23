import { Flex } from './Flex';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui';

export type SimpleSelectProps = {
  label?: string;
  value?: string;
  onChange: (p1: string) => void;
  options: Array<string> | Array<{ key: string; label: string }>;
};
export const SimpleSelect = ({
  label,
  value,
  onChange,
  options,
}: SimpleSelectProps) => {
  return (
    <Flex vertical>
      {label}
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => {
              const optionKey =
                typeof option === 'string' ? option : option.key;
              const optionLabel =
                typeof option === 'string' ? option : option.label;
              return <SelectItem value={optionKey}>{optionLabel}</SelectItem>;
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Flex>
  );
};
