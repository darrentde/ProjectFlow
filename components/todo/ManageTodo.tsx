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
  Select,
  Switch,
  Text,
  Textarea,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react";
import { supabase } from "../../src/lib/supabase";
import { useAuth } from "../../src/lib/auth/useAuth";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setToggle } from "../../redux/ToggleDataSlice";
import { setToggleCheck } from "../../redux/ToggleCheckSlice";
import { RootState } from "../../redux/Store";
import { useSelector } from "react-redux";
import { nextStep } from "../../redux/TourSlice";

const ManageTodo = ({
  isOpen,
  onClose,
  initialRef,
  todo,
  setTodo,
  deleteHandler,
  // isDeleteLoading,
  modules,
  // setModule,
}) => {
  const { user } = useAuth();

  const toggle = useAppSelector((state) => state.toggledata.value);
  const runningTour = useSelector((state: RootState) => state.tour.run);
  const stepIndex = useSelector((state: RootState) => state.tour.stepIndex);
  const toggleCheck = useAppSelector((state) => state.toggledata.value);
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [duedate, setDueDate] = useState(new Date());

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // eslint-disable-next-line no-unused-vars
  const [modid, setModId] = useState("");

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setDescription(todo.description);
      setIsComplete(todo.isComplete);
      setDueDate(new Date(todo.dueDate));
      const resultId = modules.filter((item) => item.id === todo.module_id);
      setModId(resultId[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todo, toggle, toggleCheck]);

  const closeHandler = () => {
    setTitle("");
    setDescription("");
    setIsComplete(false);
    // setDueDate(new Date());
    setTodo(null);
    // setModName("");
    setModId("");
    onClose();
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    let supabaseError;
    if (todo) {
      const { error } = await supabase
        .from("todos")
        .update({
          title,
          module_id: modid,
          description,
          isComplete,
          dueDate: duedate,
          user_id: user.id,
        })
        .eq("id", todo.id);
      supabaseError = error;
    } else {
      const { error } = await supabase.from("todos").insert([
        {
          title,
          module_id: modid,
          description,
          isComplete,
          dueDate: duedate,
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
      dispatch(setToggle());
      if (runningTour && stepIndex === 10) {
        setTimeout(() => {
          dispatch(nextStep("next"));
        }, 50);
      }
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
                placeholder="Select Module"
                onChange={(event) => {
                  setModId(event.target.value);
                  // console.log("modid select value ", modid);
                }}
                value={modid}
              >
                {modules.map((modx) => (
                  <option value={modx.id}>{modx.code}</option>
                  // Sending the value
                ))}
              </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="Add your description here"
                onChange={(event) => setDescription(event.target.value)}
                value={description}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Due Date</FormLabel>
              <DatePicker
                selected={duedate === null ? new Date() : duedate}
                onChange={(date) => setDueDate(date)}
                // value={duedate}
              />
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
              <Button
                colorScheme="blue"
                type="submit"
                isLoading={isLoading}
                id="save-todo"
              >
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
