import {
  Box,
  Divider,
  Heading,
  Tag,
  Text,
  Button,
  Center,
  Badge,
  Flex,
  Checkbox,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabase } from "../../src/lib/supabase";
import { useAuth } from "../../src/lib/auth/useAuth";

const SingleTodo = ({ todo, openHandler }) => {
  //   const getDateInMonthDayYear = (date) => {
  //     const d = new Date(date);
  //     const options = {
  //       year: "numeric",
  //       month: "long",
  //       day: "numeric",
  //       hour: "numeric",
  //       minute: "numeric",
  //     };
  //     const n = d.toLocaleDateString("en-US", options);
  //     const replase = n.replace(new RegExp(",", "g"), " ");
  //     return replase;
  //   };

  // States for module codes foreign table
  const [modulecode, setModuleCode] = useState("");

  useEffect(() => {
    if (todo) {
      supabase
        .from("modules")
        .select("code")
        .eq("id", todo.module_id)
        // .order("id", { ascending: false })
        .then(({ data, error }) => {
          if (!error) {
            setModuleCode(data[0].code);
            // console.log(data);
          }
        });
    }
  }, [todo]);

  return (
    <Box
      maxW="100%"
      borderWidth="2px"
      borderRadius="lg"
      border="1px"
      borderColor="black"
      //   overflow="hidden"
      p="2"
      mb="1"
      mt="1"
      onClick={() => openHandler(todo)}
    >
      <Text fontSize="lg" mt="1">
        {todo.title}
        <Badge ml="1">{modulecode}</Badge>

        <Checkbox ml="2" colorScheme="purple" isChecked={todo.isComplete}>
          Check
        </Checkbox>
      </Text>
      {/* <Text color="gray.400" mt="1" fontSize="sm">
        {getDateInMonthDayYear(todo.insertedat)}
      </Text> */}
      <Divider my="0.5" />
      <Text fontSize="xs" noOfLines={[1, 2]} color="gray.800">
        {todo.description}
      </Text>
    </Box>
  );
};

export default SingleTodo;
