import { shouldForwardProp } from '@/libs/utils';
import styled from '@emotion/styled';
import { Flex, InputProps } from 'antd';

type Props = InputProps & {
  error?: boolean;
  dirty?: boolean;
};

export const InputWrapper = styled(Flex, {
  shouldForwardProp: shouldForwardProp<Props>(['error', 'disabled', 'dirty']),
})<Props>``;

/*
 display: flex;
  flex-direction: row;
  align-items: center;
  background: ${({ theme, disabled }) =>
    disabled ? theme : theme.palette.grey[100]};
  border: ${({ theme, error, dirty }) =>
      error
        ? theme.palette.error.main
        : dirty
        ? theme.palette.info.main
        : theme.palette.grey[300]}
    1px solid;
  color: ${({ theme }) => theme.palette.text.primary};
  border-radius: 5px;
  padding: 4px 8px;
  font-size: 0.8em;
  & input:disabled {
    cursor: not-allowed;
  }
  &:focus-within {
    border: 1px solid ${({ theme }) => theme.palette.primary.main};
  }

*/
