import { useAuth } from "../../src/lib/auth/useAuth";
import Logout from "./Logout";
import Login from "./Login";

const AuthenticationHandler = () => {
  // For user authentication and session checking
  const { loggedIn } = useAuth();

  return loggedIn ? <Logout /> : <Login />;
};

export default AuthenticationHandler;
