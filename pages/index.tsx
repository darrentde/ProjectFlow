import {
  Box,
  Text,
  Heading,
  Container,
  List,
  ListItem,
  Flex,
  VStack,
  StackDivider,
  Button,
  HStack,
} from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import "reset-css";

import Navbar from "../components/Navbar";
import DateTime from "../components/DateTime";
import Sidebar from "../components/Sidebar";
import Todo from "../components/Todo";
import Signin from "../components/Signin";
import Navbar2 from "../components/Navbar2";
import { AuthProvider } from "../src/lib/auth/AuthContext";

const IndexPage = () => {
  return (
    <Box bg="#A0AEC0" w="100vw" h="100vh">
      <VStack align="stretch">
        {/* <Navbar /> */}
        <Navbar2 />
        <DateTime />
        <Box w="100%">
          <HStack>
            <Sidebar />
            <Todo />
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default IndexPage;
