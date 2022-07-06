import { Flex, Collapse } from "@chakra-ui/react";

import TimerSettings from "./TimerSettings";
import TimerSessions from "./TimerSessions";

const TimerShowCollapse = ({ props }) => {
  return (
    // eslint-disable-next-line react/destructuring-assignment
    <Collapse in={props.showAdditional}>
      <Flex flexDirection="column" borderTop="0.1rem solid black">
        {props.view ? <TimerSettings /> : <TimerSessions />}
      </Flex>
    </Collapse>
  );
};

export default TimerShowCollapse;
