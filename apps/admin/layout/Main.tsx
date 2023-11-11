import { PropsWithChildren } from 'react';
import NavBar from './navigation/NavBar';
import { Layout } from 'antd';
import Logo from './navigation/Logo';

export default function Main({ children }: PropsWithChildren) {
  return (
    <>
      <Layout>
        <Layout>
          <Layout.Header
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Logo />
            <NavBar />
          </Layout.Header>
        </Layout>

        <Layout.Content style={{ height: 'calc(100vh  - 64px)' }}>
          {children}
        </Layout.Content>
      </Layout>
    </>
  );
}
