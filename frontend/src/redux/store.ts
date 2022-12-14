import { configureStore } from "@reduxjs/toolkit";
import periodFilterViewReducer from "./slices/periodFilterViewSlice";
import playerViewReducer from "./slices/playerViewSlice";
import statFilterViewReducer from "./slices/statFilterViewSlice";
import darkModeViewReducer from "./slices/darkModeViewSlice";
import positionViewReducer from "./slices/positionViewSlice";

export const store = configureStore({
  reducer: {
    periodFilterView: periodFilterViewReducer,
    statFilterView: statFilterViewReducer,
    playerView: playerViewReducer,
    darkMode: darkModeViewReducer,
    positionView: positionViewReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
