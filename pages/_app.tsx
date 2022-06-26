import { ChakraProvider } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { AuthProvider } from "../src/lib/auth/AuthContext";
import theme from "../src/theme";
import "../src/theme/styles.css";
import "../src/theme/index.css";
import { store } from "../redux/Store";

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
