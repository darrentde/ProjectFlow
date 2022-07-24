/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useReducer, useEffect } from "react";
import { CallBackProps, ACTIONS, EVENTS, STATUS, Step } from "react-joyride";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import { nextStep } from "../redux/TourSlice";
import dynamic from "next/dynamic";

const JoyRideNoSSR = dynamic(() => import("react-joyride"), { ssr: false });

const TOUR_STEPS: Step[] = [
  {
    target: "body",
    content: (
      <h2>
        Welcome to Project Flow<br></br>Let us give you a tour
      </h2>
    ),
    placement: "center",
  },
  {
    target: "#menu-button-menu",
    content: (
      <h2>
        Over here is where you can manage the settings.<br></br>
        Before going to todos, click on modules under the dropdown and add a new
        module.
      </h2>
    ),
    placement: "bottom",
    hideBackButton: true,
    // styles: {
    //   buttonNext: {
    //     display: "none",
    //   },
    // },
  },
  // {
  //   target: "#menu-list-menu-menuitem",
  //   content: <h2>Click on module and add a new module</h2>,
  //   spotlightClicks: true,
  //   placement: "bottom",
  // },
  {
    target: "#todo",
    content: <h2>Let's open up the to do</h2>,
    spotlightClicks: true,
    hideBackButton: true,
    placement: "right",
    styles: {
      buttonNext: {
        display: "none",
      },
    },
  },
  {
    target: "#todo-main",
    content: (
      <h2>
        Here is where you can manage all your to dos.<br></br>After adding a new
        todo, you will be able to see a play button within the task that allows
        you to track a new session in the timer
      </h2>
    ),
    hideBackButton: true,
    placement: "right",
  },
  {
    target: "#timer",
    content: <h2>Let's open up the timer.</h2>,
    spotlightClicks: true,
    placement: "right",
    styles: {
      buttonNext: {
        display: "none",
      },
    },
  },
  {
    target: "#timer-main",
    content: (
      <h2>
        Over here you can use the timer as a pomodoro tracker or you can use it
        to track sessions
      </h2>
    ),
    placement: "right",
  },
  {
    target: "body",
    content: (
      <h2>
        Thanks for going on a tour with us! You can always start the tour
        through the profile button at the top right of the app.
      </h2>
    ),
    placement: "center",
  },
];

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
    if (tourState.run && tourState.stepIndex === 2 && todoShow) {
      dispatch(nextStep("next"));
    }
    if (tourState.run && tourState.stepIndex === 4 && timerShow) {
      dispatch(nextStep("next"));
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
      if (index !== 2 && index !== 4) {
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
        showSkipButton={true}
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
