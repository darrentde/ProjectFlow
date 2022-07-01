// /* eslint-disable no-console */
// import {
//   Avatar,
//   Button,
//   FormControl,
//   FormLabel,
//   Input,
//   Textarea,
//   useDisclosure,
// } from "@chakra-ui/react";

// // eslint-disable-next-line no-unused-vars
// import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/layout";

// import { useEffect, useRef, useState } from "react";
// import { GetServerSideProps, InferGetServerSidePropsType } from "next";

// import toast from "react-hot-toast";
// import { useAuth } from "../src/lib/auth/useAuth";

// import { supabase } from "../src/lib/supabase";
// import { NextAppPageServerSideProps } from "../src/types/app";
// import SingleModule from "../components/module/SingleModule";
// import ManageModule from "../components/module/ManageModule";
// import AddModule from "../components/module/AddModule";

// // eslint-disable-next-line no-empty-pattern
// const ProfilePage = ({}: InferGetServerSidePropsType<
//   // eslint-disable-next-line no-use-before-define
//   typeof getServerSideProps
// >) => {
//   // For authentication
//   const { user, userLoading, loggedIn } = useAuth();

//   // states for profile page crud
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [website, setWebsite] = useState("");
//   const [bio, setBio] = useState("");
//   const [avatarurl, setAvatarurl] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [isImageUploadLoading, setIsImageUploadLoading] = useState(false);

//   // states for module
//   const [modulecodes, setModuleCodes] = useState([]);
//   const [modulecode, setModuleCode] = useState("");

//   // Manage Module Modal Popup
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const initialRef = useRef();

//   // Add Module Modal Popup
//   const {
//     isOpen: isOpenAdd,
//     onOpen: onOpenAdd,
//     onClose: onCloseAdd,
//   } = useDisclosure();
//   const initialRefAdd = useRef();

//   useEffect(() => {
//     if (!userLoading && !loggedIn) {
//       // Router.push(ROUTE_AUTH);
//       toast.success("checking", {
//         id: "notification",
//         duration: 6000,
//         position: "top-center",
//       });
//     }
//   }, [userLoading, loggedIn]);

//   useEffect(() => {
//     if (user) {
//       setEmail(user.email);
//       // Fetch data and fill profile page information page
//       supabase
//         .from("profiles")
//         .select("*")
//         .eq("id", user.id)
//         .then(({ data, error }) => {
//           if (!error) {
//             setUsername(data[0].username || "");
//             setWebsite(data[0].website || "");
//             setBio(data[0].bio || "");
//             setAvatarurl(data[0].avatarurl || "");
//           }
//         });
//     }
//   }, [user]);

//   async function fetchModules() {
//     const { data, error } = await supabase
//       .from("modules")
//       .select("*")
//       .order("insertedat", { ascending: false });
//     if (!error) {
//       setModuleCodes(data);
//     } else {
//       console.log(error);
//     }
//   }

//   useEffect(() => {
//     fetchModules();
//   }, []);

//   useEffect(() => {
//     // const moduleListener = supabase
//     //   .from("modules")
//     //   .on("*", (payload) => {
//     //     console.log(payload.eventType);
//     //     if (payload.eventType !== "DELETE") {
//     //       const newModule = payload.new;

//     //       setModuleCodes((currentModules) => {
//     //         const targetModuleIndex = currentModules.findIndex(
//     //           (obj) => obj.id === newModule.id
//     //         );

//     //         if (targetModuleIndex !== -1) {
//     //           currentModules[targetModuleIndex] = newModule;
//     //           return [...currentModules];
//     //         }
//     //         return [newModule, ...currentModules];
//     //       });
//     //     }
//     //   })
//     //   .subscribe((status) => {
//     //     console.log(status);
//     //   });

//     // Hacked
//     const moduleListener = supabase
//       .from("modules")
//       .on("*", (payload) => {
//         console.log("Change received!", payload);
//       })
//       .subscribe((status) => {
//         console.log(status);
//         if (status === "SUBSCRIBED") fetchModules();
//       });

//     return () => {
//       moduleListener.unsubscribe();
//     };
//   });

//   // Event Handler to update profile information
//   const updateHandler = async (event) => {
//     event.preventDefault();
//     setIsLoading(true);
//     const body = { username, website, bio };
//     const { error } = await supabase.from("profiles").update(body);
//     if (!error) {
//       setUsername(body.username);
//       setWebsite(body.website);
//       setBio(body.bio);
//     }
//     setIsLoading(false);
//   };

//   const openHandler = (clickedTodo) => {
//     setModuleCode(clickedTodo);
//     onOpen();
//   };

//   // To create a unique id
//   function makeid(length) {
//     let result = "";
//     const characters =
//       "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//     const charactersLength = characters.length;
//     // eslint-disable-next-line no-plusplus
//     for (let i = 0; i < length; i++) {
//       result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     }
//     return result;
//   }

//   // Upload handler for profile avatar
//   const uploadHandler = async (event) => {
//     setIsImageUploadLoading(true);
//     const avatarFile = event.target.files[0];
//     const fileName = makeid(10);

