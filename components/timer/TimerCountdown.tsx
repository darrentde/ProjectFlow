/* eslint-disable no-console */
/* eslint-disable global-require */
/* eslint-disable jsx-a11y/media-has-caption */
import React, { useCallback, useEffect } from "react";
import { Flex, Text } from "@chakra-ui/layout";

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
  const timerCount = useSelector((state: RootState) => state.timer.count);

  const dispatch = useDispatch();

  const minutes = Math.floor(timerValue / 60);
  const seconds = timerValue - minutes * 60;
  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

  // const notificationSound = require("../public/assets/sound.mp3");
  // const notificationRef = useRef(null);

  const endSession = useCallback(async () => {
    if (sessionID !== "") {
      const { data } = await supabase
        .from("sessions")
        .select("start_at")
        .eq("session_id", sessionID);

      const time = new Date(data[0].start_at);
      time.setSeconds(time.getSeconds() + timerCount);

      const { error } = await supabase
        .from("sessions")
        .update([{ end_at: "start_at" }])
        .eq("session_id", sessionID);

      const supabaseError = error;

      if (supabaseError) {
        console.log(supabaseError.message);
      }
      dispatch(resetSession());
    }
  }, [dispatch, sessionID, timerCount]);

  useEffect(() => {
    if (finishTimer) {
      // notificationRef.current.play();
      endSession();
      dispatch(toggleAction());
      dispatch(stopTimer());
    }
  }, [dispatch, endSession, finishTimer]);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        dispatch(decrementTimerValue());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [dispatch, isRunning]);

  return (
    <Flex flexDirection="column">
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
    </Flex>
  );
};
