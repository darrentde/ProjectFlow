import { Box, SimpleGrid, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const VibeChanger = ({ vibeHandler }) => {
  // array of objects for different types of color -> colorHandler, can give a color wheel to user
  // array for different types of youtubebackground -> videoHandler
  // Different types of handler for different formats.
  return (
    <Box>
      {/* 3x3 grid, of different icons to store the different videos */}

      <Button onClick={() => vibeHandler("#0055d4")}>Change to blue</Button>
      <Button onClick={() => vibeHandler("#b40000")}>Change to red</Button>
    </Box>
  );
};

export default VibeChanger;
