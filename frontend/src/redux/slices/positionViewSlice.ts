import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

export interface positionViewState {
    position: string | null,
}

const initialState: positionViewState = {
    position: null, // 'QB' | 'RB' | 'WR/TE' | null
};

export const positionViewSlice = createSlice({
    name: "positionViews",
    initialState,
    reducers: {
        getQBView: (state) => {
            state.position = "QB";
        },
        getRBView: (state) => {
            state.position = "RB";
        },
    },
});

export const { getQBView, getRBView } = positionViewSlice.actions;
export default positionViewSlice.reducer;