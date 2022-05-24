import {
  Flex,
  Box,
  VStack,
  Button,
  FormControl,
  Input,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  InputLeftElement,
  InputGroup,
  HStack,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { useState, useEffect } from "react";
import { FaLock } from "react-icons/fa";
import { useFormFields } from "../src/lib/utils";
import { supabase } from "../src/lib/supabase";
import { useAuth } from "../src/lib/auth/useAuth";
import { MdEmail, MdPassword } from "react-icons/md";

// export * from "../src/lib/auth/auth.types";
// export * from "../src/lib/auth/AuthContext";
// export * from "../src/lib/auth/useAuth";
// import * from "../src/lib/auth/auth.types";
// export { AuthContext } from "../src/lib/auth/AuthContext";
// export { useAuth } from "../src/lib/auth/useAuth";

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

function Signin() {
  const [isSignIn, setIsSignIn] = useState(true);
  const { loading, signIn, signUp, user, loggedIn } = useAuth();
  // Now since we have our form ready, what we're gonna need for signing up our users
  // 1. let users provide email and password
  const [values, handleChange] = useFormFields<SignUpFieldProps>(FORM_VALUES);
  // 2. send the provided details to Supabase

  const handleSumbit = (event: React.FormEvent) => {
    event.preventDefault();
    isSignIn ? signIn(values) : signUp(values);
  };

  return (
    <div>
      {/* App logo and tagline*/}
      <Box>
        <small>
          Please provide your <strong>email</strong> and{" "}
          <strong>password</strong> and {isSignIn ? "Log In" : "Sign Up"}
        </small>
      </Box>

      {/* Sign Up form  */}
      <form className="w-full sm:w-1/2 xl:w-1/3" onSubmit={handleSumbit}>
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
                  {isSignIn ? "Not part of the club yet?" : "Already a member?"}{" "}
                </small>
                <a
                  className="block font-semibold"
                  href=""
                  type="link"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsSignIn(!isSignIn);
                  }}
                >
                  {isSignIn ? "Sign Up" : "Log In"}
                </a>
              </HStack>
            </VStack>
          </Box>
        </Box>
      </form>
      <div className="h-12 w-12 relative">{loading}</div>
    </div>
  );
}

export default Signin;
