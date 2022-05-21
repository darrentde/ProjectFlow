import {Box, Flex, VStack,} from "@chakra-ui/react";

import Navbar from "../components/Navbar"
import DateTime from "../components/DateTime"
import Sidebar from "../components/sidebar";


const IndexPage = () => {
  return (
    <Box bg="#A0AEC0" w="100vw" h="100vh">
      <VStack align="stretch">

        <Navbar />
        <Box w="100%" >
              <DateTime />
        </Box>
        <Sidebar />
      </VStack>
    </Box>

  );
};

export default IndexPage;
