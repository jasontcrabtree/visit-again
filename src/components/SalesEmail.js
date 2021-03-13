import { Box, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import React from 'react';

function SalesEmail({ subjectLine, greeting, signoff, companyName }) {
  const bg = useColorModeValue('gray.50', 'gray.700');
  const color = useColorModeValue('blue.900', 'blue.50');
  const yellowBg = useColorModeValue('yellow.50', 'yellow.700');

  const whiteBG = useColorModeValue('white', 'gray.800');

  return (
    <VStack spacing={4} align="stretch">
      <Text
        fontWeight="600"
        bg={yellowBg}
        color={color}
        border="1px"
        borderColor={color}
        width="fit-content"
        p="2"
        py="1"
        borderRadius="md"
      >
        {subjectLine}
      </Text>
      <VStack
        spacing={2}
        bg={whiteBG}
        color={color}
        borderRadius="lg"
        p="8"
        align="stetch"
      >
        <Text>
          - - -<br />
          {greeting}
        </Text>
        <Text>
          Who is the best person in {companyName} to talk with about a new
          website project?
        </Text>
        <Text>
          I noticed (5 - 10 words analysis of website). Based on this, I have
          several suggestions for how you could further improve the performance
          and effectiveness of your website.
        </Text>
        <Text>Please let me know the best person to discuss this with.</Text>
        <Text>{signoff}</Text>
        <Text>
          - - -
          <br />
          Jason Crabtree
        </Text>
      </VStack>
    </VStack>
  );
}

export default SalesEmail;
