import { ChakraProvider } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";
import type { AppProps } from "next/app";
import { Provider as ProviderRedux } from "react-redux";
import { Provider as ProviderSupabase } from "react-supabase";
import { AuthProvider } from "../src/lib/auth/AuthContext";
import theme from "../src/theme";
import "../src/theme/styles.css";
import "../src/theme/index.css";
import { store } from "../redux/Store";
import { supabase } from "../src/lib";

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <Toaster />
      <AuthProvider>
        <ProviderRedux store={store}>
          <ProviderSupabase value={supabase}>
            <Component {...pageProps} />
          </ProviderSupabase>
        </ProviderRedux>
      </AuthProvider>
    </ChakraProvider>
  );
};

export default MyApp;
