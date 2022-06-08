/* eslint-disable no-use-before-define */
/* eslint-disable no-empty-pattern */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-boolean-value */
import {
  Avatar,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { Badge, Box, Flex, Heading, Stack, Text } from "@chakra-ui/layout";

import { useEffect, useRef, useState } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Router from "next/router";

import { useAuth } from "../src/lib/auth/useAuth";
import { ROUTE_AUTH } from "../src/config";
import { supabase } from "../src/lib/supabase";
import { NextAppPageServerSideProps } from "../src/types/app";
import SingleTodo from "../components/SingleTodo.js";
import ManageTodo from "../components/ManageToDo.js";
import AddModule from "../components/AddModule.js";

const ProfilePage = ({}: InferGetServerSidePropsType<
  typeof getServerSideProps
>) => {
  // states for profile page crud
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [website, setWebsite] = useState("");
  const [bio, setBio] = useState("");
  const [avatarurl, setAvatarurl] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isImageUploadLoading, setIsImageUploadLoading] = useState(false);

  // states for module
  const [modulecodes, setModuleCodes] = useState([]);
  const [modulecode, setModuleCode] = useState("");

  // states for error
  const [errorMessage, setErrorMessage] = useState("");

  // const [todos, setTodos] = useState([]);
  // const [todo, setTodo] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenAdd,
    onOpen: onOpenAdd,
    onClose: onCloseAdd,
  } = useDisclosure();
  const initialRefAdd = useRef();

  const initialRef = useRef();

  const { user, userLoading, loggedIn } = useAuth();

  useEffect(() => {
    if (!userLoading && !loggedIn) {
      Router.push(ROUTE_AUTH);
    }
  }, [userLoading, loggedIn]);

  // when move from different window, page will go into homepage. bug

  // // Loading screen if the user is loading, add spinner effect
  // if (userLoading) {
  //   return <Text>User is loading Spinner Spinner</Text>;
  // }

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .then(({ data, error }) => {
          if (!error) {
            setUsername(data[0].username || "");
            setWebsite(data[0].website || "");
            setBio(data[0].bio || "");
            setAvatarurl(data[0].avatarurl || "");
          }
        });
      supabase
        .from("modules")
        .select("*")
        .eq("user_id", user?.id)
        .order("id", { ascending: false })
        .then(({ data, error }) => {
          if (!error) {
            setModuleCodes(data);
          }
        });
    }
  }, [user]); // not sure if need extra [user]

  const updateHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const body = { username, website, bio };
    const userId = user.id;
    const { error } = await supabase
      .from("profiles")
      .update(body)
      .eq("id", userId);
    if (!error) {
      setUsername(body.username);
      setWebsite(body.website);
      setBio(body.bio);
    }
    setIsLoading(false);
  };

  // useEffect(() => {
  //   if (user) {
  //     supabase
  //       .from("modules")
  //       .select("*")
  //       .eq("user_id", user?.id)
  //       .order("id", { ascending: false })
  //       .then(({ data, error }) => {
  //         if (!error) {
  //           setModuleCodes(data);
  //         }
  //       });
  //   }
  // }, [user]);

  useEffect(() => {
    const moduleListener = supabase
      .from("modules")
      .on("*", (payload) => {
        const newTodo = payload.new;
        setModuleCodes((oldTodos) => {
          const exists = oldTodos.find((todo) => todo.id === newTodo.id);
          let newTodos;
          if (exists) {
            const oldTodoIndex = oldTodos.findIndex(
              (obj) => obj.id === newTodo.id
            );
            oldTodos[oldTodoIndex] = newTodo;
            newTodos = oldTodos;
          } else {
            newTodos = [...oldTodos, newTodo];
          }
          newTodos.sort((a, b) => b.id - a.id);
          return newTodos;
        });
      })
      .subscribe();

    return () => {
      moduleListener.unsubscribe();
    };
  }, []);

  const openHandler = (clickedTodo) => {
    setModuleCode(clickedTodo);
    onOpen();
  };

  // To create a unique id
  function makeid(length) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  // Upload handler for profile avatar
  const uploadHandler = async (event) => {
    setIsImageUploadLoading(true);
    const avatarFile = event.target.files[0];
    const fileName = makeid(10);

    const { error } = await supabase.storage
      .from("avatars")
      .upload(fileName, avatarFile, {
        cacheControl: "3600",
        upsert: false,
      });
    if (error) {
      setIsImageUploadLoading(false);
      console.log("error", error);
      return;
    }
    const { publicURL, error: publicURLError } = supabase.storage
      .from("avatars")
      .getPublicUrl(fileName);
    if (publicURLError) {
      setIsImageUploadLoading(false);
      console.log("publicURLError", publicURLError);
      return;
    }
    const userId = user.id;
    await supabase
      .from("profiles")
      .update({
        avatarurl: publicURL,
      })
      .eq("id", userId);
    setAvatarurl(publicURL);
    setIsImageUploadLoading(false);
  };

  return (
    <Box>
      <div>
        <Box>
          {/* <Navbar /> */}

          {/* update profile picture */}
          <Box mt="8" maxW="xl" mx="auto">
            <Flex align="center" justify="center" direction="column">
              <Avatar
                size="2xl"
                src={avatarurl || ""}
                name={username || user?.email}
              />
              <FormLabel
                htmlFor="file-input"
                my="5"
                borderRadius="2xl"
                borderWidth="1px"
                textAlign="center"
                p="2"
                bg="blue.400"
                color="white"
              >
                {isImageUploadLoading
                  ? "Uploading....."
                  : "Upload Profile Picture"}
              </FormLabel>
              <Input
                type="file"
                hidden
                id="file-input"
                onChange={uploadHandler}
                multiple={false}
                disabled={isImageUploadLoading}
              />
            </Flex>

            {/* update profile information */}
            <Stack
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              p={5}
              mt="-2"
              spacing="4"
              as="form"
              onSubmit={updateHandler}
            >
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input type="email" isDisabled={true} value={email} />
              </FormControl>
              <FormControl id="username" isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  placeholder="Add your username here"
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </FormControl>
              <FormControl id="website" isRequired>
                <FormLabel>Website URL</FormLabel>
                <Input
                  placeholder="Add your website here"
                  type="text" // url
                  value={website}
                  onChange={(event) => setWebsite(event.target.value)}
                />
              </FormControl>
              <FormControl id="bio" isRequired>
                <FormLabel>Bio</FormLabel>
                <Textarea
                  placeholder="Add your bio here"
                  value={bio}
                  onChange={(event) => setBio(event.target.value)}
                />
              </FormControl>
              <Button colorScheme="blue" type="submit" isLoading={isLoading}>
                Update
              </Button>
            </Stack>

            {/* modules form */}
            <Stack
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              p={5}
              mt="-2"
              spacing="4"
              as="form"
              // onSubmit={createModule}
            >
              {/* add module */}
              <Flex>
                {/* <form onSubmit={submitHandler}>
                  <FormControl id="modulename">
                    <FormLabel>Module</FormLabel>
                    <Input
                      placeholder="e.g. CS1101S"
                      type="text"
                      value={modulecode}
                      onChange={(event) => setModuleCode(event.target.value)}
                    />
                  </FormControl>
                  <Button
                    colorScheme="blue"
                    type="submit"
                    isLoading={isLoading}
                  >
                    Add Module
                  </Button>
                </form> */}
                <AddModule
                  isOpen={isOpenAdd}
                  onClose={onCloseAdd}
                  initialRef={initialRefAdd}
                />
                <Button onClick={onOpenAdd}>Add Module</Button>
              </Flex>
              <Stack>
                {/* <ManageTodo
                  isOpen={isOpen}
                  onClose={onClose}
                  initialRef={initialRef}
                  todo={modulecode}
                  setTodo={setModuleCode}
                /> */}
                <Heading>Modules taking this semester</Heading>
                {modulecodes.map((module) => (
                  <SingleTodo
                    todo={module}
                    openHandler={openHandler}
                    key={module.id}
                  />
                ))}
                {/* {modulecode.map((modulecodes) => (
                  <Box key={modulecodes.id}>
                    <Badge colorScheme="purple">{modulecodes.code}</Badge>
                  </Box>
                ))} */}
              </Stack>
            </Stack>
          </Box>
        </Box>
      </div>
    </Box>
  );
};

export default ProfilePage;

// Fetch user data server-side to eliminate a flash of unauthenticated content.
export const getServerSideProps: GetServerSideProps = async ({
  req,
}): Promise<NextAppPageServerSideProps> => {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  // We can do a re-direction from the server
  if (!user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  // or, alternatively, can send the same values that client-side context populates to check on the client and redirect
  // The following lines won't be used as we're redirecting above
  return {
    props: {
      user,
      loggedIn: !!user,
    },
  };
};
