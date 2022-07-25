import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TourState {
  run: boolean;
  continuous: boolean;
  showProgress: boolean;
  stepIndex: number;
}

// Define our state
const initialState: TourState = {
  run: false,
  continuous: true,
  showProgress: true,
  stepIndex: 0,
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
        case "next":
          return { ...state, stepIndex: state.stepIndex + 1 };
        case "prev":
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
