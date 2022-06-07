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
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { MdEmail, MdPassword } from "react-icons/md";
import { useFormFields } from "../src/lib/utils";
import { useAuth } from "../src/lib/auth/useAuth";

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

const Signin = () => {
  // For user authentication and session checking
  const [isSignIn, setIsSignIn] = useState(true);
  const { loading, signIn, signUp, signOut, loggedIn } = useAuth();
  // Now since we have our form ready, what we're gonna need for signing up our users
  // 1. let users provide email and password
  const [values, handleChange] = useFormFields<SignUpFieldProps>(FORM_VALUES);
  // 2. send the provided details to Supabase
  // eslint-disable-next-line no-undef
  const handleSumbit = (event: React.FormEvent) => {
    event.preventDefault();
    // eslint-disable-next-line no-unused-expressions
    isSignIn ? signIn(values) : signUp(values);
  };

  // For Modal signin popup
  // States for modal view
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef();
  const finalRef = useRef();

  return (
    <div>
      {/* Button to open modal */}
      <Box mr="3" pl={3}>
        <Button colorScheme="purple" onClick={onOpen}>
          {loggedIn ? "Logout" : "Signin / Signup"}
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
          <ModalHeader> Lets get into the flow of things</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {loggedIn ? (
              <Box>
                <Button onClick={signOut}>Signout</Button>
              </Box>
            ) : (
              <>
                {/* App logo and tagline */}
                <Box>
                  <small>
                    Please provide your <strong>email</strong> and{" "}
                    <strong>password</strong> and{" "}
                    {isSignIn ? "Log In" : "Sign Up"}
                  </small>
                </Box>
                {/* Sign Up form  */}
                <form
                  className="w-full sm:w-1/2 xl:w-1/3"
                  onSubmit={handleSumbit}
                >
                  <Box>
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
                        <Button type="submit" colorScheme="blue" w="full">
                          {isSignIn ? "Log In" : "Sign Up"}
                        </Button>
                        <HStack>
                          {/* Toggle signin or signup mode */}
                          <small className="block text-gray-600">
                            {isSignIn
                              ? "Not part of the club yet?"
                              : "Already a member?"}{" "}
                          </small>
                          {/* <a
                            className="block font-semibold"
                            href=""
                            type="link"
                            onClick={(e) => {
                              e.preventDefault();
                              setIsSignIn(!isSignIn);
                            }}
                          >
                            {isSignIn ? "Sign Up" : "Log In"}
                          </a> */}
                          <Button
                            colorScheme="purple"
                            onClick={(e) => {
                              e.preventDefault();
                              setIsSignIn(!isSignIn);
                            }}
                          >
                            {isSignIn ? "Sign Up" : "Log In"}
                          </Button>
                        </HStack>
                      </VStack>
                    </Box>
                  </Box>
                </form>
                <div className="h-12 w-12 relative">{loading}</div>
              </>
            )}
          </ModalBody>

          {/* <ModalFooter>
            {/* <Button>Not sure what to put</Button> */}
          {/* </ModalFooter> */}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Signin;
