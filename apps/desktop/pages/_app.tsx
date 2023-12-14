import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { Roboto } from 'next/font/google';
import {
  AuthContext,
  Footer,
  Header,
  StudentApplicationContext,
} from '@intern-place/components';
import { css } from '@emotion/react';

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] });

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>InternNexa</title>
      </Head>
      <main className={roboto.className}>
        <AuthContext.AuthProvider>
          <StudentApplicationContext.StudentApplicationProvider>
            <Header />
            <div css={contentCss}>
              <Component {...pageProps} />
            </div>

            <Footer />
          </StudentApplicationContext.StudentApplicationProvider>
        </AuthContext.AuthProvider>
      </main>
    </>
  );
}

export default CustomApp;

const contentCss = css`
  min-height: calc(100vh - 100px);
`;
