import { configureStore } from "@reduxjs/toolkit";
import periodFilterViewReducer from "./slices/periodFilterViewSlice";
import playerViewReducer from "./slices/playerViewSlice";

export const store = configureStore({
  reducer: {
    periodFilterView: periodFilterViewReducer,
    playerView: playerViewReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