//     const { error } = await supabase.storage
//       .from("avatars")
//       .upload(fileName, avatarFile, {
//         cacheControl: "3600",
//         upsert: false,
//       });
//     if (error) {
//       setIsImageUploadLoading(false);
//       console.log("error", error);
//       return;
//     }
//     const { publicURL, error: publicURLError } = supabase.storage
//       .from("avatars")
//       .getPublicUrl(fileName);
//     if (publicURLError) {
//       setIsImageUploadLoading(false);
//       console.log("publicURLError", publicURLError);
//       return;
//     }
//     await supabase.from("profiles").update({
//       avatarurl: publicURL,
//     });
//     setAvatarurl(publicURL);
//     setIsImageUploadLoading(false);
//   };

//   const deleteHandler = async (todoId) => {
//     const { error } = await supabase.from("modules").delete().eq("id", todoId);

//     if (!error) {
//       setModuleCodes(modulecodes.filter((todo) => todo.id !== todoId));
//     }
//   };

//   return (
//     <Box>
//       <div>
//         <Box>
//           {/* <Navbar /> */}

//           {/* update profile picture */}
//           <Box mt="8" maxW="xl" mx="auto">
//             <Flex align="center" justify="center" direction="column">
//               <Avatar
//                 size="2xl"
//                 src={avatarurl || ""}
//                 name={username || user?.email}
//               />
//               <FormLabel
//                 htmlFor="file-input"
//                 my="5"
//                 borderRadius="2xl"
//                 borderWidth="1px"
//                 textAlign="center"
//                 p="2"
//                 bg="blue.400"
//                 color="white"
//               >
//                 {isImageUploadLoading
//                   ? "Uploading....."
//                   : "Upload Profile Picture"}
//               </FormLabel>
//               <Input
//                 type="file"
//                 hidden
//                 id="file-input"
//                 onChange={uploadHandler}
//                 multiple={false}
//                 disabled={isImageUploadLoading}
//               />
//             </Flex>

//             {/* update profile information */}
//             <Stack
//               borderWidth="1px"
//               borderRadius="lg"
//               overflow="hidden"
//               p={5}
//               mt="-2"
//               spacing="4"
//               as="form"
//               onSubmit={updateHandler}
//             >
//               <FormControl id="email" isRequired>
//                 <FormLabel>Email</FormLabel>
//                 <Input type="email" isDisabled value={email} />
//               </FormControl>
//               <FormControl id="username" isRequired>
//                 <FormLabel>Username</FormLabel>
//                 <Input
//                   placeholder="Add your username here"
//                   type="text"
//                   value={username}
//                   onChange={(event) => setUsername(event.target.value)}
//                 />
//               </FormControl>
//               <FormControl id="website" isRequired>
//                 <FormLabel>Website URL</FormLabel>
//                 <Input
//                   placeholder="Add your website here"
//                   type="text" // url
//                   value={website}
//                   onChange={(event) => setWebsite(event.target.value)}
//                 />
//               </FormControl>
//               <FormControl id="bio" isRequired>
//                 <FormLabel>Bio</FormLabel>
//                 <Textarea
//                   placeholder="Add your bio here"
//                   value={bio}
//                   onChange={(event) => setBio(event.target.value)}
//                 />
//               </FormControl>
//               <Button colorScheme="blue" type="submit" isLoading={isLoading}>
//                 Update
//               </Button>
//             </Stack>

//             {/* modules form */}
//             <Stack
//               borderWidth="1px"
//               borderRadius="lg"
//               overflow="hidden"
//               p={5}
//               mt="-2"
//               spacing="4"
//               as="form"
//             >
//               {/* add module */}
//               <Flex>
//                 <AddModule
//                   isOpen={isOpenAdd}
//                   onClose={onCloseAdd}
//                   initialRef={initialRefAdd}
//                 />
//                 <Button onClick={onOpenAdd}>Add Module</Button>
//               </Flex>
//               <Stack>
//                 <ManageModule
//                   isOpen={isOpen}
//                   onClose={onClose}
//                   initialRef={initialRef}
//                   todo={modulecode}
//                   setTodo={setModuleCode}
//                   deleteHandler={deleteHandler}
//                   // isDeleteLoading={isDeleteLoading}
//                 />
//                 <h1>Modules taking this semester</h1>
//                 {modulecodes.map((module) => (
//                   <SingleModule
//                     todo={module}
//                     key={module.id}
//                     openHandler={openHandler}
//                     // deleteHandler={deleteHandler}
//                     // isDeleteLoading={isDeleteLoading}
//                   />
//                 ))}
//               </Stack>
//             </Stack>
//           </Box>
//         </Box>
//       </div>
//     </Box>
//   );
// };

// export default ProfilePage;

// // Fetch user data server-side to eliminate a flash of unauthenticated content.
// export const getServerSideProps: GetServerSideProps = async ({
//   req,
// }): Promise<NextAppPageServerSideProps> => {
//   const { user } = await supabase.auth.api.getUserByCookie(req);
//   // We can do a re-direction from the server
//   if (!user) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }
//   // or, alternatively, can send the same values that client-side context populates to check on the client and redirect
//   // The following lines won't be used as we're redirecting above
//   return {
//     props: {
//       user,
//       loggedIn: !!user,
//     },
//   };
// };
