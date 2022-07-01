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
} from "@chakra-ui/react";
// import toast from "react-hot-toast";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../src/lib/auth/useAuth";
import { supabase } from "../../src/lib/supabase";
import SingleModule from "./SingleModule";
import ManageModule from "./ManageModule";
import AddModule from "./AddModule";

const Module = () => {
  const { user } = useAuth();

  // states for module
  const [modulecodes, setModuleCodes] = useState([]);
  const [modulecode, setModuleCode] = useState("");
  // const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  // const [errorMessage, setErrorMessage] = useState("");

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

  async function fetchModules() {
    const { data, error } = await supabase
      .from("modules")
      .select("*")
      .order("insertedat", { ascending: false });
    if (!error) {
      setModuleCodes(data);
    } else {
      console.log(error);
    }
  }

  useEffect(() => {
    if (user) {
      // Fetch data and fill module codes array
      fetchModules();
    }
  }, [user, modulecodes]);

  // useEffect(() => {
  //   const moduleListener = supabase
  //     .from("modules")
  //     .on("*", (payload) => {
  //       const newModule = payload.new;
  //       setModuleCodes((oldModules) => {
  //         const exists = oldModules.find(
  //           (module) => module.id === newModule.id
  //         );
  //         let newModules;
  //         if (exists) {
  //           const oldModuleIndex = oldModules.findIndex(
  //             (obj) => obj.id === newModule.id
  //           );
  //           oldModules[oldModuleIndex] = newModule;
  //           newModules = oldModules;
  //         } else {
  //           newModules = [...oldModules, newModule];
  //         }
  //         newModules.sort((a, b) => b.id - a.id);
  //         return newModules;
  //       });
  //     })
  //     .subscribe();

  //   return () => {
  //     moduleListener.unsubscribe();
  //   };
  // }, []);

  //   useEffect(() => {
  //     // const moduleListener = supabase
  //     //   .from("modules")
  //     //   .on("*", (payload) => {
  //     //     console.log(payload.eventType);
  //     //     if (payload.eventType !== "DELETE") {
  //     //       const newModule = payload.new;

  //     //       setModuleCodes((currentModules) => {
  //     //         const targetModuleIndex = currentModules.findIndex(
  //     //           (obj) => obj.id === newModule.id
  //     //         );

  //     //         if (targetModuleIndex !== -1) {
  //     //           currentModules[targetModuleIndex] = newModule;
  //     //           return [...currentModules];
  //     //         }
  //     //         return [newModule, ...currentModules];
  //     //       });
  //     //     }
  //     //   })
  //     //   .subscribe((status) => {
  //     //     console.log(status);
  //     //   });

  //     // Hacked
  //     const moduleListener = supabase
  //       .from("modules")
  //       .on("*", (payload) => {
  //         console.log("Change received!", payload);
  //       })
  //       .subscribe((status) => {
  //         console.log(status);
  //         if (status === "SUBSCRIBED") fetchModules();
  //       });

  //     return () => {
  //       moduleListener.unsubscribe();
  //     };
  //   });

  const openHandler = (clickedTodo) => {
    setModuleCode(clickedTodo);
    onOpenManage();
  };

  const deleteHandler = async (todoId) => {
    // setIsDeleteLoading(true);
    const { error } = await supabase.from("modules").delete().eq("id", todoId);
    // console.log(error);
    if (!error) {
      setModuleCodes(modulecodes.filter((todo) => todo.id !== todoId));
      // console.log(modulecodes.filter((todo) => todo.id !== todoId));
      // Set state after delete
    }
    // setIsDeleteLoading(false);
  };

  return (
    <>
      <Button
        mr="4"
        bgColor="brand.400"
        textColor="white"
        _hover={{ bg: "brand.300" }}
        onClick={onOpen}
      >
        Module
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Module List</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Stack
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              p={5}
              mt="-2"
              spacing="4"
              as="form"
            >
              {/* add module */}
              <Flex>
                <AddModule
                  isOpen={isOpenAdd}
                  onClose={onCloseAdd}
                  initialRef={initialRefAdd}
                />
                <Button onClick={onOpenAdd}>Add Module</Button>
              </Flex>
              <Stack>
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
          </ModalBody>

          <ModalFooter>
            <p>*Must have modules to gain full access to functions</p>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Module;
