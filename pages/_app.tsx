import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider as AuthProvider } from "next-auth/react";
import theme from "../src/theme";
import "../src/theme/styles.css";

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider session={session}>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
};

export default MyApp;
