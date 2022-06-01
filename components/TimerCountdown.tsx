import React, { useEffect } from "react";
import { Text } from "@chakra-ui/layout";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/Store";
import { resetTimer, decrementTimerValue  } from "../redux/TimerSlice";

export const TimerCountdown = () => {
  const timerValue = useSelector((state: RootState) => state.timer.timerValue);
  const isRunning= useSelector((state: RootState) => state.timer.isRunning);
  const dispatch = useDispatch();

  let minutes = Math.floor(timerValue / 60);
  let seconds = timerValue - minutes * 60;

  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

    useEffect(() => {
        if(isRunning) {
            const interval = setInterval(() => {
              dispatch(decrementTimerValue())
                // if(seconds === 0) {
                //     if(minutes !== 0) {
                //         setSeconds(59)
                //         setMinutes(minutes - 1)
                //     } else {
                //         setSeconds(seconds)
                //         setMinutes(minutes)
                //     }
                // } else {
                //     setSeconds(seconds - 1)
                // }
            }, 1000)
            return () => clearInterval(interval)
        }
    }, [isRunning])

  return (
    <Text fontSize="3.5rem">
      {timerMinutes}:{timerSeconds}
    </Text>
  );
};
