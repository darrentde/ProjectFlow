import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const SECONDS_IN_A_MINUTE = 60

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
  timerValue: initialState.sessionValue * SECONDS_IN_A_MINUTE ,
  isRunning: false
}

export const TimerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    decrementTimerValue: (state) => {
      state.timerValue -= 1
    },
    updateSession: (state, action: PayloadAction<number>) => {
      state.sessionValue = action.payload
      state.timerValue = action.payload * SECONDS_IN_A_MINUTE 
      storeState.sessionValue = state.sessionValue
      storeState.timerValue = state.sessionValue * SECONDS_IN_A_MINUTE 
    },
    updateBreak: (state, action: PayloadAction<number>) => {
      state.breakValue = action.payload
      storeState.breakValue = state.breakValue
    },
    resetTimer: (state) => {
      state.sessionValue = storeState.sessionValue
      state.breakValue = storeState.breakValue
      state.timerValue = storeState.sessionValue * SECONDS_IN_A_MINUTE 
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