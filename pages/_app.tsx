import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider as AuthProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import theme from "../src/theme";
import "../src/theme/styles.css";

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider session={session}>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
};

export default MyApp;
