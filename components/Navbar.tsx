import { Flex, Icon, Text, Spacer, Button } from "@chakra-ui/react";
import NavLink from "next/link";

import { MdHome } from "react-icons/md";
import Signin from "./Signin";

const Navbar = () => {
  // remove onOpen
  return (
    <Flex pt={3}>
      <Flex>
        <Icon as={MdHome} w={6} h={6} />
        <Text fontSize="sm"> Project Flow </Text>
      </Flex>

      <Spacer />
      <Button colorScheme="blue" />
      <Button>
        {" "}
        <NavLink href="/profile">Profile</NavLink>
      </Button>
      <Signin />
    </Flex>
  );
};

export default Navbar;
