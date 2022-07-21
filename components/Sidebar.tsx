import { IconButton } from "@chakra-ui/react";
import { Flex, Box, List, ListItem } from "@chakra-ui/layout";
import { MdOutlineStickyNote2 } from "react-icons/md";
// , MdEvent
// import { HiMusicNote } from "react-icons/hi";
import { GiAlarmClock } from "react-icons/gi";
// import { BiStats } from "react-icons/bi";

import { useDispatch, useSelector } from "react-redux";
import Todo from "./todo/Todo";
import Timer from "./timer/Timer";

import { showWidget } from "../redux/WidgetSlice";
import { RootState } from "../redux/Store";

const SidebarComponent = ({ widget }) => {
  const dispatch = useDispatch();
  const showToDo = useSelector((state: RootState) => state.widget.todoShow);
  const showTimer = useSelector((state: RootState) => state.widget.timerShow);

  const setShowComponent = (props) => {
    dispatch(showWidget(props.name));
  };

  const showComponent = (props) => {
    switch (props.name) {
      case "To-Do": {
        return showToDo;
      }
      case "Timer": {
        return showTimer;
      }

      default:
        console.log("Error at show or widget not implemented yet");
    }
  };

  return (
    <ListItem margin="0.5em" fontSize="1rem">
      <IconButton
        color="brand.400"
        bg="brand.100"
        borderRadius="10px"
        aria-label="Call Segun"
        as={widget.icon}
        id={widget.id}
        onClick={() => {
          setShowComponent(widget);
        }}
      />
      <Box style={{ display: showComponent(widget) ? null : "none" }}>
        {widget.component}
      </Box>
    </ListItem>
  );
};

const Sidebar = () => {
  const widgets = [
    {
      name: "To-Do",
      id: "todo",
      icon: MdOutlineStickyNote2,
      component: <Todo />,
    },
    {
      name: "Timer",
      id: "timer",
      icon: GiAlarmClock,
      component: <Timer />,
    },
    // {
    //   name: "Music",
    //   icon: HiMusicNote,
    //   component: <Flex />,
    // },
    // {
    //   name: "Events",
    //   icon: MdEvent,
    //   component: <Flex />,
    // },
    // {
    //   name: "Stats",
    //   icon: BiStats,
    //   component: <Flex />,
    // },
  ];
  return (
    // <VStack w="10em" h="100%" >
    <Flex ml="2" w="3.5em" bg="brand.200" borderRadius="10px">
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
