import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "./Store";

// State count=0
// Action increment/decrement, the call that triggers the reducer
// Reducer count+1/count-1, the actual action

export interface ToggleCheckState {
  value: boolean;
}

const initialState: ToggleCheckState = {
  value: false,
};

export const toggleCheckDataSlice = createSlice({
  name: "toggleCheck",
  initialState,
  reducers: {
    setToggleCheck: (state) => {
      return {
        ...state,
        value: !state.value,
      };
      // state.value = !state.value;
      // console.log("toggleCheck at", Date());
    },
  },
});

// Action creators are generated for each case reducer function
export const { setToggleCheck } = toggleCheckDataSlice.actions;
// export const selectToggle = (state: RootState) => state.toggleCheckdata.value; //Need to check what this is

export default toggleCheckDataSlice.reducer;
