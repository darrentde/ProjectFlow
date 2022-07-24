import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  MenuItem,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useAuth } from "../../src/lib/auth/useAuth";

const Logout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { signOut } = useAuth();
  const initialRef = useRef();
  const finalRef = useRef();

  const handleSignout = () => {
    signOut();
    onClose();
  };

  return (
    <div>
      {/* Button to open modal */}

      {/* <Button
          bgColor="brand.400"
          textColor="white"
          _hover={{ bg: "brand.300" }}
          onClick={onOpen}
        >
          Logout
        </Button> */}

      <MenuItem onClick={onOpen}>Logout</MenuItem>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>See you soon</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Button
                bgColor="brand.400"
                textColor="white"
                _hover={{ bg: "brand.300" }}
                onClick={handleSignout}
              >
                Signout
              </Button>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Logout;
