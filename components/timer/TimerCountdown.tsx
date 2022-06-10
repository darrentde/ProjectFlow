/* eslint-disable global-require */
/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect } from "react";
import { Box, Text } from "@chakra-ui/layout";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/Store";
import {
  decrementTimerValue,
  stopTimer,
  updateTimerValue,
  toggleLabel,
  resetTimer,
} from "../../redux/TimerSlice";

export const TimerCountdown = () => {
  const timerValue = useSelector((state: RootState) => state.timer.timerValue);
  const isRunning = useSelector((state: RootState) => state.timer.isRunning);
  const timerLabel = useSelector((state: RootState) => state.timer.timerLabel);

  const sessionValue = useSelector(
    (state: RootState) => state.timer.sessionValue
  );
  const breakValue = useSelector((state: RootState) => state.timer.breakValue);

  const dispatch = useDispatch();

  const minutes = Math.floor(timerValue / 60);
  const seconds = timerValue - minutes * 60;
  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

  // const notificationSound = require("../public/assets/sound.mp3");
  // const notificationRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        if (timerValue === 0) {
          // notificationRef.current.play();
          if (timerLabel === "Session") {
            dispatch(updateTimerValue(breakValue));
          } else if (timerLabel === "Break") {
            dispatch(resetTimer);
            dispatch(updateTimerValue(sessionValue));
          }

          dispatch(toggleLabel(timerLabel));
          dispatch(stopTimer());
        } else {
          dispatch(decrementTimerValue());
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  });

  return (
    <Box>
      <Text> {timerLabel}</Text>
      <Text fontSize="3.5rem">
        {timerMinutes}:{timerSeconds}
      </Text>
      {/* <audio
        // src={"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"}
        controls
        src={notificationSound}
        ref={notificationRef}
      /> */}
    </Box>
  );
};
