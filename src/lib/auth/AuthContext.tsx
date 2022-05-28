import {
  createContext,
  FunctionComponent,
  useState,
  useEffect,
  useCallback,
} from "react";
import Router from "next/router";
import { User, Session, AuthChangeEvent } from "@supabase/supabase-js";
import { supabase } from "../supabase";
import { SupabaseAuthPayload } from "./auth.types";
import { ROUTE_HOME, ROUTE_AUTH } from "../../config";
import toast from "react-hot-toast";

export type AuthContextProps = {
  user: User;
  signUp: (payload: SupabaseAuthPayload) => void;
  signIn: (payload: SupabaseAuthPayload) => void;
  signOut: () => void;
  loggedIn: boolean;
  loading: boolean;
  userLoading: boolean;
};

export const AuthContext = createContext<Partial<AuthContextProps>>({});

export const AuthProvider: FunctionComponent = ({ children }) => {
  //   Checking user status

  const [user, setUser] = useState<User>(null);
  const [userLoading, setUserLoading] = useState(true);
  const [loggedIn, setLoggedin] = useState(false);

  const [loading, setLoading] = useState(false);

  const errorMessage = () =>
    toast.error("Error", {
      id: "notification",
      duration: 6000,
      position: "top-center",
    });

  const signUp = async (payload: SupabaseAuthPayload) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp(payload);
      if (error) {
        console.log({ message: error.message, type: "error" });
        errorMessage;
      } else {
        console.log({
          message:
            "Signup successful. Please check your inbox for a confirmation email!",
          type: "success",
        });

        toast.success(
          "Signup successful.\n Please check your inbox for a confirmation email!",
          {
            id: "notification",
            duration: 6000,
            position: "top-center",
          }
        );
      }
    } catch (error) {
      console.log({ message: error.error_description || error, type: "error" });
      errorMessage;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (payload: SupabaseAuthPayload) => {
    try {
      setLoading(true);
      const { error, user } = await supabase.auth.signIn(payload);
      if (error) {
        console.log({ message: error.message, type: "error" });
        errorMessage;
      } else {
        console.log({
          message: `Welcome, ${user.email}`,
          type: "success",
        });

        toast.success(`"Welcome, ${user.email}"`, {
          id: "notification",
          duration: 6000,
          position: "top-center",
        });
      }
    } catch (error) {
      console.log({ message: error.error_description || error, type: "error" });
      errorMessage;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    console.log("Sign out success");
    toast.success("Sign out success", {
      id: "notification",
      duration: 6000,
      position: "top-center",
    });
  };

  //handleAuthSession
  const setServerSession = async (event: AuthChangeEvent, session: Session) => {
    await fetch("/api/auth", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
      body: JSON.stringify({ event, session }),
    });
  };

  useEffect(() => {
    const user = supabase.auth.user();

    // User is logged in
    if (user) {
      setUser(user);
      setUserLoading(false);
      setLoggedin(true);
      Router.push(ROUTE_HOME);
    }

    // Listener for auth state change
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const user = session?.user! ?? null;
        setUserLoading(false);
        await setServerSession(event, session);
        if (user) {
          setUser(user);
          setLoggedin(true);

          //Check supabase profile table based on auth.id
          supabase
            .from("profiles")
            .upsert({ id: user.id })
            .then(() => {
              Router.push(ROUTE_HOME); //User is authenticated, access to homepage
            });
        } else {
          setUser(null);
          Router.push(ROUTE_AUTH); //User not authenticated, go to login page
        }
      }
    );

    return () => {
      authListener.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signUp,
        signIn,
        signOut,
        loggedIn,
        loading,
        userLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
