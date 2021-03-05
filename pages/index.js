import { Box, Center } from '@chakra-ui/react';
import React from 'react';

export default function Home(props) {
  console.log(props);

  return (
    <Box bg="tomato" h="100%" color="white">
      <h1>This is the Center</h1>
    </Box>
  );
}
