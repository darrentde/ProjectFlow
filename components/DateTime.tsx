import { Box, Text } from "@chakra-ui/layout";
import { useState, useEffect } from "react";

const DateTime = () => {
  const [dateState, setDateState] = useState(new Date());

  useEffect(() => {
    setInterval(() => setDateState(new Date()));
  }, []);
  return (
    <Box w="100%" position="relative" textAlign="center">
      <Text fontSize="40px" color="white">
        {dateState.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </Text>

      <Text fontSize="40px" color="white">
        {dateState.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })}
      </Text>
    </Box>
  );
};

export default DateTime;
