import { createSlice } from "@reduxjs/toolkit";

export interface positionViewState {
    position: string | null;
}

const initialState: positionViewState = {
    position: "QB", // 'QB' | 'RB' | 'WR/TE' | null
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
        getWRTEView: (state) => {
            state.position = "WR/TE";
        }
    },
});

export const { getQBView, getRBView, getWRTEView } = positionViewSlice.actions;
export default positionViewSlice.reducer;