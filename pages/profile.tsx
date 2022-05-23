import Link from "next/link";
import { useAuth } from "../src/lib/auth/useAuth";

import { Box, Text } from "@chakra-ui/layout";

const ProfilePage = ({}) => {
  const { user, loading, signOut } = useAuth();

  if (loading) {
    return <Text>Loading Loading Spinner</Text>;
  }

  return (
    <Box>
      <div className="h-screen flex flex-col justify-center items-center relative">
        <h2 className="text-3xl my-4">
          Howdie, {user && user.email ? user.email : "Explorer"}!
        </h2>
        {!user && (
          <small>
            You've landed on a protected page. Please{" "}
            <Link href="/">log in</Link> to view the page's full content{" "}
          </small>
        )}
        {user && (
          <div>
            <button
              onClick={signOut}
              className="border bg-gray-500 border-gray-600 text-white px-3 py-2 rounded w-full text-center transition duration-150 shadow-lg"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </Box>
  );
};

export default ProfilePage;
