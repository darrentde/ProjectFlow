import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useAuth } from "../../src/lib/auth/useAuth";
import { supabase } from "../../src/lib/supabase";
import TimerSessionEntry from "./TimerSessionEntry";

const TimerSessions = () => {
  const { user } = useAuth();
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    if (user) {
      supabase
        .from("sessions")
        .select("*")
        .eq("user_id", user?.id)
        .then(({ data, error }) => {
          if (error) {
            console.log(error);
          } else {
            console.log(data);
            setSessions(data);
          }
        });
    }
  }, [user]);

  return (
    <Flex>
      <Flex maxHeight="300px" flexDirection="column">
        {/* <Flex>Header</Flex>
        <Flex>Body</Flex> */}
        {sessions.map((session) => (
          <TimerSessionEntry session={session} key={session.id} />
        ))}
      </Flex>
    </Flex>
  );
};

export default TimerSessions;
