/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-children-prop */
import {
  Button,
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
  Text,
} from "@chakra-ui/react";
import { supabase } from "../../src/lib/supabase";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { MdEmail } from "react-icons/md";

const ForgetPassword = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [emailforget, setEmailForget] = useState("");

  const handleForgetPassword = async (event) => {
    const currentURL = window.location.href;
    const tempURL = currentURL + "#resetpassword";
    const resetURL = tempURL.replace(/#(?=\S)/g, "");
    console.log(resetURL);

    event.preventDefault();
    await supabase.auth.api.resetPasswordForEmail(emailforget, {
      redirectTo: resetURL,
      // this will redirect to us at password-reset page,
      // you can also set your own page for it.
    });
    toast.success("Sent! Please check your email for reset instructions");

    onClose();
  };

  useEffect(() => {
    if (props.showForgetPassword) {
      onOpen();
    }
  }, [props.showForgetPassword]);

  return (
    <Modal
      // initialFocusRef={initialRef}
      //   finalFocusRef={finalRef}
      isOpen={isOpen}
      onClose={(props.handleForgetCallback(), onClose)}
    >
      <ModalOverlay>
        <ModalContent>
          <ModalHeader>Let's change your password!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleForgetPassword}>
              <Text>Please enter your recovery email</Text>
              <InputGroup mt="4">
                <InputLeftElement children={<MdEmail />} />
                <Input
                  placeholder="Your Registered Email"
                  required
                  value={emailforget}
                  onChange={(event) => setEmailForget(event.target.value)}
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
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

export default ForgetPassword;
