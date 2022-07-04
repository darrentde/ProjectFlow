import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SessionState {
  sessionID: string;
  sessionLabel: string;
  isSession: boolean;
}

const initialState: SessionState = {
  sessionID: "",
  sessionLabel: "",
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
        sessionLabel: initialState.sessionLabel,
        isSession: initialState.isSession,
      };
    },
    setSessionLabel: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        sessionLabel: action.payload,
      };
    },
  },
});

export const { setSessionID, resetSession, setSessionLabel } =
  SessionSlice.actions;
export default SessionSlice.reducer;
