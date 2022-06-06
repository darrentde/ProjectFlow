import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { AuthProvider } from "../src/lib/auth/AuthContext";
import theme from "../src/theme";
import "../src/theme/styles.css";
import { Toaster } from "react-hot-toast";

import { store } from '../redux/Store'
import { Provider } from 'react-redux'

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </Provider>

    </ChakraProvider>
  );
};

export default MyApp;
