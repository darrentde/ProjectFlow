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
  Select,
  Switch,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabase } from "../../src/lib/supabase";
// import { useAuth } from "../../src/lib/auth/useAuth";

const ManageTodo = ({
  isOpen,
  onClose,
  initialRef,
  todo,
  setTodo,
  deleteHandler,
  isDeleteLoading,
  modules,
  // setModule,
}) => {
  // const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [mod, setMod] = useState("");

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description);
      setIsComplete(todo.isComplete);
      // setMod((check) => mod.check)(todo.module_id));
      supabase
        .from("modules")
        .select("id")
        .eq("id", todo.module_id)
        // .order("id", { ascending: false })
        .then(({ data, error }) => {
          if (!error) {
            setMod(data[0].id);
          }
        });
    }
  }, [todo]);

  const closeHandler = () => {
    setTitle("");
    setDescription("");
    setIsComplete(false);
    setTodo(null);
    setMod("");
    onClose();
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    if (description.length <= 1) {
      setErrorMessage("Description must have more than 10 characters");
      return;
    }
    setIsLoading(true);

    const user = supabase.auth.user();
    let supabaseError;
    if (todo) {
      const { error } = await supabase
        .from("todos")
        .update({
          title,
          module_id: mod,
          description,
          isComplete,
          user_id: user.id,
        })
        .eq("id", todo.id);
      supabaseError = error;
    } else {
      const { error } = await supabase.from("todos").insert([
        {
          title,
          module_id: mod,
          description,
          isComplete,
          user_id: user.id,
        },
      ]);
      supabaseError = error;
    }

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
              <FormLabel>Title</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Add your title here"
                onChange={(event) => setTitle(event.target.value)}
                value={title}
              />
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>Module Code</FormLabel>
              <Select
                // id="module"
                placeholder="Please fill"
                value={mod}
                onChange={(event) => {
                  setMod(event.target.value);
                }}
              >
                {modules.map((modx) => (
                  <option value={modx.id}>{modx.code}</option>
                ))}
              </Select>
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="Add your description here"
                onChange={(event) => setDescription(event.target.value)}
                value={description}
              />
              <FormHelperText>
                Description must have more than 10 characters.
              </FormHelperText>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Is Completed?</FormLabel>
              <Switch
                isChecked={isComplete}
                id="is-completed"
                onChange={() => setIsComplete(!isComplete)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <ButtonGroup spacing="3">
              <Button
                onClick={
                  todo
                    ? (event) => {
                        event.stopPropagation();
                        deleteHandler(todo.id);
                        closeHandler();
                      }
                    : closeHandler
                }
                colorScheme="red"
                type="reset"
                isDisabled={isLoading}
              >
                {todo ? "Delete" : "Cancel"}
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
