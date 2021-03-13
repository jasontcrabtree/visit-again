import { Box, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import React from 'react';
import EmailNumberHeading from '../EmailNumberHeading';

function SalesEmailTwo({
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
          Who is the best person in{' '}
          <Text as="span" display="inline" color="purple.500" fontWeight="500">
            {companyName}
          </Text>{' '}
          to talk with about a new website project?
        </Text>

        <Text>
          I run a freelance design and development studio in Auckland and would
          love to chat about how we can make sure your website is putting its
          best foot forward.
        </Text>

        <Text>
          (ANALYSIS OF EXISTING WEBSITE). Industry resources such as the Google
          Developer Program and the Hubspot Blog show how crucial these
          (EXISTING WEBSITE) can be to helping your business succeed, and it's
          important to do regular maintenance and improvements.
        </Text>

        <Text>
          I'd appreciate you putting me in touch with the right person to
          explore a customised solution for your business needs.
        </Text>

        <Text>{signoff}</Text>
        <Text>- - -</Text>
        <Text>Jason Crabtree</Text>
      </VStack>
    </VStack>
  );
}

export default SalesEmailTwo;
