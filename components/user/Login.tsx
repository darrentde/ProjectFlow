/* eslint-disable react/no-children-prop */
import {
  Box,
  VStack,
  Button,
  FormControl,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  InputLeftElement,
  InputGroup,
  HStack,
  Text,
  Divider,
} from "@chakra-ui/react";

import { useState, useRef, useCallback } from "react";
import { MdEmail, MdPassword } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { useFormFields } from "../../src/lib/utils";
import { useAuth } from "../../src/lib/auth/useAuth";
import ForgetPassword from "./ForgetPassword";

// Values to pass to the signup form
type SignUpFieldProps = {
  email: string;
  password: string;
};

// Values to initialize the SignUp form with
const FORM_VALUES: SignUpFieldProps = {
  email: "",
  password: "",
};

const Login = () => {
  // For Modal signin popup
  // States for modal view
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef();
  const finalRef = useRef();

  // For user authentication and session checking
  const [isSignIn, setIsSignIn] = useState(true);
  const [showForgetPassword, setShowForgetPassword] = useState(false);
  const { loading, signIn, signUp, signInWithGithub } = useAuth();
  // Now since we have our form ready, what we're gonna need for signing up our users
  // 1. let users provide email and password
  const [values, handleChange] = useFormFields<SignUpFieldProps>(FORM_VALUES);
  // 2. send the provided details to Supabase
  // eslint-disable-next-line no-undef
  const handleSumbit = (event: React.FormEvent) => {
    event.preventDefault();
    // eslint-disable-next-line no-unused-expressions
    isSignIn ? signIn(values) : signUp(values);
    onClose();
  };

  const handleForgetPassword = () => {
    setShowForgetPassword(true);
    onClose();
  };

  const handleForgetCallback = useCallback(() => {
    setShowForgetPassword(false);
  }, []);

  return (
    <div>
      {/* Button to open modal */}
      <Box mr="3" pl={3}>
        <Button
          bgColor="brand.400"
          textColor="white"
          _hover={{ bg: "brand.300" }}
          onClick={onOpen}
        >
          Signin / Signup
        </Button>
      </Box>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Lets get into the flow</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <>
              <form
                className="w-full sm:w-1/2 xl:w-1/3"
                onSubmit={handleSumbit}
              >
                <Box>
                  <Button mb={4} onClick={signInWithGithub} w="100%">
                    <FaGithub /> &nbsp;{isSignIn ? "Log In" : " Sign Up"} with
                    Github
                  </Button>

                  <Divider />
                  <Box>
                    <FormControl mt={4}>
                      <VStack spacing={4}>
                        <InputGroup>
                          <InputLeftElement children={<MdEmail />} />
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            className="h-12 px-4 py-2 bg-white rounded shadow-inner border-gray-300 w-full border  hover:border-gray-400"
                            placeholder="Your Email"
                            required
                            value={values.email}
                            onChange={handleChange}
                          />
                        </InputGroup>
                        <InputGroup>
                          <InputLeftElement children={<MdPassword />} />
                          <Input
                            id="password"
                            name="password"
                            type="password"
                            className="h-12 px-4 py-2 bg-white rounded shadow-inner border-gray-300 w-full border hover:border-gray-400"
                            placeholder="Your password"
                            required
                            value={values.password}
                            onChange={handleChange}
                          />
                        </InputGroup>
                      </VStack>
                    </FormControl>
                  </Box>

                  {/*  Sign Up form: Actions */}

                  <Box mt={4}>
                    <VStack spacing={4}>
                      {/* Submit button for signin/signup */}
                      <Button
                        type="submit"
                        bgColor="brand.400"
                        textColor="white"
                        _hover={{ bg: "brand.300" }}
                        w="full"
                      >
                        {isSignIn ? "Log In" : "Sign Up"}
                      </Button>
                      <HStack>
                        {/* Toggle signin or signup mode */}
                        <Text as="i">
                          {isSignIn
                            ? "Not part of the club yet?"
                            : "Already a member?"}{" "}
                        </Text>
                        <Button
                          bgColor="brand.400"
                          textColor="white"
                          _hover={{ bg: "brand.300" }}
                          onClick={(e) => {
                            e.preventDefault();
                            setIsSignIn(!isSignIn);
                          }}
                        >
                          {isSignIn ? "Sign Up" : "Log In"}
                        </Button>
                      </HStack>
                      <Button
                        // bgColor="brand.400"
                        as="i"
                        bg="transparent"
                        textColor="black"
                        onClick={handleForgetPassword}
                      >
                        Forgot password?
                      </Button>
                    </VStack>
                  </Box>
                </Box>
              </form>
              <div className="h-12 w-12 relative">{loading}</div>
            </>
          </ModalBody>
        </ModalContent>
      </Modal>
      <ForgetPassword
        showForgetPassword={showForgetPassword}
        handleForgetCallback={handleForgetCallback}
      />
    </div>
  );
};

export default Login;
