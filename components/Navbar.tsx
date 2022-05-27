import { Flex, Icon, Text, Spacer } from "@chakra-ui/react";

import { MdHome } from "react-icons/md";
import Signin from "./Signin";

function Navbar() {
  return (
    <Flex mt="3" minWidth="max-content" alignItems="center" gap="2">
      <Flex ml="3">
        <Icon as={MdHome} w={6} h={6} />
        <Text fontSize="sm"> Project Flow </Text>
      </Flex>

      <Spacer />
      <Signin />
    </Flex>
  );
}

export default Navbar;
