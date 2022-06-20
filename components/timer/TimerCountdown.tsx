/* eslint-disable global-require */
/* eslint-disable jsx-a11y/media-has-caption */
import React, { useCallback, useEffect } from "react";
import { Box, Text } from "@chakra-ui/layout";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/Store";
import {
  decrementTimerValue,
  stopTimer,
  toggleAction,
} from "../../redux/TimerSlice";
import { resetSession } from "../../redux/SessionSlice";
import { supabase } from "../../src/lib";

export const TimerCountdown = () => {
  const timerValue = useSelector((state: RootState) => state.timer.timerValue);
  const isRunning = useSelector((state: RootState) => state.timer.isRunning);
  const timerLabel = useSelector((state: RootState) => state.timer.timerLabel);
  const finishTimer = useSelector(
    (state: RootState) => state.timer.finishTimer
  );
  const sessionID = useSelector((state: RootState) => state.session.sessionID);

  const dispatch = useDispatch();

  const minutes = Math.floor(timerValue / 60);
  const seconds = timerValue - minutes * 60;
  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

  // const notificationSound = require("../public/assets/sound.mp3");
  // const notificationRef = useRef(null);

  // Consider using a dispatch to check if timerValue === 0 so as not to keep calling this useEffect

  // useEffect(() => {
  //   if (timerValue === 0) {
  //     dispatch(setFinishTimer());
  //   }
  // }, [dispatch, timerValue]);

  const tick = useCallback(async () => {
    if (finishTimer) {
      // notificationRef.current.play();
      dispatch(toggleAction());
      dispatch(stopTimer());

      if (sessionID !== "") {
        const { error } = await supabase
          .from("sessions")
          .update([{ end_at: new Date() }])
          .eq("session_id", sessionID);

        const supabaseError = error;

        if (supabaseError) {
          console.log(supabaseError.message);
        }
        dispatch(resetSession());
      }
    }
  }, [dispatch, finishTimer, sessionID]);

  useEffect(() => {
    if (isRunning) {
      tick();
      const interval = setInterval(() => {
        dispatch(decrementTimerValue());
      }, 900);
      return () => clearInterval(interval);
    }
  }, [dispatch, isRunning, tick]);

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
