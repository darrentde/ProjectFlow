import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface TimerState {
  sessionValue: number
  breakValue: number
  timerValue : number
  isRunning : boolean
}

const initialState: TimerState = {
  sessionValue: 25,
  breakValue: 5,
  timerValue: 1500,
  isRunning: false
}

const storeState: TimerState = {
  sessionValue: initialState.sessionValue,
  breakValue: initialState.breakValue,
  timerValue: initialState.sessionValue * 60,
  isRunning: false
}

export const TimerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    decrementSession: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.sessionValue -= 1
    },
    decrementBreak: (state) => {
      state.breakValue -= 1
    },
    decrementTimerValue: (state) => {
      state.timerValue -= 1
    },
    updateSession: (state, action: PayloadAction<number>) => {
      state.sessionValue = action.payload
      state.timerValue = action.payload * 60
      storeState.sessionValue = state.sessionValue
      storeState.timerValue = state.sessionValue * 60
    },
    updateBreak: (state, action: PayloadAction<number>) => {
      state.breakValue = action.payload
      storeState.breakValue = state.breakValue
    },
    resetTimer: (state) => {
      state.sessionValue = storeState.sessionValue
      state.breakValue = storeState.breakValue
      state.timerValue = storeState.sessionValue * 60
    },
    startTimer: (state) => {
      state.isRunning = true
    },
    stopTimer: (state) => {
      state.isRunning= false
    }

  },
})

// Action creators are generated for each case reducer function
export const { updateSession, updateBreak, resetTimer, decrementTimerValue, startTimer, stopTimer } = TimerSlice.actions

export default TimerSlice.reducer