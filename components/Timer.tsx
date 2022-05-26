import { Box,Flex,Text} from "@chakra-ui/layout";
import { Button, Collapse, IconButton, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, NumberInput, FormControl, NumberInputField } from "@chakra-ui/react";
import{FiSettings} from "react-icons/fi"
import {MdRefresh} from "react-icons/md"
import {IoMdPlay} from "react-icons/io"

import {useState} from "react"

function Timer() {
    const [show, setShow] = useState(false);
    const handleToggle = () => setShow(!show);

    return(
    <Flex position='absolute' top='300px' left ='600px' bg='white' border ='0.1rem solid black' 
    width ='18%' height='auto' borderRadius='10px' flexDirection='column' alignContent='space-between' >
        {/* <Box borderBottom='0.1rem' borderBottomColor='black' borderBottomStyle='ridge'> */}
        <Flex>
            <Text className="Header" margin='10px' fontSize='1.5rem'> Pomodoro </Text>
        </Flex>
        <Flex flexDirection="row" justifyContent='space-around' alignContent='space-around'>
            <Text fontSize='3.5rem'>00:00</Text>
            <Flex flexDirection='column' justifyContent='space-around'>
            {/* <Button>Start</Button> */}
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
        <Collapse in={show}>
            <Flex flexDirection='column'>
                <Flex flexDirection='row' justifyContent='space-around'>
                    <Flex> Pomodoro</Flex>
                    <Flex> Rest</Flex>
                </Flex>
                <Flex flexDirection='row' justifyContent='space-around' >
                    <Flex margin='10px'>
                        <FormControl>
                            <NumberInput>
                            <NumberInputField id='time' />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>
                        
                    </Flex>
                    <Flex margin='10px'>
                        <FormControl>
                            <NumberInput>
                            <NumberInputField id='break' />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </FormControl>
                    </Flex>
                </Flex>

            </Flex>
            
        </Collapse>
    </Flex>
    )
}

export default Timer