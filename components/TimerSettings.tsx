import {Flex,Collapse, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, NumberInput, FormControl, NumberInputField } from "@chakra-ui/react";

export default function TimerSettings(prop) {
    return(
        <Collapse in={prop.show}>
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

    )
}