import { IconButton, Tooltip } from "@chakra-ui/react";
import { Flex, Box, List, ListItem } from "@chakra-ui/layout";
import { MdOutlineStickyNote2 } from "react-icons/md";
import { GiAlarmClock } from "react-icons/gi";
import { BiStats } from "react-icons/bi";
import { AiOutlinePicture } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import Todo from "./todo/Todo";
import Timer from "./timer/Timer";
import AnalyticsReport from "./analytics/AnalyticsReport";
import VibeChanger from "./VibeChanger";

import { showWidget } from "../redux/WidgetSlice";
import { RootState } from "../redux/Store";

const SidebarComponent = ({ widget }) => {
  const dispatch = useDispatch();
  const showToDo = useSelector((state: RootState) => state.widget.todoShow);
  const showTimer = useSelector((state: RootState) => state.widget.timerShow);
  const showAnalytics = useSelector(
    (state: RootState) => state.widget.analyticsShow
  );
  const showBackground = useSelector(
    (state: RootState) => state.widget.backgroundShow

  );

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
      case "Analytics": {
        return showAnalytics;
      }
      case "Background": {
        return showBackground;
      }

      default:
        console.log("Error at show or widget not implemented yet");
    }
  };

  return (
    <ListItem margin="0.5em" fontSize="1rem">
      <Tooltip label={widget.name}>
        <span>
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
        </span>
      </Tooltip>

      <Flex style={{ display: showComponent(widget) ? null : "none" }}>
        {widget.component}
      </Flex>
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
    {
      name: "Analytics",
      icon: BiStats,
      component: <AnalyticsReport />,
    },
    {
      name: "Analytics",
      icon: BiStats,
      component: <AnalyticsReport />,
    },
    {
      name: "Background",
      id: "background",
      icon: AiOutlinePicture,
      component: <VibeChanger />,
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
  ];
  return (
    <Flex ml="2" w="3.5em" bg="brand.200" borderRadius="10px">
      <List spacing={4}>
        {widgets.map((widget, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <SidebarComponent widget={widget} key={index} />
        ))}
      </List>
    </Flex>
  );
};

export default Sidebar;
