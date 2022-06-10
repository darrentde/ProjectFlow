import { Flex, Icon, Text, Spacer, Button } from "@chakra-ui/react";
import NavLink from "next/link";

import { MdHome } from "react-icons/md";
import Signin from "./Signin";
import { useAuth } from "../src/lib/auth/useAuth";

const Navbar = () => {
  const { loggedIn } = useAuth();
  // remove onOpen
  return (
    <Flex pt={3}>
      <Flex>
        <Icon as={MdHome} w={8} h={8} />
        <Text fontSize="sm"> Project Flow </Text>
      </Flex>
      <Spacer />
      {loggedIn ? (
        <Button colorScheme="purple">
          <NavLink href="/profile">Profile</NavLink>
        </Button>
      ) : null}
      <Signin />
    </Flex>
  );
};

export default Navbar;
