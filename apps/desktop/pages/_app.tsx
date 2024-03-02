import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { Roboto } from 'next/font/google';
import {
  AuthContext,
  CompanyContext,
  Footer,
  Header,
  StudentApplicationContext,
  StudentContext,
} from '@intern-place/components';
import { css } from '@emotion/react';

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] });

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>InternNexa</title>
        <link
          rel="stylesheet"
          href="https://unpkg.com/react-quill@1.3.3/dist/quill.snow.css"
        />
      </Head>
      <main className={roboto.className}>
        <AuthContext.AuthProvider>
          <StudentContext.StudentProvider>
            <CompanyContext.CompanyProvider>
              <StudentApplicationContext.StudentApplicationProvider>
                <Header />
                <div css={contentCss}>
                  <Component {...pageProps} />
                </div>

                <Footer />
              </StudentApplicationContext.StudentApplicationProvider>
            </CompanyContext.CompanyProvider>
          </StudentContext.StudentProvider>
        </AuthContext.AuthProvider>
      </main>
    </>
  );
}

export default CustomApp;

const contentCss = css`
  min-height: calc(100vh - 100px);
`;
