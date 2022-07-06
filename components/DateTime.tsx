import { Box, Text } from "@chakra-ui/layout";
import { useState, useEffect } from "react";

const DateTime = () => {
  const [dateState, setDateState] = useState(new Date());

  useEffect(() => {
    setInterval(() => setDateState(new Date()));
  }, []);
  return (
    <Box w="100%" position="relative" textAlign="center">
      <Text fontSize="40px" color="brand.400">
        {dateState.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </Text>

      <Text fontSize="40px" color="brand.400">
        {dateState.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })}
      </Text>

      <Text as="u">Annoucement</Text>
      <Text>
        Disabled real-time functionality of todo list and module list due to
        unresolved inifite fetching error.
      </Text>
      <Text>User must refresh the page to see the new entries</Text>
    </Box>
  );
};

export default DateTime;
