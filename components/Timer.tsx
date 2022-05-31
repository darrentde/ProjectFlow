import { Box, Flex,Text} from "@chakra-ui/layout";
import { Button, IconButton} from "@chakra-ui/react";
import {FiSettings} from "react-icons/fi"
import {MdRefresh, MdStop, MdMinimize} from "react-icons/md"
import {IoMdPlay} from "react-icons/io"

import {useState, useRef, useEffect} from "react"
import Draggable from 'react-draggable'; 
import TimerSettings from "./TimerSettings"

function Timer() {

    // Show settings
    const [show, setShow] = useState(false);
    const handleToggle = () => setShow(!show);

    // Handle play timer
    const [minutes, setMinutes] = useState(20)
    const [seconds, setSeconds] = useState(0)
    const initialMinute = 20
    
    const timerMinutes = minutes < 10 ? `0${minutes}` : minutes
    const timerSeconds = seconds < 10 ? `0${seconds}` : seconds

    const [play, setPlay] = useState(false)

    const handlePlay = () => {
        setPlay(!play)  
    }

    // Bug in useeffect
    useEffect(() => {
        if(play) {
            let interval = setInterval(() => {
                clearInterval(interval)
                if(seconds === 0) {
                    if(minutes !== 0) {
                        setSeconds(59)
                        setMinutes(minutes - 1)
                    } else {
                        setSeconds(0)
                        setMinutes(0)
                    }
                } else {
                    setSeconds(seconds - 1)
                }
            }, 1000)
        }
    }, [seconds, minutes, play])

    // Handle change in pomodoro clock
    const handleTimeChange = (data) => {
        setMinutes(data)
        setSeconds(0)
        const initialMinute = data
    }

    // Handle reset back to default
    const reset = () => {
        setPlay(false)
        setSeconds(0)
        setMinutes(initialMinute)
    }

    // Pass props to TimerSettings
    const timerTuple = [show, minutes]

    return(
        <Draggable bounds="body" handle='.Header' >
            <Flex position='absolute' top='300px' left ='600px' bg='white' border ='0.1rem solid black' 
            width ='18%' height='auto' borderRadius='10px' flexDirection='column' 
            alignContent='space-between' >
                <Flex className="Header" cursor='pointer' borderBottom='0.1rem solid black' justifyContent='space-between'>
                    <Text margin='5px' fontSize='1.25rem'> Pomodoro </Text> 
                    <IconButton
                    icon={<MdMinimize/>}
                    aria-label={"minimize"}
                    variant='link'
                    fontSize='1.25em'
                    // onClick={{display:none}}
                    />
                </Flex>
                <Flex flexDirection="row" justifyContent='space-around' alignContent='space-around'>
                    <Text fontSize='3.5rem'>{timerMinutes}:{timerSeconds}</Text>
                    <Flex flexDirection='column' justifyContent='space-around'>
                        <Box>
                            {play 
                            ? <IconButton 
                            icon={<MdStop />} 
                            aria-label={"Stop"}   
                            variant='link'
                            fontSize='1.5em'
                            onClick ={handlePlay} />
                            : 
                            <IconButton 
                            icon={<IoMdPlay />} 
                            aria-label={"Plays"}   
                            variant='link'
                            fontSize='1.25em'
                            onClick ={handlePlay} /> }
                            
                        </Box>
                        <IconButton 
                        icon={<MdRefresh />} 
                        aria-label={"Refresh"}   
                        variant='link'
                        fontSize='1.5em'
                        onClick ={reset}
                        />
                        
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
                <TimerSettings arr={timerTuple} parentCallback ={handleTimeChange}/>
            </Flex>
        </Draggable>
    
    )
}

export default Timer