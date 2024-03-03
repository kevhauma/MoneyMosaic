'use client';
import '@/feature-i18n';
import { ReactNode } from 'react';
import { theme } from '@/libs/ui';
import { RecoilRoot } from 'recoil';
import styled from '@emotion/styled';
import { ConfigProvider, Flex } from 'antd';

import '@/feature-dates';

const PageWrapper = styled(Flex)`
  height: 100vh;
  max-height: 100vh;
  width: 100%;
  max-width: 100vw;
`;

type LayoutProps = {
  children: ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <ConfigProvider theme={theme}>
      <RecoilRoot>
        <PageWrapper>{children}</PageWrapper>
      </RecoilRoot>
    </ConfigProvider>
  );
};
