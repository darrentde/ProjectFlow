import { Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { supabase } from "../../src/lib/supabase";
import TimerSessionEntry from "./TimerSessionEntry";

const TimerEntry = ({ props }) => {
  const whatIsTheDay = (someDate) => {
    const date = new Date(someDate).toLocaleDateString();
    const today = new Date();
    const yesterday = new Date();

    yesterday.setDate(today.getDate() - 1);

    if (date === today.toLocaleDateString()) {
      return "Today";
    }

    if (date === yesterday.toLocaleDateString()) {
      return "Yesterday";
    }
    return date;
  };

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
  // });

  return (
    <Flex direction="column" margin="10px">
      <Flex border="1px solid" border-color="red" padding="10px">
        {whatIsTheDay(props.key)}
      </Flex>
      {props.sessions[props.key].map((session) => {
        return <TimerSessionEntry session={session} />;
      })}
    </Flex>
  );
};

export default TimerEntry;
