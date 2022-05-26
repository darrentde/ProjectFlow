import { Flex,Text} from "@chakra-ui/layout";
import { Button, IconButton} from "@chakra-ui/react";
import{FiSettings} from "react-icons/fi"
import {MdRefresh} from "react-icons/md"
import {IoMdPlay} from "react-icons/io"

import {useState, useRef, useEffect} from "react"

import TimerSettings from "./TimerSettings"

function Timer() {
    const [show, setShow] = useState(false);
    const handleToggle = () => setShow(!show);

    return(
    <Flex position='absolute' top='300px' left ='600px' bg='white' border ='0.1rem solid black' 
    width ='18%' height='auto' borderRadius='10px' flexDirection='column' alignContent='space-between' >
        <Flex>
            <Text className="Header" margin='10px' fontSize='1.5rem'> Pomodoro </Text>
        </Flex>
        <Flex flexDirection="row" justifyContent='space-around' alignContent='space-around'>
            <Text fontSize='3.5rem'>00:00</Text>
            <Flex flexDirection='column' justifyContent='space-around'>
            <IconButton 
            icon={<IoMdPlay />} 
            aria-label={"Plays"}   
            variant='link'
            fontSize='1.5em'/>
            <IconButton 
            icon={<MdRefresh />} 
            aria-label={"Refresh"}   
            variant='link'
            fontSize='1.5em'/>
            </Flex>
            
        </Flex>
        <Flex justifyContent='flex-end'>
            <Flex position = 'relative' justifyContent='flex-end' margin='10px'>
                <IconButton 
                    icon={<FiSettings />} 
                    aria-label={"Settings"}     
                    variant='link'
                    fontSize='1.25em'
                    onClick={handleToggle}/>
            </Flex>
        </Flex>
        <TimerSettings show={show} />
        
    </Flex>
    )
}

export default Timer