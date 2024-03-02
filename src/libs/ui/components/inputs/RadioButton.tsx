import { shouldForwardProp } from '@/libs/utils';
import styled from '@emotion/styled';
import { Flex } from 'antd';

const StyledCircle = styled(Flex, {
  shouldForwardProp: shouldForwardProp<{ checked: boolean }>(['checked']),
})<{ checked: boolean }>`
  color: green;
  width: 26px;
  height: 26px;
  backgroud: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
 
  :hover {
    cursor: pointer;
  }
`;
/*
 border: ${({ theme, checked }) =>
      checked ? theme.palette.primary.main : theme.palette.grey[500]}
    1px solid;
*/

const StyledInnerCircle = styled('div')`
  color: green;
  width: 16px;
  height: 16px;
  border-radius: 50%;
`;
/*
background: ${({ theme }) => theme.palette.primary.main};
*/

type RadioButtonProps<
  T extends string | number | { label: string; value: string | number }
> = {
  checked: boolean;
  option: T;
  onChange?: (p1: string | number) => void;
};
export const RadioButton = <
  T extends string | number | { label: string; value: string }
>({
  checked,
  onChange,
  option,
}: RadioButtonProps<T>) => {
  return (
    <Flex gap={1}>
      <StyledCircle
        checked={checked}
        onClick={() =>
          onChange?.(typeof option === 'object' ? option.value : option)
        }
      >
        {checked && <StyledInnerCircle />}
      </StyledCircle>
      {typeof option === 'object' ? option.label : option}
    </Flex>
  );
};
