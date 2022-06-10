import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const SECONDS_IN_A_MINUTE = 60;

export interface TimerState {
  sessionValue: number;
  breakValue: number;
  timerValue: number;
  isRunning: boolean;
  timerLabel: string;
}

const initialState: TimerState = {
  sessionValue: 25,
  breakValue: 5,
  timerValue: 3,
  isRunning: false,
  timerLabel: "Session",
};

const storeState: TimerState = {
  sessionValue: initialState.sessionValue,
  breakValue: initialState.breakValue,
  timerValue: initialState.sessionValue * SECONDS_IN_A_MINUTE,
  isRunning: false,
  timerLabel: "Session",
};

export const TimerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    decrementTimerValue: (state) => {
      state.timerValue -= 1;
    },
    updateSession: (state, action: PayloadAction<number>) => {
      state.sessionValue = action.payload;
      state.timerValue = action.payload * SECONDS_IN_A_MINUTE;
      storeState.sessionValue = state.sessionValue;
      storeState.timerValue = state.sessionValue * SECONDS_IN_A_MINUTE;
    },
    updateBreak: (state, action: PayloadAction<number>) => {
      state.breakValue = action.payload;
      storeState.breakValue = state.breakValue;
    },
    resetTimer: (state) => {
      state.sessionValue = storeState.sessionValue;
      state.breakValue = storeState.breakValue;
      state.timerValue = storeState.sessionValue * SECONDS_IN_A_MINUTE;
      state.timerLabel = storeState.timerLabel;
    },
    startTimer: (state) => {
      state.isRunning = true;
    },
    stopTimer: (state) => {
      state.isRunning = false;
    },
    updateTimerValue: (state, action: PayloadAction<number>) => {
      state.timerValue = action.payload * SECONDS_IN_A_MINUTE;
    },
    toggleLabel: (state, action: PayloadAction<string>) => {
      if (action.payload === "Session") {
        state.timerLabel = "Break";
      } else if (action.payload === "Break") {
        state.timerLabel = "Session";
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateSession,
  updateBreak,
  resetTimer,
  decrementTimerValue,
  startTimer,
  stopTimer,
  updateTimerValue,
  toggleLabel,
} = TimerSlice.actions;

export default TimerSlice.reducer;
