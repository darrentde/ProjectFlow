import { Box, Button, Divider, Text, Flex } from "@chakra-ui/react";

const SingleModule = ({
  todo,
  openHandler,
  // deleteHandler,
  // isDeleteLoading,
}) => {
  return (
    <Box
      position="relative"
      maxW="sm"
      // borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Flex alignItems="center" gap="2">
        <Button
          onClick={() => {
            openHandler(todo);
          }}
        >
          Edit
        </Button>
        <Text fontSize="lg"> {todo.code}</Text>
      </Flex>

      <Divider my="2" />
    </Box>
  );
};

export default SingleModule;
