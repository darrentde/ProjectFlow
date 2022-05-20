import {
        Flex, Box, Button, 
        FormControl, Input, FormLabel,
        Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter,
        useDisclosure
      } from "@chakra-ui/react";
import {useRef} from 'react'

function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = useRef()
  const finalRef = useRef()
  
  return (
    <Box h="50px" w="100%">
      <Flex padding={5} float="right">
        <Button onClick={onOpen}>Login / Sign up</Button>
      </Flex>
    
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader> Login</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6} >
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input ref={initialRef} placeholder='email' />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <Input ref={initialRef} placeholder='password' />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button mr={3}>Create</Button>
              <Button>Login</Button>
            </ModalFooter>

          </ModalContent>
      </Modal>
    </Box>

  );
};

export default Navbar;
