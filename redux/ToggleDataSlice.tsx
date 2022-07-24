import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../redux/Store";

// State count=0
// Action increment/decrement, the call that triggers the reducer
// Reducer count+1/count-1, the actual action

export interface ToggleDataState {
  value: boolean;
}

const initialState: ToggleDataState = {
  value: false,
};

export const toggleDataSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    setToggle: (state) => {
      return {
        ...state,
        value: !state.value,
      };

      // console.log("toggle at", Date());
    },
  },
});

// Action creators are generated for each case reducer function
export const { setToggle } = toggleDataSlice.actions;
export const selectToggle = (state: RootState) => state.toggledata.value; //Need to check what this is

export default toggleDataSlice.reducer;
