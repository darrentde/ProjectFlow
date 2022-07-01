import { Flex, Icon, Text, Spacer, Button } from "@chakra-ui/react";
import Link from "next/link";
import { MdHome } from "react-icons/md";
import Signin from "./Signin";
import { useAuth } from "../src/lib/auth/useAuth";
import Module from "./module/Module";

const Navbar = ({ address }) => {
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

      <Module />

      {/* Profile button or back button */}
      {loggedIn ? (
        <Button
          bgColor="brand.400"
          textColor="white"
          _hover={{ bg: "brand.300" }}
        >
          <Link href={address}>{address === "/" ? "Back" : "Profile"}</Link>
        </Button>
      ) : null}

      {/* Signin modal pop up */}
      <Signin />
    </Flex>
  );
};

export default Navbar;
