import { NextPage } from "next";
import { useState, useEffect } from "react";
import {
  Flex,
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
} from "@chakra-ui/react";
import { useRef } from "react";
import { MdEmail, MdPassword } from "react-icons/md";
import Router from "next/router";
import { ROUTE_AUTH } from "../src/config";
import { supabase } from "../src/lib/supabase";
import { useAuth } from "../src/lib/auth/useAuth";
import Signin from "./Signin";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { NextAppPageServerSideProps } from "../src/types/app";

function Navbar2() {
  const { user, userLoading, signOut, loggedIn } = useAuth();

  //States for modal view
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef();
  const finalRef = useRef();

  return (
    <Box>
      {/* Button to open modal */}
      <Flex padding={5} float="right">
        <Button onClick={onOpen}>
          {loggedIn ? "Logged in" : "not logged in"}
        </Button>
      </Flex>

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
    </Box>
  );
}

export default Navbar2;
