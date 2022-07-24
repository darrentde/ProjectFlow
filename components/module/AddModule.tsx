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
import { useState } from "react";
import { supabase } from "../../src/lib";
import { useAuth } from "../../src/lib/auth/useAuth";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { setToggle } from "../../redux/ToggleDataSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import { nextStep } from "../../redux/TourSlice";

const AddModule = ({ isOpen, onClose, initialRef }) => {
  const dispatch = useAppDispatch();
  const runningTour = useSelector((state: RootState) => state.tour.run);
  const stepIndex = useSelector((state: RootState) => state.tour.stepIndex);
  const toggle = useAppSelector((state) => state.toggledata.value);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { user } = useAuth();

  const [modulecode, setModuleCode] = useState("");

  const closeHandler = () => {
    setModuleCode("");
    onClose();
    dispatch(setToggle());
    if (runningTour && stepIndex === 5) {
      setTimeout(() => dispatch(nextStep("next")), 50);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    if (modulecode.length <= 1) {
      setErrorMessage("Please fill in");
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
              <Button
                colorScheme="blue"
                type="submit"
                isLoading={isLoading}
                id="add-module-enter"
              >
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
