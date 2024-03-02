import styled from '@emotion/styled';
import { shouldForwardProp } from '@/libs/utils';
import { Button, Flex } from 'antd';

export const ButtonGroup = styled(Flex)`
  display: flex;
  border: none;
  padding: 2px 6px;
  border-radius: 4px;
  background: white;
`;
/*
  border: ${({ theme }) => theme.palette.grey[300]} 1px solid;
*/

export const ButtonGroupButton = styled(Button, {
  shouldForwardProp: shouldForwardProp<{ selected: boolean }>(['selected']),
})<{ selected: boolean }>`
  flex-grow: 1;
  margin: 0 1px;

`;
/*
border:${({ selected, theme }) =>
  selected ? `${theme.palette.text.primary} solid 1px` : 'none'};
text-transform: none;
color: ${({ selected, theme }) =>
  selected ? theme.palette.text.primary : theme.palette.grey[500]};
background-color: ${({ selected, theme }) =>
  selected ? theme.palette.grey[200] : 'rgba(0,0,0,0)'};
}
*/