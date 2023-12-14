import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import '../styles/reset.css';
import '../styles/globals.css';
import Header from '../components/Nav';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={0}>
      <Head>
        <title>Visit Again</title>
        <link rel="shortcut icon" href="/Favicon.svg" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <>
        {/* <GlobalStyle /> */}
        <Header />
        <Component {...pageProps} />
      </>
    </SessionProvider>
  );
}

export default MyApp;
