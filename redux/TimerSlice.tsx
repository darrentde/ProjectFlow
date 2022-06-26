import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const SECONDS_IN_A_MINUTE = 60;

export interface TimerState {
  sessionValue: number;
  breakValue: number;
  timerValue: number;
  isRunning: boolean;
  timerLabel: string;
  finishTimer: boolean; // Check if timerValue = 0
  count: number;
}

const initialState: TimerState = {
  sessionValue: 25,
  breakValue: 5,
  timerValue: 1500,
  isRunning: false,
  timerLabel: "Session",
  finishTimer: false,
  count: 0,
};

const storeState: TimerState = {
  sessionValue: initialState.sessionValue,
  breakValue: initialState.breakValue,
  timerValue: initialState.sessionValue * SECONDS_IN_A_MINUTE,
  isRunning: false,
  timerLabel: "Session",
  finishTimer: false,
  count: initialState.count,
};

export const TimerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    decrementTimerValue: (state) => {
      // Might be an impure function
      if (state.timerValue === 0) {
        return {
          ...state,
          finishTimer: true,
        };
      }
      return {
        ...state,
        timerValue: state.timerValue - 1,
      };
    },
    updateSession: (state, action: PayloadAction<number>) => {
      storeState.sessionValue = action.payload;
      storeState.timerValue = action.payload * SECONDS_IN_A_MINUTE;
      return {
        ...state,
        sessionValue: storeState.sessionValue,
        timerValue: storeState.timerValue,
      };
    },
    updateBreak: (state, action: PayloadAction<number>) => {
      storeState.breakValue = action.payload;
      return {
        ...state,
        breakValue: storeState.breakValue,
      };
    },
    resetTimer: (state) => {
      return {
        ...state,
        sessionValue: storeState.sessionValue,
        breakValue: storeState.breakValue,
        timerValue: storeState.sessionValue * SECONDS_IN_A_MINUTE,
        timerLabel: storeState.timerLabel,
        count: storeState.count,
      };
    },
    startTimer: (state) => {
      return {
        ...state,
        isRunning: true,
      };
    },
    stopTimer: (state) => {
      return {
        ...state,
        isRunning: false,
        count: storeState.timerValue - state.timerValue,
      };
    },
    toggleAction: (state) => {
      if (state.timerLabel === "Session") {
        return {
          ...state,
          timerLabel: "Break",
          timerValue: storeState.breakValue * SECONDS_IN_A_MINUTE,
          finishTimer: false,
          count: storeState.count,
        };
      }
      if (state.timerLabel === "Break") {
        return {
          ...state,
          timerLabel: "Session",
          timerValue: storeState.sessionValue * SECONDS_IN_A_MINUTE,
          finishTimer: false,
          count: storeState.count,
        };
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
  toggleAction,
} = TimerSlice.actions;

export default TimerSlice.reducer;
