import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabase } from "../../src/lib/supabase";
import TimerEntry from "./TimerEntry";

const TimerSessions = () => {
  // const { user } = useAuth();
  const [sessions, setSessions] = useState({});

  useEffect(() => {
    // Get all sessions for user
    const getSessions = async () => {
      const user = supabase.auth.user();
      const { data, error } = await supabase
        .from("sessions")
        .select("*")
        .eq("user_id", user?.id)
        .order("start_at", { ascending: false });

      if (error) {
        console.log(error);
      } else {
        const s = data.reduce((groups, session) => {
          const date = session.start_at.split("T")[0];
          if (date in groups) {
            groups[date].push(session);
          } else {
            groups[date] = new Array(session);
          }
          return groups;
        }, {});
        setSessions(s);
      }
    };
    getSessions();
  }, []);

  // useEffect(() => {
  //   const sessionListener = supabase
  //     .from("sessions")
  //     .on("*", (payload) => {
  //       console.log("Change received!", payload);
  //     })
  //     .subscribe();
  //   return () => {
  //     sessionListener.unsubscribe();
  //   };
  // }, []);

  return (
    <Flex flexDirection="column" maxHeight="150" overflow="auto">
      {Object.keys(sessions).map((key) => {
        const props = { key, sessions };
        return <TimerEntry props={props} />;
      })}
    </Flex>
  );
};

export default TimerSessions;
