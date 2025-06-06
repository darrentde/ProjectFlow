/* eslint-disable no-console */
import { Flex, Text } from "@chakra-ui/layout";
import { Button, IconButton } from "@chakra-ui/react";
import { FiSettings } from "react-icons/fi";
import { MdMinimize } from "react-icons/md";

import { useEffect, useState } from "react";
import Draggable from "react-draggable";
import { useSelector, useDispatch } from "react-redux";

import { RootState } from "../../redux/Store";
import {
  resetTimer,
  startTimer,
  stopTimer,
  setShowAdditional,
} from "../../redux/TimerSlice";
import { TimerCountdown } from "./TimerCountdown";
import { resetSession } from "../../redux/SessionSlice";
import { supabase } from "../../src/lib";
import TimerShowCollapse from "./TimerShowCollapse";

const Timer = () => {
  // Redux states
  const dispatch = useDispatch();
  const isRunning = useSelector((state: RootState) => state.timer.isRunning);
  const timerCount = useSelector((state: RootState) => state.timer.count);
  const showAdditional = useSelector(
    (state: RootState) => state.timer.showAdditional
  );
  const sessionID = useSelector((state: RootState) => state.session.sessionID);

  // Choose view, true for sessions, false for settings
  const [view, setView] = useState(false);

  const handleShowSettings = () => {
    if (view === true) {
      dispatch(setShowAdditional(!showAdditional));
    } else {
      dispatch(setShowAdditional(true));
      setView(!view);
    }
  };

  const handleShowSessions = () => {
    if (view === false) {
      dispatch(setShowAdditional(!showAdditional));
    } else {
      dispatch(setShowAdditional(true));
      setView(!view);
    }
  };

  useEffect(() => {
    if (!isRunning) {
      const endSession = async () => {
        if (sessionID !== "") {
          const { data } = await supabase
            .from("sessions")
            .select("start_at")
            .eq("session_id", sessionID);

          const time = new Date(data[0].start_at);
          time.setSeconds(time.getSeconds() + timerCount);

          const { error } = await supabase
            .from("sessions")
            .update([{ end_at: time }])
            .eq("session_id", sessionID);

          const supabaseError = error;

          if (supabaseError) {
            console.log(supabaseError.message);
          }
          dispatch(resetSession());
        }
        dispatch(resetTimer());
      };
      endSession();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isRunning]);

  // const removeSession = async () => {
  //   if (sessionID !== "") {
  //     const { error } = await supabase
  //       .from("sessions")
  //       .delete()
  //       .eq("session_id", sessionID);

  //     const supabaseError = error;

  //     if (supabaseError) {
  //       console.log("$supabaseError.message no");
  //       dispatch(resetSession());
  //       dispatch(resetTimer());
  //     } else {
  //       dispatch(resetSession());
  //       dispatch(resetTimer());
  //     }
  //   }
  // };

  const handleStart = () => {
    dispatch(setShowAdditional(false));
    // setShow(false);
    dispatch(startTimer());
  };

  const handleStop = () => {
    dispatch(stopTimer());
    // removeSession();
  };

  // Handle reset back to default
  // const handleReset = async () => {
  //   handleStop();
  //   dispatch(resetTimer());
  //   removeSession();
  // };

  const props = {
    showAdditional,
    view,
  };

  return (
    <Draggable bounds="body" handle=".Header">
      <Flex
        position="absolute"
        top="300px"
        left="600px"
        bg="white"
        border="0.1rem solid black"
        width="22%"
        height="auto"
        borderRadius="10px"
        flexDirection="column"
        alignContent="space-between"
        id="timer-main"
      >
        <Flex
          className="Header"
          cursor="pointer"
          borderBottom="0.1rem solid black"
          justifyContent="space-between"
        >
          <Text margin="5px" fontSize="1.25rem">
            Pomodoro
          </Text>
          <IconButton
            icon={<MdMinimize />}
            aria-label="minimize"
            variant="link"
            fontSize="1.25em"
          />
        </Flex>
        <Flex
          className="Body"
          flexDirection="row"
          justifyContent="space-around"
          alignContent="space-around"
        >
          <TimerCountdown />

          <Flex flexDirection="column" justifyContent="space-around">
            {isRunning ? (
              <Button
                aria-label="Stop"
                variant="solid"
                colorScheme="red"
                // fontSize="1.5em"
                size="sm"
                onClick={handleStop}
              >
                Stop
              </Button>
            ) : (
              <Button
                aria-label="Plays"
                variant="solid"
                colorScheme="green"
                // fontSize="1.25em"
                size="sm"
                onClick={handleStart}
              >
                Start
              </Button>
            )}

            {/* <IconButton
              icon={<MdRefresh />}
              aria-label="Refresh"
              variant="link"
              fontSize="1.5em"
              onClick={handleReset}
            /> */}
          </Flex>
        </Flex>

        <Flex justifyContent="flex-end">
          <Flex position="relative" justifyContent="flex-end" margin="10px">
            {isRunning ? null : (
              <Flex>
                <Button
                  variant="solid"
                  size="sm"
                  aria-label="Sessions"
                  id="timer-sessions"
                  onClick={handleShowSessions}
                >
                  Sessions
                </Button>

                <IconButton
                  icon={<FiSettings />}
                  aria-label="Settings"
                  variant="link"
                  fontSize="1.25em"
                  id="timer-settings"
                  onClick={handleShowSettings}
                />
              </Flex>
            )}
          </Flex>
        </Flex>
        <TimerShowCollapse props={props} />
      </Flex>
    </Draggable>
  );
};

export default Timer;
