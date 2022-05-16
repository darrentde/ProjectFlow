import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";

import theme from "../src/theme";
import "../src/theme/styles.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default MyApp;
