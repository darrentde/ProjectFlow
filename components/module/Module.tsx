/* eslint-disable react/no-children-prop */
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  ModalFooter,
  Stack,
  Flex,
  Box,
  MenuItem,
} from "@chakra-ui/react";
// import toast from "react-hot-toast";
import { useState, useRef, useEffect } from "react";
import { supabase } from "../../src/lib/supabase";
import SingleModule from "./SingleModule";
import ManageModule from "./ManageModule";
import AddModule from "./AddModule";
import { useAuth } from "../../src/lib/auth/useAuth";
import { useAppSelector } from "../../hooks";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import { nextStep } from "../../redux/TourSlice";

const Module = () => {
  const { user } = useAuth();

  const dispatch = useDispatch();
  const runningTour = useSelector((state: RootState) => state.tour.run);
  const stepIndex = useSelector((state: RootState) => state.tour.stepIndex);
  const toggle = useAppSelector((state) => state.toggledata.value);

  // states for module
  const [modulecodes, setModuleCodes] = useState([]);
  const [modulecode, setModuleCode] = useState("");

  // Main modal popup
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Manage Module Modal Popup
  const {
    isOpen: isOpenManage,
    onOpen: onOpenManage,
    onClose: onCloseManage,
  } = useDisclosure();
  const initialRefManage = useRef();

  // Add Module Modal Popup
  const {
    isOpen: isOpenAdd,
    onOpen: onOpenAdd,
    onClose: onCloseAdd,
  } = useDisclosure();
  const initialRefAdd = useRef();

  useEffect(() => {
    if (user) {
      supabase
        .from("modules")
        .select("*")
        .eq("user_id", user?.id)
        .order("insertedat", { ascending: false })
        .then(({ data, error }) => {
          if (!error) {
            setModuleCodes(data);
          }
        });
    } else {
      setModuleCodes([]);
    }
  }, [user, toggle]);

  useEffect(() => {
    const moduleListener = supabase
      .from("modules")
      .on("*", (payload) => {
        console.log(payload.eventType);
        if (payload.eventType !== "DELETE") {
          const newModule = payload.new;

          setModuleCodes((currentModules) => {
            const targetModuleIndex = currentModules.findIndex(
              (obj) => obj.id === newModule.id
            );

            if (targetModuleIndex !== -1) {
              currentModules[targetModuleIndex] = newModule;
              return [...currentModules];
            }
            return [newModule, ...currentModules];
          });
        }
      })
      .subscribe();

    return () => {
      moduleListener.unsubscribe();
    };
  }, []);

  const openHandler = (clickedTodo) => {
    // Module Code Object Single
    setModuleCode(clickedTodo);
    onOpenManage();
  };

  const deleteHandler = async (todoId) => {
    const { error } = await supabase.from("modules").delete().eq("id", todoId);
    if (!error) {
      setModuleCodes(modulecodes.filter((todo) => todo.id !== todoId));
    }
  };

  const openModule = () => {
    onOpen();
    if (runningTour && stepIndex === 2) {
      setTimeout(() => dispatch(nextStep("next")), 50);
    }
  };

  const openAddModule = () => {
    onOpenAdd();
    if (runningTour && stepIndex === 4) {
      setTimeout(() => dispatch(nextStep("next")), 50);
    }
  };

  const closeModule = () => {
    onClose();
    if (runningTour && stepIndex === 6) {
      setTimeout(() => dispatch(nextStep("next")), 50);
    }
  };

  return (
    <div id="menu-item-module">
      <MenuItem onClick={openModule}>Module</MenuItem>

      <Modal
        isOpen={isOpen}
        onClose={closeModule}
        isCentered
        closeOnOverlayClick={false}
        id="module"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Module List</ModalHeader>
          <ModalCloseButton id="module-close" />
          <ModalBody pb={6}>
            <Box>
              <Stack>
                <Flex>
                  <AddModule
                    isOpen={isOpenAdd}
                    onClose={onCloseAdd}
                    initialRef={initialRefAdd}
                  />
                  <Button onClick={openAddModule} id="add-module">
                    Add Module
                  </Button>
                </Flex>
                <Stack
                  height="400px"
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  overflowY="scroll"
                  p={5}
                  mt="-2"
                  spacing="4"
                  as="form"
                >
                  <ManageModule
                    isOpen={isOpenManage}
                    onClose={onCloseManage}
                    initialRef={initialRefManage}
                    todo={modulecode}
                    setTodo={setModuleCode}
                    deleteHandler={deleteHandler}
                  />
                  <h1>Modules taking this semester</h1>
                  {modulecodes.map((module) => (
                    <SingleModule
                      todo={module}
                      key={module.id}
                      openHandler={openHandler}
                    />
                  ))}
                </Stack>
              </Stack>
            </Box>
          </ModalBody>

          <ModalFooter>
            <p>*Must have modules to gain full access to functions</p>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Module;
