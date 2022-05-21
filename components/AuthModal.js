import { signIn } from "next-auth/react";

const AuthModal = () => {
  //...

  const signInWithEmail = async ({ email }) => {
    let toastId;
    try {
      toastId = toast.loading("Loading...");
      setDisabled(true);
      // Perform sign in
      const { error } = await signIn("email", {
        redirect: false,
        callbackUrl: window.location.href,
        email,
      });
      // Something went wrong
      if (error) {
        throw new Error(error);
      }
      setConfirm(true);
      toast.dismiss(toastId);
    } catch (err) {
      toast.error("Unable to sign in", { id: toastId });
    } finally {
      setDisabled(false);
    }
  };

  //   ...
};
