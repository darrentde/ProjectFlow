/* eslint-disable react/no-children-prop */
import {
  Input,
  Box,
  Text,
  InputLeftElement,
  InputGroup,
  Button,
  Flex,
} from "@chakra-ui/react";
import { MdPassword } from "react-icons/md";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Router from "next/router";
import { supabase } from "../src/lib/supabase";
import { ROUTE_HOME } from "../src/config";

const PasswordReset = () => {
  const [password, setPassword] = useState(null);

  const [hash, setHash] = useState(null);

  useEffect(() => {
    setHash(window.location.hash);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const notification = toast.loading("Changing Password");

    try {
      // if the user doesn't have accesstoken
      if (!hash) {
        return toast.error("Sorry, Invalid token", {
          id: notification,
        });
      }
      if (hash) {
        const hashArr = hash
          .substring(1)
          .split("&")
          .map((param) => param.split("="));

        let type;
        let accessToken;
        // eslint-disable-next-line no-restricted-syntax
        for (const [key, value] of hashArr) {
          if (key === "type") {
            type = value;
          } else if (key === "access_token") {
            accessToken = value;
          }
        }

        if (
          type !== "recovery" ||
          !accessToken ||
          typeof accessToken === "object"
        ) {
          toast.error("Invalid access token or type", {
            id: notification,
          });
          return;
        }

        //   now we will change the password
        const { error } = await supabase.auth.api.updateUser(accessToken, {
          password,
        });

        if (error) {
          toast.error(error.message, {
            id: notification,
          });
        } else if (!error) {
          toast.success("Password Changed", {
            id: notification,
          });
          Router.push(ROUTE_HOME);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Sorry Error occured", {
        id: notification,
      });
    }
  };

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
      <form onSubmit={(e) => handleSubmit(e)}>
        <Text>Please enter your new password and remember it</Text>
        <InputGroup mt="4">
          <InputLeftElement children={<MdPassword />} />
          <Input
            // id="email"
            // name="email"
            // type="email"
            // className="h-12 px-4 py-2 bg-white rounded shadow-inner border-gray-300 w-full border  hover:border-gray-400"
            placeholder="New Password"
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </InputGroup>
        <Button
          bgColor="brand.400"
          textColor="white"
          _hover={{ bg: "brand.300" }}
          mt="4"
          type="submit"
          colorScheme="blue"
          w="full"
        >
          Submit
        </Button>
      </form>
    </Flex>
  );
};

export default PasswordReset;
