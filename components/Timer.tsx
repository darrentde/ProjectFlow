import { Box,Flex,Text } from "@chakra-ui/layout";
import { Button, IconButton } from "@chakra-ui/react";
import{FiSettings} from "react-icons/fi"
import {MdRefresh} from "react-icons/md"
import {IoMdPlay} from "react-icons/io"

function Timer() {
    return(
    <Box position='absolute' top='300px' left ='600px' bg='white' border ='0.1rem solid black' 
    width ='15rem' height='auto' borderRadius='10px'>
        {/* <Box borderBottom='0.1rem' borderBottomColor='black' borderBottomStyle='ridge'> */}
        <Box>
            <Text className="Header" margin='10px'> Pomodoro </Text>
        </Box>
        <Box>
            <Flex flexDirection="row" justifyContent="space-evenly">
                 <Text fontSize='30px'>00:00</Text>
                 <Flex flexDirection='column' gap='10px'>
                    {/* <Button>Start</Button> */}
                    <IconButton 
                    icon={<IoMdPlay />} 
                    aria-label={"Plays"}   
                    variant='link'       
                />
                    <IconButton 
                    icon={<MdRefresh />} 
                    aria-label={"Refresh"}   
                    variant='link'       
                />

                 </Flex>
            </Flex>
        </Box>
        <Box>
            <Flex position = 'relative' justifyContent='flex-end' margin='10px'>
                <IconButton 
                    icon={<FiSettings />} 
                    aria-label={"Settings"}     
                    variant='link'              
                />
            </Flex>
        </Box>
    </Box>
    )
}

export default Timer