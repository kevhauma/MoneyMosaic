import styled from '@emotion/styled';

import { Input } from 'antd';

const { TextArea: AntTextArea } = Input;

type AntTextAreaProps = Parameters<typeof AntTextArea>[0];

const StyledTextArea = styled(AntTextArea)`
  width: 100%;
  border: none;
  outline: none;
`;
/* 
 :disabled {
    background: ${({ theme, disabled }) =>
      disabled ? theme.palette.grey[300] : theme.palette.grey[100]};
  }
*/

export const TextArea = ({ value, ...props }: AntTextAreaProps) => {
  return <StyledTextArea value={value || ''} {...props} />;
};
