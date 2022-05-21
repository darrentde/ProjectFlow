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
} from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import { PrismaClient } from "@prisma/client";
import styles from "../styles/Home.module.css";
import "reset-css";
import Navbar from "../components/Navbar";

import DateTime from "../components/DateTime";
import Sidebar from "../components/sidebar";

import Layout from "../components/Layout";
import Grid from "../components/Grid";

const prisma = new PrismaClient();

export async function getServerSideProps() {
  // Get all homes
  const tasks = await prisma.task.findMany();
  // Pass the data to the Home page
  return {
    props: {
      tasks: JSON.parse(JSON.stringify(tasks)),
    },
  };
}

const IndexPage = () => {
  return (
    <Box bg="grey" w="100vw" h="100vh">
      <VStack align="stretch">
        <Navbar />

        <Box>
          <Flex>
            <Box w="150px" h="100%" bg="purple.100">
              <Sidebar />
            </Box>
            <Box w="100%">
              <DateTime />
              <div className="mt-8">
                <Grid homes={tasks} />
              </div>
            </Box>
          </Flex>
        </Box>
      </VStack>
    </Box>
  );
};

export default IndexPage;
