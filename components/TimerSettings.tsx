import {Flex,Collapse, NumberInputStepper, NumberIncrementStepper, 
        NumberDecrementStepper, NumberInput, FormControl, NumberInputField } from "@chakra-ui/react";

export default function TimerSettings(props) {
    return(
        <Collapse in={props.arr[0]}>
            <Flex flexDirection='column'>
                <Flex flexDirection='row' justifyContent='space-around'>
                    <Flex paddingX='-1em'> Pomodoro</Flex>
                    <Flex> Break</Flex>
                </Flex>
                <Flex flexDirection='row' justifyContent='space-around' >
                    <Flex margin='10px'>
                        <FormControl>
                            <NumberInput defaultValue={props.arr[1]} onChange={value => props.parentCallback(value)} min={1} max={59} >
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

    )
}