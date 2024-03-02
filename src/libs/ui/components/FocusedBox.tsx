import { ReactNode } from 'react';

import styled from '@emotion/styled';
import { shouldForwardProp } from '@/libs/utils';
import { Flex, FlexProps } from 'antd';

type SelectableBoxProps = {
  isSelected?: boolean;
};

const SelectableBox = styled(Flex, {
  shouldForwardProp: shouldForwardProp<SelectableBoxProps>(['isSelected']),
})<SelectableBoxProps>`
  position: relative;
 
`;
/*
 background: ${({ isSelected, theme }) =>
    isSelected ? theme.palette.primary.light : ''};
  color: ${({ isSelected, theme }) =>
    isSelected ? theme.palette.primary.main : 'rgba(0, 0, 0, 0.8)'};
*/
type ColoredStripeProps = { isSelected?: boolean };

const ColoredStripe = styled(Flex, {
  shouldForwardProp: shouldForwardProp<SelectableBoxProps>(['isSelected']),
})<ColoredStripeProps>`
  &:before {
    ${({ isSelected, theme }) =>
      isSelected
        ? {
            content: '""',
            padding: '2px',
            //background: theme.palette.primary.main,
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
          }
        : {}}
`;

export type FocusedBoxProps = FlexProps & {
  children: ReactNode;
  line?: boolean;
  isSelected?: boolean;
};
export const FocusedBox = ({
  children,
  isSelected,
  line,
  ...props
}: FocusedBoxProps) => (
  <SelectableBox isSelected={isSelected} {...props}>
    {line ? (
      <ColoredStripe isSelected={isSelected}>{children}</ColoredStripe>
    ) : (
      children
    )}
  </SelectableBox>
);
