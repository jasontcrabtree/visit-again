import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import '../styles/reset.css';
import '../styles/globals.css';
import Header from '../components/Nav';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import { Lato } from 'next/font/google'

const lato = Lato({ weight: "400", subsets: ['latin'], preload: true })

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={0}>
      <Head>
        <title>Visit Again</title>
        <link rel="shortcut icon" href="/Favicon.svg" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={lato.className}>
        <Header isLoggedIn={pageProps.loggedIn} />
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}

export const getServerSideProps = async (context: any): Promise<{
  props: {
    loggedIn: boolean;
    session: any
  }
}> => {
  const session = await getServerSession(
    context.req,
    context.res,
    authOptions
  );

  return {
    props: {
      loggedIn: session ? true : false,
      session: session ? session : null
    },
  };
};

export default MyApp;