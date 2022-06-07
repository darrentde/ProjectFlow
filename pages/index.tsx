import { Box } from "@chakra-ui/react";
import "reset-css";
import DateTime from "../components/DateTime";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

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
