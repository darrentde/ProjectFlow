import { configureStore } from "@reduxjs/toolkit";
import timerReducer from "./TimerSlice";
import widgetReducer from "./WidgetSlice";
import sessionReducer from "./SessionSlice";

export const store = configureStore({
  reducer: {
    timer: timerReducer,
    widget: widgetReducer,
    session: sessionReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
