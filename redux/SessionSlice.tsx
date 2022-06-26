import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SessionState {
  sessionID: string;
  isSession: boolean;
}

const initialState: SessionState = {
  sessionID: "",
  isSession: false,
};

const SessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setSessionID: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        sessionID: action.payload,
        isSession: true,
      };
    },
    resetSession: (state) => {
      return {
        ...state,
        sessionID: initialState.sessionID,
        isSession: initialState.isSession,
      };
    },
  },
});

export const { setSessionID, resetSession } = SessionSlice.actions;
export default SessionSlice.reducer;
