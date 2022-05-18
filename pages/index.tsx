import {
  Box,
  Text,
  Heading,
  Container,
  Flex,
  VStack,
  StackDivider,
  Button,
} from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import "reset-css";
import Navbar from "../components/Navbar"

const IndexPage = () => {
  return (
    <Box bg="grey" w="100vw" h="100vh">
      <VStack align="stretch">
        <Navbar />

        <Box>
          <Flex>
            <Box w="150px" h="100%" bg="purple.100">
              <Text>sidebar</Text>
            </Box>
            <Box w="100%" bg="red.100">
              <Text>Remaining space</Text>
            </Box>
          </Flex>
        </Box>
      </VStack>
    </Box>

  );
};

export default IndexPage;
