import { IconButton } from "@chakra-ui/react";
import {Flex,Box, List, ListItem} from "@chakra-ui/layout";
import {MdOutlineStickyNote2, MdEvent} from "react-icons/md";
import {HiMusicNote} from "react-icons/hi"
import {GiAlarmClock} from "react-icons/gi"
import {BiStats} from "react-icons/bi"

import { useState } from "react";

import Todo from "../components/Todo"
import Timer from "./Timer";

function Sidebar() {
  const widgets = [
    {
      name: "To-Do",
      icon: MdOutlineStickyNote2,
      component: <Todo/>
    },
    {
      name: "Timer",
      icon: GiAlarmClock,
      component: <Timer/>
    },
    {
      name: "Music",
      icon: HiMusicNote,
      component: <Todo/>
    },
    {
      name: "Events",
      icon: MdEvent,
      component: <Todo/>
    },
    {
      name: "Stats",
      icon: BiStats,
      component: <Todo/>
    },
  ];
  return(
    <Flex w="100px" h="100%" >
      <Box w="100" bg="#63B3ED">
        <List spacing={4}>
          {widgets.map((widget,index) => (
            <SidebarComponent widget={widget} key={index} />
          ))}
        </List>
      </Box>   
    </Flex>
  )
}

function SidebarComponent({widget}) {
  const [showComponent, setShowComponent] = useState(false)

  return(
    <ListItem  margin="10px" fontSize="16px">
      <IconButton
      colorScheme="teal"
      aria-label="Call Segun"
      as={widget.icon} 
      onClick={()=> {
        setShowComponent(!showComponent)
      }} />
      {showComponent && widget.component}
    </ListItem>       
  )
} 

export default Sidebar;
