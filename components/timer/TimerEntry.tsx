import { Flex } from "@chakra-ui/react";
import TimerSessionEntry from "./TimerSessionEntry";

const TimerEntry = ({ props }) => {
  const whatDay = (someDate) => {
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

  return (
    <Flex direction="column" margin="10px">
      <Flex border="1px solid" border-color="red" padding="10px">
        {whatDay(props.key)}
      </Flex>
      {props.sessions[props.key].map((session) => {
        return <TimerSessionEntry session={session} />;
      })}
    </Flex>
  );
};

export default TimerEntry;
