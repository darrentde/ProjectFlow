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
      position="relative"
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="2"
      onClick={() => openHandler(todo)}
    >
      <Text fontSize="lg" mt="1">
        {todo.title}
        <Badge ml="1">CS2040S Module FK</Badge>
        <Checkbox ml="2" colorScheme="purple" isChecked={todo.isComplete}>
          Check
        </Checkbox>
      </Text>

      {/* <Tag
        position="absolute"
        top="3"
        right="2"
        bg={todo.isComplete ? "green.500" : "yellow.400"}
        borderRadius="3xl"
        size="sm"
      /> */}
      {/* <Text color="gray.400" mt="1" fontSize="sm">
        {getDateInMonthDayYear(todo.insertedat)}
      </Text> */}
      <Divider my="0.5" />
      <Text fontSize="xs" noOfLines={[1, 2]} color="gray.800">
        {todo.description}
      </Text>
      <Center>
        {/* <Button
          mt="4"
          size="sm"
          colorScheme="red"
          onClick={(event) => {
            event.stopPropagation();
            deleteHandler(todo.id);
          }}
          isDisabled={isDeleteLoading}
        >
          Delete
        </Button> */}
      </Center>
    </Box>
  );
};

export default SingleTodo;
