import { Flex, Icon, Text, Spacer } from "@chakra-ui/react";
import { MdHome } from "react-icons/md";
import { useAuth } from "../src/lib/auth/useAuth";
import DropdownMenu from "./DropdownMenu";
import Login from "./user/Login";

const Navbar = () => {
  const { loggedIn } = useAuth();

  return (
    <Flex pt={3}>
      <Flex>
        <Icon as={MdHome} w={8} h={8} color="brand.400" />
        <Text fontSize="xl" textColor="brand.400">
          Project Flow
        </Text>
      </Flex>
      <Spacer />
      {loggedIn ? <DropdownMenu /> : <Login />}
    </Flex>
  );
};

export default Navbar;
