import {Box, Flex, VStack,} from "@chakra-ui/react";

import Navbar from "../components/Navbar"
import DateTime from "../components/DateTime"
import Sidebar from "../components/sidebar";


const IndexPage = () => {
  return (
    <Box bg="grey" w="100vw" h="100vh">
      <VStack align="stretch">
        <Navbar />

        <Box>
          <Flex>
            <Box w="100px" h="100%" bg="purple.100">
              <Sidebar />
            </Box>
            <Box w="100%" >
              <DateTime />
            </Box>
          </Flex>
        </Box>
      </VStack>
    </Box>

  );
};

export default IndexPage;
