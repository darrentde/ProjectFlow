import { Box, Flex,Text} from "@chakra-ui/layout";
import { Button, IconButton} from "@chakra-ui/react";
import {FiSettings} from "react-icons/fi"
import {MdRefresh, MdStop, MdMinimize} from "react-icons/md"
import {IoMdPlay} from "react-icons/io"

import {useState} from "react"
import Draggable from 'react-draggable'; 
import TimerSettings from "./TimerSettings"

import { useSelector, useDispatch } from 'react-redux'
import { RootState } from "../redux/Store";
import { resetTimer,startTimer,stopTimer } from "../redux/TimerSlice";
import { TimerCountdown } from "./TimerCountdown";

function Timer() {
    // Redux states
    const dispatch = useDispatch()
    const isRunning = useSelector((state: RootState) => state.timer.isRunning);

    // Show settings
    const [show, setShow] = useState(false);
    const handleShowSettings = () => setShow(!show);

    const handleStart = () => {
        dispatch(startTimer())
    }
    const handleStop = () => {
        dispatch(stopTimer())
    }
    // Handle reset back to default
    const handleReset = () => {
        handleStop()
        dispatch(resetTimer())
    }

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
                    <Flex>
                        <TimerCountdown />
                    </Flex>
                    <Flex flexDirection='column' justifyContent='space-around'>
                        <Box>
                            {isRunning 
                            ? <IconButton 
                            icon={<MdStop />} 
                            aria-label={"Stop"}   
                            variant='link'
                            fontSize='1.5em'
                            onClick ={handleStop} />
                            : 
                            <IconButton 
                            icon={<IoMdPlay />} 
                            aria-label={"Plays"}   
                            variant='link'
                            fontSize='1.25em'
                            onClick ={handleStart} /> }  
                        </Box>
                        <IconButton 
                        icon={<MdRefresh />} 
                        aria-label={"Refresh"}   
                        variant='link'
                        fontSize='1.5em'
                        onClick ={handleReset}
                        />
                    </Flex>
                </Flex>
                <Flex justifyContent='flex-end'>
                    <Flex position = 'relative' justifyContent='flex-end' margin='10px'>
                        {
                            isRunning ?
                            null:
                            <IconButton 
                            icon={<FiSettings />} 
                            aria-label={"Settings"}     
                            variant='link'
                            fontSize='1.25em'
                            onClick={handleShowSettings}/>
                            
                        }
                        
                    </Flex>
                </Flex>
                <TimerSettings show={show}/>
            </Flex>
        </Draggable>
    
    )
}

export default Timer