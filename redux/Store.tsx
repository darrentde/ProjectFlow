import { configureStore } from "@reduxjs/toolkit";
import timerReducer from "./TimerSlice";
import widgetReducer from "./WidgetSlice";
import sessionReducer from "./SessionSlice";
import toggleReducer from "./ToggleDataSlice";
import toggleCheckReducer from "./ToggleCheckSlice";
import tourReducer from "./TourSlice";

export const store = configureStore({
  reducer: {
    tour: tourReducer,
    timer: timerReducer,
    widget: widgetReducer,
    session: sessionReducer,
    toggledata: toggleReducer,
    togglecheck: toggleCheckReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
