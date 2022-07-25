import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface WidgetState {
  todoShow: boolean;
  timerShow: boolean;
  analyticsShow: boolean;
  backgroundShow: boolean;
  musicShow: boolean;
}

const initialState: WidgetState = {
  todoShow: false,
  timerShow: false,
  analyticsShow: false,
  backgroundShow: false,
  musicShow: false,
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
        case "Music": {
          return {
            ...state,
            musicShow: !state.musicShow,
          };
        }
        case "Analytics": {
          return {
            ...state,
            analyticsShow: !state.analyticsShow,
          };
        }
        case "Background": {
          return {
            ...state,
            backgroundShow: !state.backgroundShow,
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
