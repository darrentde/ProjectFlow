/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useReducer, useEffect } from "react";
import { CallBackProps, ACTIONS, EVENTS, STATUS, Step } from "react-joyride";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import { nextStep } from "../../redux/TourSlice";
import dynamic from "next/dynamic";
import { TOUR_STEPS } from "./TourSteps";

const JoyRideNoSSR = dynamic(() => import("react-joyride"), { ssr: false });

const Tour = () => {
  const dispatch = useDispatch();
  const tourState = useSelector((state: RootState) => state.tour);
  const todoShow = useSelector((state: RootState) => state.widget.todoShow);
  const timerShow = useSelector((state: RootState) => state.widget.timerShow);

  useEffect(() => {
    if (!localStorage.getItem("tour")) {
      localStorage.setItem("tour", JSON.stringify(true));
      dispatch(nextStep("START"));
    }
  }, []);

  useEffect(() => {
    if (tourState.run && tourState.stepIndex === 7 && todoShow) {
      setTimeout(() => dispatch(nextStep("next")), 50);
    }
    if (tourState.run && tourState.stepIndex === 11 && timerShow) {
      setTimeout(() => dispatch(nextStep("next")), 50);
    }
  }, [todoShow, tourState.run, tourState.stepIndex, timerShow]);

  const callback = (data: CallBackProps) => {
    const { action, index, type, status } = data;

    if (
      status === STATUS.FINISHED ||
      status === STATUS.SKIPPED ||
      action === ACTIONS.CLOSE
    ) {
      dispatch(nextStep("STOP"));
    } else if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
      if (
        index !== 1 &&
        index !== 2 &&
        index !== 4 &&
        index !== 5 &&
        index !== 6 &&
        index !== 7 &&
        index !== 9 &&
        index !== 10 &&
        index !== 11
      ) {
        dispatch(nextStep(action));
      }
    }
  };

  return (
    <div>
      <JoyRideNoSSR
        {...tourState}
        steps={TOUR_STEPS}
        callback={callback}
        showSkipButton={false}
        disableOverlayClose={true}
        hideBackButton={true}
        showProgress={false}
        styles={{
          tooltipContainer: {
            textAlign: "center",
          },
          buttonBack: {
            marginRight: 10,
          },
          options: {
            zIndex: 10000,
          },
        }}
        locale={{
          skip: "Close tour",
          last: "End tour",
        }}
      />
    </div>
  );
};

export default Tour;
