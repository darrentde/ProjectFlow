import { Flex, Collapse } from "@chakra-ui/react";
import TimerSessionEntry from "./TimerSessionEntry";

const TimerEntry = ({ sessions }) => {
  return (
    // // eslint-disable-next-line react/destructuring-assignment
    // <Collapse in={props.show}>
    //   <Flex flexDirection="column" borderTop="0.1rem solid black">
    //     {props.view ? <TimerSettings /> : <TimerSessions />}
    //   </Flex>
    // </Collapse>
    // <Flex>{sessions}</Flex>

    sessions.map((session) => {
      return <TimerSessionEntry session={session} />;
    })
  );
};

export default TimerEntry;
