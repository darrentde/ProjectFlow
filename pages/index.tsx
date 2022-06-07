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
import Todo2 from "../components/Todo2";
import Todo3 from "../components/TodoSimple";

const IndexPage = () => {
  return (
    <Box bg="#deebff" w="100vw" h="100vh">
      <Navbar />
      <DateTime />
      <Sidebar />
      {/* <Todo3 /> */}
    </Box>
  );
};

export default IndexPage;
