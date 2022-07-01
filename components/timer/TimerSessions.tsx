import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabase } from "../../src/lib/supabase";
import TimerEntry from "./TimerEntry";

const TimerSessions = () => {
  // const { user } = useAuth();
  const [sessions, setSessions] = useState({});
  const [sessionList, setSessionList] = useState([]);

  const findDates = (data) => {
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
  };

  // Get all sessions for user
  const getSessions = async () => {
    const { data, error } = await supabase
      .from("sessions")
      .select("*")
      .order("start_at", { ascending: false });

    if (error) {
      console.log(error);
    } else {
      setSessionList(data);
      // console.log(data);
      findDates(data);
    }
  };

  useEffect(() => {
    getSessions();
  }, []);

  useEffect(() => {
    // const sessionListener = supabase
    //   .from("sessions")
    //   .on("*", (payload) => {
    //     console.log(1);
    //     console.log(payload.eventType);
    //     // const deletedSession = payload.new;
    //     // sessionList.filter(
    //     //   (sessionEntry) =>
    //     //     sessionEntry.session_id !== deletedSession.session_id
    //     // );
    //   })
    //   .subscribe((status) => {
    //     console.log(status);
    //   });

    const sessionListener = supabase
      .from("sessions")
      .on("*", (payload) => {
        console.log("Change received!", payload);
      })
      .subscribe((status) => {
        if (status === "SUBSCRIBED") {
          getSessions();
        }
      });

    return () => {
      sessionListener.unsubscribe();
    };
  });

  // To update with delete / add sessions listener
  // useEffect(() => {
  //   const sessionListener = supabase
  //     .from("sessions")
  //     .on("*", (payload) => {
  //       if (payload.eventType !== "DELETE") {
  //         const newSession = payload.new;
  //         setPreFormattedSession((oldSessions) => {
  //           const exists = oldSessions.find(
  //             (sessionEntry) =>
  //               sessionEntry.session_id === newSession.session_id
  //           );
  //           let newSessions;
  //           if (exists) {
  //             const oldSessionIndex = oldSessions.findIndex(
  //               (obj) => obj.session_id === newSession.session_id
  //             );
  //             oldSessions[oldSessionIndex] = newSession;
  //             newSessions = oldSessions;
  //           } else {
  //             newSessions = [...oldSessions, newSession];
  //           }
  //           findDates(newSession);
  //           return newSessions;
  //         });
  //       }
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
