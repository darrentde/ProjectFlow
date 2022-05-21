import { IconButton } from "@chakra-ui/react";
import {Flex,Box, List, ListItem} from "@chakra-ui/layout";

import {MdOutlineStickyNote2, MdEvent} from "react-icons/md";
import {HiMusicNote} from "react-icons/hi"
import {GiAlarmClock} from "react-icons/gi"
import {BiStats} from "react-icons/bi"

const sidebarMenu = [
  {
    name: "To-Do",
    icon: MdOutlineStickyNote2,
    // onClick
  },
  {
    name: "Timer",
    icon: GiAlarmClock,
  },
  {
    name: "Music",
    icon: HiMusicNote,
  },
  {
    name: "Events",
    icon: MdEvent,
  },
  {
    name: "Stats",
    icon: BiStats,
  },
];

function Sidebar() {
  return(
    <Flex w="100px" h="100%" >
      <Box w="100" bg="#63B3ED">
        <List spacing={4}>
          {sidebarMenu.map((menu) => ( 
            <ListItem  margin="10px" fontSize="16px" key={menu.name}>
              <IconButton
              colorScheme="teal"
              aria-label="Call Segun"
              as={menu.icon} />
            </ListItem>       
          ))}

        </List>
      </Box>   
    </Flex>
    
  )
} 

export default Sidebar;
