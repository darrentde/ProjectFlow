import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface WidgetState {
  todoShow: boolean;
  timerShow: boolean;
}

const initialState: WidgetState = {
  todoShow: false,
  timerShow: false,
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
