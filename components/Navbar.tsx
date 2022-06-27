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
        <Icon as={MdHome} w={8} h={8} color="brand.400" />
        <Text fontSize="xl" textColor="brand.400">
          {" "}
          Project Flow{" "}
        </Text>
      </Flex>
      <Spacer />
      {loggedIn ? (
        <Button
          bgColor="brand.400"
          textColor="white"
          _hover={{ bg: "brand.300" }}
        >
          <NavLink href="/profile">Profile</NavLink>
        </Button>
      ) : null}
      <Signin />
    </Flex>
  );
};

export default Navbar;
