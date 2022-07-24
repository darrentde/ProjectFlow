import { combineReducers, configureStore } from "@reduxjs/toolkit";
import timerReducer from "./TimerSlice";
import widgetReducer from "./WidgetSlice";
import sessionReducer from "./SessionSlice";
import toggleReducer from "./ToggleDataSlice";
import toggleCheckReducer from "./ToggleCheckSlice";
import tourReducer from "./TourSlice";

export const rootReducer = combineReducers({
  tour: tourReducer,
  timer: timerReducer,
  widget: widgetReducer,
  session: sessionReducer,
  toggledata: toggleReducer,
  togglecheck: toggleCheckReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
