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
  Icon,
  Text,
  Spacer,
} from "@chakra-ui/react";
import { useRef } from "react";
import { MdHome } from "react-icons/md";
import Router from "next/router";
import { ROUTE_AUTH } from "../src/config";
import { supabase } from "../src/lib/supabase";
import { useAuth } from "../src/lib/auth/useAuth";
import Signin from "./Signin";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { NextAppPageServerSideProps } from "../src/types/app";
import Image from "next/image";

function Navbar2() {
  const { user, userLoading, signOut, loggedIn } = useAuth();

  //States for modal view
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef();
  const finalRef = useRef();

  return (
    <Flex mt="3" minWidth="max-content" alignItems="center" gap="2">
      <Flex ml="3">
        <Icon as={MdHome} w={6} h={6} />
        <Text fontSize="sm"> Project Flow </Text>
      </Flex>

      <Spacer />

      {/* Button to open modal */}
      <Box mr="3">
        <Button onClick={onOpen}>
          {loggedIn ? "Logged in" : "not logged in"}
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
    </Flex>
  );
}

export default Navbar2;
