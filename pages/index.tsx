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
import DateTime from "../components/DateTime";
import Sidebar from "../components/Sidebar";
import Todo from "../components/Todo";
import Signin from "../components/Signin";
// import Navbar from "../components/Navbar"
import Navbar from "../components/Navbar";
import { AuthProvider } from "../src/lib/auth/AuthContext";

const IndexPage = () => {
  return (
    <Box bg="#1c56a2" w="100vw" h="100vh">
      <Navbar />
      <DateTime />
      <Sidebar />
    </Box>
  );
};

export default IndexPage;
