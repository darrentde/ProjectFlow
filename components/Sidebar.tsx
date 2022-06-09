import { IconButton } from "@chakra-ui/react";
import { Flex, Box, List, ListItem } from "@chakra-ui/layout";
import { MdOutlineStickyNote2, MdEvent } from "react-icons/md";
import { HiMusicNote } from "react-icons/hi";
import { GiAlarmClock } from "react-icons/gi";
import { BiStats } from "react-icons/bi";

import { useState } from "react";

import Todo from "./todo/Todo";
import Timer from "./Timer";

const SidebarComponent = ({ widget }) => {
  const [showComponent, setShowComponent] = useState(false);

  return (
    <ListItem margin="0.5em" fontSize="1rem">
      <IconButton
        colorScheme="teal"
        aria-label="Call Segun"
        as={widget.icon}
        onClick={() => {
          setShowComponent(!showComponent);
        }}
      />
      <Box style={{ display: showComponent ? null : "none" }}>
        {" "}
        {widget.component}{" "}
      </Box>
    </ListItem>
  );
};

const Sidebar = () => {
  const widgets = [
    {
      name: "To-Do",
      icon: MdOutlineStickyNote2,
      component: <Todo />,
    },
    {
      name: "Timer",
      icon: GiAlarmClock,
      component: <Timer />,
    },
    {
      name: "Music",
      icon: HiMusicNote,
      component: <Todo />,
    },
    {
      name: "Events",
      icon: MdEvent,
      component: <Todo />,
    },
    {
      name: "Stats",
      icon: BiStats,
      component: <Todo />,
    },
  ];
  return (
    // <VStack w="10em" h="100%" >
    <Flex w="3.5em" bg="#63B3ED" borderRadius="10px">
      <List spacing={4}>
        {widgets.map((widget, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <SidebarComponent widget={widget} key={index} />
        ))}
      </List>
    </Flex>
    // </VStack>
  );
};

export default Sidebar;
