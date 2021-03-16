import { Tag, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import React from 'react';
import EmailNumberHeading from '../EmailNumberHeading';

function SalesEmailNine({
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
        <Tag
          colorScheme="pink"
          size="md"
          width="fit-content"
          p="2"
          textTransform="uppercase"
          fontWeight="bold"
        >
          Follow Up Email
        </Tag>
        <Text>- - -</Text>
        <Text>{greeting}</Text>

        <Text>
          I'm sending a final follow-up email to ask if you received my recent
          enquiry about a website project for{' '}
          <Text as="span" display="inline" color="purple.500" fontWeight="500">
            {companyName}
          </Text>
          . Please do let me know if you'd like to hear more — I look forward to
          hearing from you.
        </Text>

        <Text>
          Thanks for your time,
          <br />
          Jason
        </Text>
      </VStack>
    </VStack>
  );
}

export default SalesEmailNine;
