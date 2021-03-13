import { Box, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import React from 'react';
import EmailNumberHeading from '../EmailNumberHeading';

function SalesEmailThree({
  subjectLine,
  greeting,
  signoff,
  companyName,
  number,
}) {
  const bg = useColorModeValue('gray.50', 'gray.700');
  const color = useColorModeValue('blue.900', 'blue.50');
  const yellowBg = useColorModeValue('yellow.50', 'yellow.700');

  const whiteBG = useColorModeValue('white', 'gray.800');

  return (
    <VStack spacing={6} align="stretch">
      <EmailNumberHeading number={number} />
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
        boxShadow="base"
        spacing={2}
        bg={whiteBG}
        color={color}
        borderRadius="lg"
        p="8"
        align="stetch"
      >
        <Text>- - -</Text>
        <Text>{greeting}</Text>

        <Text>
          I run a website Design and Development Studio focused on working with
          NZ Financial and Professional Services companies exactly like{' '}
          <Text as="span" display="inline" color="purple.500" fontWeight="500">
            {companyName}
          </Text>
          .
        </Text>

        <Text>
          I've reached out to you because I can see that (ANALYSIS OF EXISTING
          WEBSITE), but it looks like (1 - 2 SMALL THINGS TO IMPROVE) could be
          improved to make the most of your web presence.
        </Text>

        <Text>
          Who is the best person to chat with about this? I've love to
          contribute to your business continuing to grow and succeed.
        </Text>

        <Text>{signoff}</Text>
        <Text>- - -</Text>
        <Text>Jason Crabtree</Text>
      </VStack>
    </VStack>
  );
}

export default SalesEmailThree;
