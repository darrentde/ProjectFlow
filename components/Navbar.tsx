import {Box, Button} from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Box h="50px" w="100%">
      <Box padding={5} float="right">
        <Button>Login</Button>
      </Box>
    </Box>
  );
};

export default Navbar;
