import styled from '@emotion/styled';
import { Flex, FlexProps } from 'antd';
import { PropsWithChildren } from 'react';

const HoverableIconsWrapper = styled(Flex)`
  all: unset;
  position: relative;
  height: 100%;
  > .icons {
    position: absolute;
    right: 0;
    top: 0;
    opacity: 0;
    height: 100%;
    transition: 0.2s ease;
    transition-delay: 0.1s;
  }
  :hover > .icons {
    opacity: 1;
  }
`;
type HoverableIconsProps = PropsWithChildren &
  FlexProps & {
    icons: React.ReactNode;
  };
export const HoverableIcons = ({
  children,
  icons,
  ...props
}: HoverableIconsProps) => {
  return (
    <HoverableIconsWrapper {...props}>
      {children}
      <Flex className="icons">{icons}</Flex>
    </HoverableIconsWrapper>
  );
};
