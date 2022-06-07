/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-boolean-value */
import {
  Avatar,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { Badge, Box, Flex, Heading, Stack, Text } from "@chakra-ui/layout";

import { useEffect, useState } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Router from "next/router";

import { useAuth } from "../src/lib/auth/useAuth";
import { ROUTE_AUTH } from "../src/config";
import { supabase } from "../src/lib/supabase";
import { NextAppPageServerSideProps } from "../src/types/app";
import SingleTodo from "../components/SingleTodo.js";

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

  // states for module component
  // const [modulenames, setModuleNames] = useState([]);
  // const [modulename, setModuleName] = useState("");
  const [modulecodes, setModuleCodes] = useState([]);
  const [modulecode, setModuleCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { user, userLoading, loggedIn } = useAuth();

  useEffect(() => {
    if (!userLoading && !loggedIn) {
      Router.push(ROUTE_AUTH);
    }
  }, [userLoading, loggedIn]);

  // when move from different window, page will go into homepage. bug

  // Loading screen if the user is loading, add spinner effect
  if (userLoading) {
    return <Text>User is loading Spinner Spinner</Text>;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (user) {
      setEmail(user.email);
      // fetchModules();
      // supabase
      //   .from("modules")
      //   .select()
      //   .eq("user_id", user.id)
      //   .then(({ data, error }) => {
      //     if (!error) {
      //       setModuleNames(data);
      //     }
      //   });
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
    }
  }, [user]); // not sure if need extra [user]

  // async function fetchModules() {
  //   const { data } = await supabase.from("modules").select();
  //   setModuleNames(data);
  //   console.log("data: ", data);
  // }
  // async function createModule() {
  //   await supabase.from("modules").insert([{ modulename }]).single();
  //   setModuleName("");
  //   // fetchPosts();
  // }

  const submitHandler = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    if (modulecode.length <= 5) {
      setErrorMessage("Description must have more than 5 characters");
      return;
    }
    setIsLoading(true);
    // const user = supabase.auth.user();
    const { error } = await supabase
      .from("modules")
      .insert([{ code: modulecode, user_id: user.id }]); // wrong id
    setIsLoading(false);
    if (error) {
      setErrorMessage(error.message);
    } else {
      // can add code here to refresh
    }
  };

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

  useEffect(() => {
    if (user) {
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
  }, [user]);

  useEffect(() => {
    const moduleListener = supabase
      .from("modules")
      .on("*", (payload) => {
        const newModule = payload.new;
        setModuleCodes((oldModules) => {
          const newModules = [...oldModules, newModule];
          newModules.sort((a, b) => b.id - a.id);
          return newModules;
        });
      })
      .subscribe();

    return () => {
      moduleListener.unsubscribe();
    };
  }, []);

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
      {/* <div className="h-screen flex flex-col justify-center items-center relative">
        <h2 className="text-3xl my-4">
          Howdie, {user && user.email ? user.email : "Explorer"}!
        </h2>
        {!user && (
          <small>
            You've landed on a protected page. Please{" "}
            <Link href="/">log in</Link> to view the page's full content{" "}
          </small>
        )}
        {user && (
          <div>
            <button
              onClick={signOut}
              className="border bg-gray-500 border-gray-600 text-white px-3 py-2 rounded w-full text-center transition duration-150 shadow-lg"
            >
              Sign Out
            </button>
          </div>
        )}
      </div> */}
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
                  onClick={submitHandler}
                  colorScheme="blue"
                  type="submit"
                  isLoading={isLoading}
                >
                  Add Module
                </Button>
              </Flex>
              <Stack>
                <Heading>Modules taking this semester</Heading>
                {modulecodes.map((module) => (
                  <SingleTodo todo={module} key={module.id} />
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
