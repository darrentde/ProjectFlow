import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";

const TOUR_STEPS: Step[] = [
  {
    target: "body",
    content: <h2>Let's !</h2>,
    placement: "center",
    locale: { skip: <strong aria-label="skip">S-K-I-P</strong> },
  },
  {
    target: "body",
    content: <h2>Yes !</h2>,
    placement: "center",
    locale: { skip: <strong aria-label="skip">S-K-I-P</strong> },
  },
  // {
  //   target: "body",
  //   content: "No",
  // },
];

interface TourState {
  run: boolean;
  continuous: boolean;
  stepIndex: number;
  steps: Array<Step>;
}

// Define our state
const initialState: TourState = {
  run: false,
  continuous: true,
  stepIndex: 0,
  steps: TOUR_STEPS,
};

const TourSlice = createSlice({
  name: "tour",
  initialState,
  reducers: {
    nextStep: (state, action: PayloadAction<string>) => {
      switch (action.payload) {
        case "START":
          return { ...state, run: true };
        case "RESET":
          return { ...state, stepIndex: 0 };
        case "STOP":
          return { ...state, run: false };
        case "NEXT":
          return { ...state, stepIndex: state.stepIndex + 1 };
        case "PREV":
          return { ...state, stepIndex: state.stepIndex - 1 };
        case "RESTART":
          return {
            ...state,
            stepIndex: 0,
            run: true,
          };
        default:
          return state;
      }
    },
  },
});

export const { nextStep } = TourSlice.actions;
export default TourSlice.reducer;
