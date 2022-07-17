import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface WidgetState {
  todoShow: boolean;
  timerShow: boolean;
  analyticsShow: boolean;
}

const initialState: WidgetState = {
  todoShow: false,
  timerShow: false,
  analyticsShow: false,
};

const WidgetSlice = createSlice({
  name: "widget",
  initialState,
  reducers: {
    showWidget: (state, action: PayloadAction<string>) => {
      switch (action.payload) {
        case "To-Do": {
          return {
            ...state,
            todoShow: !state.todoShow,
          };
        }
        case "Timer": {
          return {
            ...state,
            timerShow: !state.timerShow,
          };
        }
        case "Analytics": {
          return {
            ...state,
            analyticsShow: !state.analyticsShow,
          };
        }
        default:
          return state;
      }
    },
    displayTimer: (state) => {
      return {
        ...state,
        timerShow: true,
      };
    },
  },
});

export const { showWidget, displayTimer } = WidgetSlice.actions;
export default WidgetSlice.reducer;
