import { Box, Button } from "@chakra-ui/react";
import "reset-css";
import { useState } from "react";
import DateTime from "../components/DateTime";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import VibeChanger from "../components/VibeChanger";

const IndexPage = () => {
  const [vibe, setVibe] = useState("#ffffff");

  const vibeHandler = (option) => {
    setVibe(option);
  };

  return (
    <Box bg={vibe} w="100vw" h="100vh">
      <Navbar />
      <DateTime />
      <Sidebar />
      <VibeChanger vibeHandler={vibeHandler} />
    </Box>
  );
};

export default IndexPage;
