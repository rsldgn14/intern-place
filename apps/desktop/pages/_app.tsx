import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { Roboto } from 'next/font/google';
import { AuthContext, Header } from '@intern-place/components';

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] });

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>InternNexa</title>
      </Head>
      <main className={roboto.className}>
        <AuthContext.AuthProvider>
          <Header />
          <Component {...pageProps} />
        </AuthContext.AuthProvider>
      </main>
    </>
  );
}

export default CustomApp;
