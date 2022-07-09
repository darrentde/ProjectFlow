import { ChakraProvider } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../redux/Store";
import { AuthProvider } from "../src/lib/auth/AuthContext";
import theme from "../src/theme";
import "../src/theme/styles.css";
import "../src/theme/index.css";

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <Toaster />
      <AuthProvider>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </AuthProvider>
    </ChakraProvider>
  );
};

export default MyApp;
