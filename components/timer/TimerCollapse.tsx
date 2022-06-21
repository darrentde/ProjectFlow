import { Flex, Collapse } from "@chakra-ui/react";

import TimerSettings from "./TimerSettings";
import TimerSessions from "./TimerSessions";

const TimerCollapse = ({ props }) => {
  return (
    // eslint-disable-next-line react/destructuring-assignment
    <Collapse in={props.show}>
      <Flex flexDirection="column" borderTop="0.1rem solid black">
        <Flex>{props.view ? <TimerSettings /> : <TimerSessions />}</Flex>
      </Flex>
    </Collapse>
  );
};

export default TimerCollapse;
