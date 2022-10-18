import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

export interface periodFilterState {
    view: string,
}

const initialState: periodFilterState = {
    view: "week", // 'week' | 'season' | 'all'
};

export const periodFilterViewSlice = createSlice({
    name: "periodViews",
    initialState,
    reducers: {
        getWeekView: (state) => {
            state.view = "week";
        },
        getSeasonView: (state) => {
            state.view = "season";
        },
        getAllView: (state) => {
            state.view = "all"
        },
    },
});

export const { getWeekView, getSeasonView, getAllView } = periodFilterViewSlice.actions;
export default periodFilterViewSlice.reducer;