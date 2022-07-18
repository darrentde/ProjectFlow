import React, { useReducer, useEffect } from "react";
import JoyRide, { CallBackProps, ACTIONS, EVENTS, STATUS } from "react-joyride";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import { nextStep } from "../redux/TourSlice";
import dynamic from "next/dynamic";

const JoyRideNoSSR = dynamic(() => import("react-joyride"), { ssr: false });

const Tour = () => {
  const dispatch = useDispatch();
  const tourState = useSelector((state: RootState) => state.tour);

  useEffect(() => {
    if (!localStorage.getItem("tour")) {
      dispatch(nextStep("START"));
    }
  }, []);

  const callback = (data: CallBackProps) => {
    const { action, index, type, status } = data;

    console.log(data);
    if (
      action === ACTIONS.CLOSE ||
      (status === STATUS.SKIPPED && tourState.run) ||
      status === STATUS.FINISHED
    ) {
      dispatch(nextStep("STOP"));
    } else if (action === ACTIONS.NEXT) {
      dispatch(nextStep("NEXT"));
    } else if (action === ACTIONS.PREV) {
      dispatch(nextStep("PREV"));
    }
  };

  // const startTour = (event: React.MouseEvent<HTMLElement>) => {
  //   event.preventDefault();
  //   dispatch(nextStep("RESTART"));
  //   console.log(tourState);
  // };

  return (
    <div>
      {/* <button className="btn btn-primary" onClick={startTour}>
        Start Tour
      </button> */}

      <JoyRideNoSSR
        {...tourState}
        callback={callback}
        showSkipButton={true}
        styles={{
          tooltipContainer: {
            textAlign: "left",
          },

          buttonBack: {
            marginRight: 10,
          },
        }}
        locale={{
          last: "End tour",
        }}
      />
    </div>
  );
};

export default Tour;
