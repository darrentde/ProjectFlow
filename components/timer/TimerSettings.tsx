import {
  Flex,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInput,
  FormControl,
  NumberInputField,
} from "@chakra-ui/react";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/Store";
import { updateSession, updateBreak } from "../../redux/TimerSlice";

const TimerSettings = () => {
  const sessionValue = useSelector(
    (state: RootState) => state.timer.sessionValue
  );
  const breakValue = useSelector((state: RootState) => state.timer.breakValue);
  const dispatch = useDispatch();

  return (
    <Flex data-testid="timer-settings">
      <Flex flexDirection="column">
        <Flex flexDirection="row" justifyContent="space-around">
          <Flex paddingX="-1em"> Pomodoro</Flex>
          <Flex> Break</Flex>
        </Flex>

        <Flex flexDirection="row" justifyContent="space-around">
          <Flex margin="10px">
            <FormControl>
              <NumberInput
                defaultValue={sessionValue}
                onChange={(value) =>
                  dispatch(updateSession(parseInt(value, 10)))
                }
                min={1}
                max={59}
              >
                <NumberInputField id="time" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </Flex>
          <Flex margin="10px">
            <FormControl>
              <NumberInput
                defaultValue={breakValue}
                onChange={(value) => dispatch(updateBreak(parseInt(value, 10)))}
                min={1}
                max={59}
              >
                <NumberInputField id="break" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default TimerSettings;
