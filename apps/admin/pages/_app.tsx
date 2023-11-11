import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import Main from '../layout/Main';
import { ConfigProvider, theme } from 'antd';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>InterNexa Admin</title>
      </Head>

      <ConfigProvider
        theme={{
          algorithm: theme.defaultAlgorithm,

          token: {
            fontFamilyCode: 'Montserrat, sans-serif',
            colorPrimary: '#C8A2C8',
            colorLink: '#1890ff',
            colorError: '#f5222d',
            fontSize: 14,
            colorText: 'rgba(0, 0, 0,)',
            colorTextSecondary: 'rgba(0, 0, 0, 0.45)',
            colorTextHeading: 'rgba(0, 0, 0, 0.85)',
            colorBorder: '#d9d9d9',
            boxShadow:
              '0 3px 16px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08),0 9px 28px 8px rgba(0, 0, 0, 0.05)',
            borderRadius: 10,
          },
          components: {
            Checkbox: {
              borderRadius: 4,
            },
            Layout: {
              headerBg: 'white',
            },
          },
        }}
      >
        <Main>
          <main className="app">
            <Component {...pageProps} />
          </main>
        </Main>
      </ConfigProvider>
    </>
  );
}

export default CustomApp;
