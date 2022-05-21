import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { SessionProvider as AuthProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

import theme from "../src/theme";
import "../src/theme/styles.css";
import { SessionProvider } from "next-auth/react";

// const MyApp = ({ Component, pageProps }: AppProps) => {
//   return (
//     <ChakraProvider theme={theme}>
//       <Component {...pageProps} />
//     </ChakraProvider>
//   );
// };

// export default MyApp;

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
};

export default MyApp;
