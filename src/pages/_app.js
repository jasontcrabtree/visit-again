import { Box, ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import Head from 'next/head';

import customTheme from '../utils/theme';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Sales Emails | Lodestone Studio</title>
        <link rel="shortcut icon" href="/star.svg" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ColorModeScript initialColorMode={customTheme.config.initialColorMode} />
      <ChakraProvider resetCSS theme={customTheme}>
        <Box w="100%" h="100%" p={[4, 8, 24]} pt={[4, 8, 12]}>
          <Component {...pageProps} />
        </Box>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
