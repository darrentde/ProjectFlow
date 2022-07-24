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
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../src/lib/auth/useAuth";
import { supabase } from "../../src/lib/supabase";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { setToggle } from "../../redux/ToggleDataSlice";
import AlertDialogModal from "../template/AlertDialogModal";

const ManageTodo = ({
  isOpen,
  onClose,
  initialRef,
  todo,
  setTodo,
  deleteHandler,
  // isDeleteLoading,
}) => {
  const toggle = useAppSelector((state) => state.toggledata.value);
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { user } = useAuth();

  const [modulecode, setModuleCode] = useState("");

  // Confirmation for delete Modal Popup
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const cancelRef = useRef();

  const closeHandler = () => {
    setModuleCode("");
    setTodo(null);
    dispatch(setToggle());
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

  const onDeleteHandler = (event) => {
    event.stopPropagation();
    deleteHandler(todo.id);
    closeHandler();
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
              {/* Add an alert dialog */}

              <Button colorScheme="red" onClick={onOpenDelete}>
                Delete
              </Button>

              <AlertDialog
                isOpen={isOpenDelete}
                leastDestructiveRef={cancelRef}
                onClose={onCloseDelete}
              >
                <AlertDialogOverlay>
                  <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                      Delete Module
                    </AlertDialogHeader>

                    <AlertDialogBody>
                      Are you sure? This will delete all associated todo entries
                      and this action cannot be undone afterwards.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                      <Button ref={cancelRef} onClick={onCloseDelete}>
                        Cancel
                      </Button>
                      <Button
                        colorScheme="red"
                        onClick={onDeleteHandler} //need to change this
                        ml={3}
                      >
                        Delete
                      </Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialogOverlay>
              </AlertDialog>

              {/* <Button
                onClick={(event) => {
                  event.stopPropagation();
                  deleteHandler(todo.id);
                  closeHandler();
                }}
                colorScheme="red"
                type="reset"
                isDisabled={isLoading}
              >
                Delete Manage
              </Button> */}

              {/* Second button for Update/Save */}
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
