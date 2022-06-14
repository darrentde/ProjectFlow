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
      };
    },
    updateTimerValue: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        timerValue: action.payload * SECONDS_IN_A_MINUTE,
      };
    },
    toggleLabel: (state, action: PayloadAction<string>) => {
      if (action.payload === "Session") {
        return {
          ...state,
          timerLabel: "Break",
        };
      }
      if (action.payload === "Break") {
        return {
          ...state,
          timerLabel: "Session",
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
  updateTimerValue,
  toggleLabel,
} = TimerSlice.actions;

export default TimerSlice.reducer;
