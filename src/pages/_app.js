import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Sales Emails | Lodestone Studio</title>
        <link rel="shortcut icon" href="/refresh-cw.svg" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
        <div>
          <Component {...pageProps} />
        </div>

    </>
  );
}

export default MyApp;
