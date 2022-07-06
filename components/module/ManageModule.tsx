import {
  Alert,
  AlertIcon,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuth } from "../../src/lib/auth/useAuth";
import { supabase } from "../../src/lib/supabase";

const ManageTodo = ({
  isOpen,
  onClose,
  initialRef,
  todo,
  setTodo,
  deleteHandler,
  // isDeleteLoading,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { user } = useAuth();

  const [modulecode, setModuleCode] = useState("");

  const closeHandler = () => {
    setModuleCode("");
    setTodo(null);
    onClose();
  };

  useEffect(() => {
    if (todo) {
      setModuleCode(todo.code);
    }
  }, [todo]);

  const submitHandler = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    if (modulecode.length <= 1) {
      setErrorMessage("Module must have more than 1 character");
      return;
    }

    setIsLoading(true);
    let supabaseError;
    if (todo) {
      const { error } = await supabase
        .from("modules")
        .update({ code: modulecode, user_id: user.id })
        .eq("id", todo.id); // add WHERE clause
      supabaseError = error;
    }

    // else {
    //   const { error } = await supabase
    //     .from("modules")
    //     .insert([{ code: modulecode, user_id: user.id }]);
    //   supabaseError = error;
    // }

    setIsLoading(false);
    if (supabaseError) {
      setErrorMessage(supabaseError.message);
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
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={submitHandler}>
          <ModalHeader>{todo ? "Update Todo" : "Add Todo"}</ModalHeader>
          <ModalCloseButton onClick={closeHandler} />
          <ModalBody pb={6}>
            {errorMessage && (
              <Alert status="error" borderRadius="lg" mb="6">
                <AlertIcon />
                <Text textAlign="center">{errorMessage}</Text>
              </Alert>
            )}
            <FormControl isRequired>
              <FormLabel>Module</FormLabel>
              <Input
                ref={initialRef}
                placeholder={modulecode}
                onChange={(event) => setModuleCode(event.target.value)}
                value={modulecode}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <ButtonGroup spacing="3">
              <Button
                onClick={(event) => {
                  event.stopPropagation();
                  deleteHandler(todo.id);
                  closeHandler();
                }}
                colorScheme="red"
                type="reset"
                isDisabled={isLoading}
              >
                Delete
              </Button>
              <Button colorScheme="blue" type="submit" isLoading={isLoading}>
                {todo ? "Update" : "Save"}
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default ManageTodo;
