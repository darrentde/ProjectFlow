import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabase } from "../../src/lib/supabase";
import TimerSessionEntry from "./TimerSessionEntry";
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

      // Object.keys(dates).forEach((key) => {
      //   console.log(key, dates[key]);
      // });
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
      {/* {sessions
        .map((session) => {
          const x = new Date(session.start_at).toLocaleDateString();
          return x;
        }) // Get all dates
        .filter((x, i, a) => a.indexOf(x) === i) // Get unique dates
        .map((x) => {
          return <Flex>{x} </Flex>;
        })} */}
      {/* {sessions
        .map((session) => {
          // Get all dates
          const byDate = new Date(session.start_at).toLocaleDateString();
          const dict = { [byDate]: session };
          return dict;
        })
        .reduce((r, a) => {
          r[a.byDate] = r[a.byDate] || [];
          r[a.byDate].push(a);
          return r;
        }, Object.create(null))
        .toArray()
        .map(() => {
          return <Flex> 1 </Flex>;
        })}
      ; */}
      {/* .filter(
          (e, i, a) =>
            // Get unique dates
            a.indexOf(e) === i
        )
        .map((session) => {
          return <Flex>{session} </Flex>;
        })} */}
      {/* {sessions.reduce((groups, session) => {
        const date = session.start_at.split("T")[0];
        if (date in groups) {
          groups[date].push(session);
        } else {
          groups[date] = new Array(session);
        }
        return groups;
      }, {})} */}
      {/* {console.log(sessions)} */}

      {/* Object.keys(dates).forEach((key) => {
        console.log(key, dates[key]);
      }); */}

      {Object.keys(sessions).map((key) => {
        // console.log(key);
        return (
          <Flex flexDirection="column">
            <Flex>{key}</Flex>
            <TimerEntry sessions={sessions[key]} key={key} />
          </Flex>
        );
      })}
    </Flex>
  );
};

export default TimerSessions;
