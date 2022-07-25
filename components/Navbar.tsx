import { Flex, Icon, Text, Spacer, Image } from "@chakra-ui/react";
import { MdHome } from "react-icons/md";
import { useAuth } from "../src/lib/auth/useAuth";
import DropdownMenu from "./DropdownMenu";
import Tour from "./tour/Tour";
import Login from "./user/Login";
import { IoRocketSharp } from "react-icons/io5";
const Navbar = () => {
  const { loggedIn } = useAuth();

  return (
    <Flex p={2}>
      <Flex>
        <Icon as={IoRocketSharp} w={8} h={8} color="brand.400" />
        <Text fontSize="lg" textColor="brand.400">
          Project Flow
        </Text>
      </Flex>
      <Spacer />
      {loggedIn ? (
        <>
          <DropdownMenu /> <Tour />
        </>
      ) : (
        <Login />
      )}
    </Flex>
  );
};

export default Navbar;
