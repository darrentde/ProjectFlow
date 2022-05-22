import {
  Flex,
  Box,
  Button,
  FormControl,
  Input,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  InputLeftElement,
  InputGroup,
} from "@chakra-ui/react";
import { useRef } from "react";
import { MdEmail, MdPassword } from "react-icons/md";

function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef();
  const finalRef = useRef();

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
          <ModalBody pb={6}>
            <FormControl>
              <InputGroup>
                <InputLeftElement children={<MdEmail />} />
                <Input ref={initialRef} placeholder="Email" />
              </InputGroup>
            </FormControl>

            <FormControl mt={4}>
              <InputGroup>
                <InputLeftElement children={<MdPassword />} />
                <Input ref={initialRef} placeholder="Password" />
              </InputGroup>
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
}

export default Navbar;
