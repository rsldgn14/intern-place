import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { Header } from '@intern-place/components';
import { Roboto } from 'next/font/google';

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] });

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>InternNexa</title>
      </Head>
      <main className={roboto.className}>
        <Header />
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
