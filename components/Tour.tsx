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
        Welcome to Project Flow<br></br>Let us give you a tour<br></br>Follow
        all instructions to ensure a pleasant experience!
      </h2>
    ),
    placement: "center",
    // title: "start",
  },
  {
    target: "#menu-button-menu",
    content: (
      <h2>
        Over here is where you can manage the settings.<br></br>Click on module
        and add a new module
      </h2>
    ),
    spotlightClicks: true,
    placement: "bottom",
  },
  {
    target: "#todo",
    content: <h2>Click on to do and click next</h2>,
    spotlightClicks: true,
    placement: "right",
  },
  {
    target: "#addTodo",
    content: <h2>Add a new to do over here</h2>,
    spotlightClicks: true,
    placement: "right",
  },
  {
    target: ".play-session",
    content: <h2>Start a new session</h2>,
    spotlightClicks: true,
    placement: "right",
  },
  {
    target: "#timer",
    content: <h2>Open timer</h2>,
    spotlightClicks: true,
    placement: "right",
  },
  {
    target: "body",
    content: <h2>It is still a work in progress and it's a little buggy</h2>,
    placement: "center",
    title: "start",
  },
];

const Tour = () => {
  const dispatch = useDispatch();
  const tourState = useSelector((state: RootState) => state.tour);

  useEffect(() => {
    if (!localStorage.getItem("tour")) {
      dispatch(nextStep("START"));
    }
  }, []);

  const callback = (data: CallBackProps) => {
    const { action, type, status } = data;

    if (
      status === STATUS.FINISHED ||
      status === STATUS.SKIPPED ||
      action === ACTIONS.CLOSE
    ) {
      dispatch(nextStep("STOP"));
    } else if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
      if (action === ACTIONS.NEXT || ACTIONS.PREV) {
        dispatch(nextStep(action));
      }
    }
  };

  // const startTour = (event: React.MouseEvent<HTMLElement>) => {
  //   event.preventDefault();
  //   dispatch(nextStep("RESTART"));
  // };

  return (
    <div>
      {/* <button className="btn btn-primary" onClick={startTour}>
        Start Tour
      </button> */}

      <JoyRideNoSSR
        {...tourState}
        steps={TOUR_STEPS}
        callback={callback}
        // showSkipButton={true}
        hideBackButton={true}
        styles={{
          tooltipContainer: {
            textAlign: "left",
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
