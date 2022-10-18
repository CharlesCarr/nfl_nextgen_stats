import { configureStore } from "@reduxjs/toolkit";
import periodFilterViewReducer from "./slices/periodFilterViewSlice";

export const store = configureStore({
  reducer: {
    periodFilterView: periodFilterViewReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
