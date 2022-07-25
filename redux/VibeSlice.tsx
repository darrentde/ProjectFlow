import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface VibeState {
  vibeType: string;
  vibeUrl: string;
}

const initialState: VibeState = {
  vibeType: "video",
  vibeUrl:
    "https://www.youtube.com/embed/UKRYHQALlAI?autoplay=1&mute=1&controls=0&loop=1&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1",
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
