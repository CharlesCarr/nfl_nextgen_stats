import { createSlice } from "@reduxjs/toolkit";

export interface DarkModeState {
    darkMode: boolean,
}

const initialState: DarkModeState = {
    darkMode: true,
};

export const darkModeViewSlice = createSlice({
    name: "periodViews",
    initialState,
    reducers: {
        getDarkMode: (state) => {
            state.darkMode = true;
        },
        setDarkMode: (state) => {
            state.darkMode = !state.darkMode;
        }
    },
});

export const { getDarkMode, setDarkMode } = darkModeViewSlice.actions;
export default darkModeViewSlice.reducer;