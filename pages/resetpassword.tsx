/* eslint-disable react/no-children-prop */
import { Flex } from "@chakra-ui/react";
import React from "react";
import PasswordReset from "../components/user/PasswordReset";

const ResetPasswordPage = () => {
  // Could transfer this as a child component
  // const [password, setPassword] = useState(null);

  // const [hash, setHash] = useState(null);

  // useEffect(() => {
  //   setHash(window.location.hash);
  // }, []);

  return (
    <Flex
      bg="white"
      p="3"
      alignItems="center"
      justifyContent="center"
      // border="0.1rem solid black"
      width="400px"
      // maxHeight="500px"
      // borderRadius="10px"
    >
      <PasswordReset />
    </Flex>
  );
};

export default ResetPasswordPage;
