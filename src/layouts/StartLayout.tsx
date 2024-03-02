'use client';
import { Layout } from 'antd';
import { PropsWithChildren } from 'react';
import { AppHeader } from './AppHeader';
const { Header, Content } = Layout;

export const StartLayout = ({ children }: PropsWithChildren) => {
  return (
    <Layout>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <AppHeader></AppHeader>
      </Header>
      <Content>{children}</Content>
    </Layout>
  );
};
