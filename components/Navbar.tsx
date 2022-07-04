import { Flex, Icon, Text, Spacer } from "@chakra-ui/react";
import { MdHome } from "react-icons/md";
import Signin from "./Signin";
import { useAuth } from "../src/lib/auth/useAuth";
import Module from "./module/Module";
import ProfileModal from "./ProfileModal";

const Navbar = () => {
  const { loggedIn } = useAuth();

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
        <Flex>
          <Module />
          <ProfileModal />
        </Flex>
      ) : null}

      {/* Signin modal pop up */}
      <Signin />
    </Flex>
  );
};

export default Navbar;
