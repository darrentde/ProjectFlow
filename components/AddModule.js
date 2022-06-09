import {
  Alert,
  AlertIcon,
  Button,
  ButtonGroup,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabase } from "../src/lib";
import { useAuth } from "../src/lib/auth/useAuth";

const AddModule = ({ isOpen, onClose, initialRef }) => {
  const [isLoading, setIsLoading] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { user } = useAuth();

  const [modulecode, setModuleCode] = useState("");

  const closeHandler = () => {
    setModuleCode("");
    onClose();
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    if (modulecode.length <= 5) {
      setErrorMessage("Description must have more than 5 characters");
      return;
    }
    setIsLoading(true);
    const { error } = await supabase
      .from("modules")
      .insert([{ code: modulecode, user_id: user.id }]);
    setIsLoading(false);
    if (error) {
      setErrorMessage(error.message);
    } else {
      closeHandler();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      initialFocusRef={initialRef}
    >
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={submitHandler}>
          <ModalHeader>Add Module</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {errorMessage && (
              <Alert status="error" borderRadius="lg" mb="6">
                <AlertIcon />
                <Text textAlign="center">{errorMessage}</Text>
              </Alert>
            )}
            <FormControl>
              <FormLabel>Module Code</FormLabel>
              <Input
                ref={initialRef}
                placeholder="e.g. CS1101S"
                onChange={(event) => setModuleCode(event.target.value)}
                value={modulecode}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <ButtonGroup spacing="3">
              <Button
                onClick={closeHandler}
                colorScheme="red"
                type="reset"
                isDisabled={isLoading}
              >
                Cancel
              </Button>
              <Button colorScheme="blue" type="submit" isLoading={isLoading}>
                Add
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AddModule;
