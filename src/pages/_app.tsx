import Head from 'next/head';
import '../styles/reset.css';
import '../styles/globals.css';

const hello = 'string';

function MyApp({ Component, pageProps }): any {
  return (
    <>
      <Head>
        <title>NextJS Base | Lodestone Studio</title>
        <link rel="shortcut icon" href="/Favicon.svg" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div>
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
