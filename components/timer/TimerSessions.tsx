import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuth } from "../../src/lib/auth/useAuth";
import { supabase } from "../../src/lib/supabase";
import TimerSessionEntry from "./TimerSessionEntry";

const TimerSessions = () => {
  // const { user } = useAuth();
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    // Get all sessions for user
    const getSessions = async () => {
      const user = supabase.auth.user();
      const { data, error } = await supabase
        .from("sessions")
        .select("*")
        .eq("user_id", user?.id);

      if (error) {
        console.log(error);
      } else {
        setSessions(data);
        console.log(data);
      }
    };
    getSessions();
  }, []);

  return (
    <Flex flexDirection="column" maxHeight="150" overflow="auto">
      {sessions.map((session) => {
        return <TimerSessionEntry session={session} key={session.session_id} />;
      })}

      {/* {sessions
          .map((session) => {
            const x = new Date(session.start_at).toLocaleDateString();
            return x;
          })
          .filter((x, i, a) => a.indexOf(x) === i)
          .map((x) => {
            return <Flex>{x} </Flex>;
          })} */}
    </Flex>
  );
};

export default TimerSessions;
