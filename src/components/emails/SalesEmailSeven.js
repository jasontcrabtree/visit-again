import { Box, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import React from 'react';
import EmailNumberHeading from '../EmailNumberHeading';

function SalesEmailSeven({
  number,
  subjectLine,
  greeting,
  signoff,
  companyName,
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
          I'm sure you've seen the latest (CHANGE) that (COMPETITOR) has
          implemented. Investing in (FACTOR) is an effective way to overcome
          (KEY ISSUE IN INDUSTRY).
        </Text>

        <Text>
          I specialise in working with clients to (DESIRED CHANGE) focused on
          business value, and thought that may be of interest. Does this type of
          project line up with your company plans for 2021?
        </Text>

        <Text>
          If you want to chat about this in more detail, I'm happy to organise a
          call at your convenience.
        </Text>

        <Text>{signoff}</Text>
        <Text>- - -</Text>
        <Text>Jason Crabtree</Text>
      </VStack>
    </VStack>
  );
}

export default SalesEmailSeven;
