import { Heading } from '@chakra-ui/react';

function EmailNumberHeading({ number }) {
  return (
    <Heading
      as="h3"
      size="md"
      fontSize="2xl"
      color="green.600"
      textTransform="uppercase"
    >
      Email {number}
    </Heading>
  );
}

export default EmailNumberHeading;
