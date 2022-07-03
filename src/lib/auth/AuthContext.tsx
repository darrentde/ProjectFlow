/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import Router from "next/router";
import { User, Session, AuthChangeEvent } from "@supabase/supabase-js";
import { supabase } from "../supabase";
import { SupabaseAuthPayload } from "./auth.types";
import { ROUTE_HOME, ROUTE_AUTH } from "../../config";

export type AuthContextProps = {
  user: User;
  signUp: (payload: SupabaseAuthPayload) => void;
  signIn: (payload: SupabaseAuthPayload) => void;
  signOut: () => void;
  signInWithGithub: () => void;
  loggedIn: boolean;
  loading: boolean;
  userLoading: boolean;
};

export const AuthContext = createContext<Partial<AuthContextProps>>({});

export const AuthProvider = (props: any) => {
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
        errorMessage();
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
      errorMessage();
    } finally {
      setLoading(false);
    }
  };

  const signInWithGithub = async () => {
    // remove evt in arguments
    // evt.preventDefault();
    await supabase.auth.signIn({ provider: "github" });
  };

  const signIn = async (payload: SupabaseAuthPayload) => {
    try {
      setLoading(true);
      const { error, user } = await supabase.auth.signIn(payload);
      if (error) {
        console.log({ message: error.message, type: "error" });
        errorMessage();
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
      errorMessage();
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
    // Router.push(ROUTE_HOME);
    window.location.reload();
  };

  // handleAuthSession
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

    setUserLoading(false);
    // User is logged in
    if (user) {
      setUser(user);
      setLoggedin(true);
      Router.push(ROUTE_HOME);
    }

    // Listener for auth state change
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const user = session?.user! ?? null;

        // console.log(session.token_type ?? null);
        // console.log(session.access_token ?? null);

        setUserLoading(false);
        await setServerSession(event, session);
        if (user) {
          setUser(user);
          setLoggedin(true);
          Router.push(ROUTE_HOME);
          // Check supabase profile table based on auth.id
          supabase.from("profiles").upsert({ id: user.id });
          // .then(() => {
          //   // Router.push(ROUTE_HOME); // User is authenticated, access to homepage
          //   // toast.success("Logged in successfully (AUTH)", {
          //   //   id: "notification",
          //   //   duration: 6000,
          //   //   position: "top-center",
          //   // });
          // });
        } else {
          setUser(null); // new: nullify the user object
          Router.push(ROUTE_HOME); // User not authenticated, redirect to homepage
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
        signInWithGithub,
        loggedIn,
        loading,
        userLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
