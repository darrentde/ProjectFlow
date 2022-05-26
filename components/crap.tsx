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

import { NextPage } from "next";
import { useState, useEffect } from "react";
import { useRef } from "react";
import Router from "next/router";
import { ROUTE_AUTH } from "../src/config";
import { supabase } from "../src/lib/supabase";
import { useAuth } from "../src/lib/auth/useAuth";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { NextAppPageServerSideProps } from "../src/types/app";
import Image from "next/image";

onst { user, userLoading, signOut, loggedIn } = useAuth();
  //States for modal view
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef();
  const finalRef = useRef();

{/* Button to open modal */}
      <Box mr="3">
        <Button onClick={onOpen}>
          {loggedIn ? "Logout" : "Signin / Signup"}
        </Button>
      </Box>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader> Let's get into the flow of things</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {loggedIn ? (
              <Box>
                <Button onClick={signOut}>Signout</Button>
              </Box>
            ) : (
              <Signin />
            )}
          </ModalBody>

          {/* <ModalFooter>
            {/* <Button>Not sure what to put</Button> */}
          {/* </ModalFooter> */}
        </ModalContent>
      </Modal>