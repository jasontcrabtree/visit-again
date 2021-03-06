import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useClipboard,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import React, { useRef, useState } from 'react';

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [value, setValue] = useState('');
  const { hasCopied, onCopy } = useClipboard(value);

  const textRef = useRef();

  const bg = useColorModeValue('gray.50', 'gray.700');
  const color = useColorModeValue('blue.900', 'blue.50');

  const actionText = useColorModeValue('gray.50', 'gray.900');
  const actionColor = useColorModeValue('blue.900', 'blue.50');

  return (
    <VStack
      m="auto"
      px="16"
      py="16"
      spacing={8}
      align="stretch"
      bg={bg}
      color={color}
      shadow="md"
      borderRadius="md"
      maxWidth={[320, 640, 1040]}
    >
      <Flex>
        <Heading as="h1" fontSize="5xl">
          Sales Emails
        </Heading>
        <Spacer />
        <Button
          onClick={toggleColorMode}
          px="4"
          py="4"
          w="fit-content"
          bg={actionColor}
          color={actionText}
          size="sm"
          align="flex-end"
          alignSelf="center"
        >
          Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
        </Button>
      </Flex>

      <Box>
        <Heading as="h2" size="md">
          ToC
        </Heading>
      </Box>

      <Box>
        <Heading as="h2" size="md">
          Inputs
        </Heading>
      </Box>

      <VStack spacing={6} align="stretch">
        <Heading as="h2" size="md">
          Quickview
        </Heading>
        <Box>
          <Button onClick={onOpen}>Open Modal</Button>

          <Modal isOpen={isOpen} onClose={onClose} size="4xl" isCentered>
            <ModalOverlay />
            <ModalContent p="12" py="8" bg={bg} color={color}>
              <ModalHeader>Sales Emails Lightbox</ModalHeader>
              <ModalCloseButton />

              <ModalBody>
                <Tabs variant="soft-rounded" colorScheme="green">
                  <TabList>
                    <Tab>One</Tab>
                    <Tab>Two</Tab>
                    <Tab>Three</Tab>
                  </TabList>
                  <Divider mt="2" />

                  <TabPanels py="12">
                    <TabPanel>
                      <p>one!</p>
                    </TabPanel>
                    <TabPanel>
                      <p>two!</p>
                    </TabPanel>
                    <TabPanel>
                      <p>three!</p>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </ModalBody>

              <ModalFooter>
                <Button variant="ghost">Secondary Action</Button>
                <Button colorScheme="cyan" mr={3} onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </VStack>

      <VStack spacing={2} align="stretch">
        <Heading as="h2" size="lg">
          Emails
        </Heading>
        {/* {textRef.current ? console.log(textRef.current.innerHTML) : ''} */}
        <Text maxW="56ch" lineHeight="1.7" ref={textRef}>
          The body of knowledge, especially of a traditional, anecdotal, or
          popular nature, on a particular subject
        </Text>
        <Button onClick={onCopy} ml={2}>
          {hasCopied ? 'Copied' : 'Copy'}
        </Button>
      </VStack>
    </VStack>
  );
}
