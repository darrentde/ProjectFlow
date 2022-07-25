import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface VibeState {
  vibeType: string;
  vibeUrl: string;
}

const initialState: VibeState = {
  vibeType: "background",
  vibeUrl:
    "http://www.youtube.com/embed/znSn8Fm0_i8?autoplay=1&mute=1&controls=0&loop=1&modestbranding=0&rel=0",
};

const VibeSlice = createSlice({
  name: "vibe",
  initialState,
  reducers: {
    setVibe: (state, action: PayloadAction<VibeState>) => {
      const { vibeType, vibeUrl } = action.payload;
      return {
        ...state,
        vibeType: vibeType,
        vibeUrl: vibeUrl,
      };
    },
  },
});

export default VibeSlice.reducer;
export const { setVibe } = VibeSlice.actions;
