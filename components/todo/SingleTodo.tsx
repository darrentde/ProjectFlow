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
        <Badge ml="1">CS2040S Module FK</Badge>
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
