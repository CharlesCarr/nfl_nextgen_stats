import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface playerViewState {
    passer: string,
    rusher: string,
}

const initialState: playerViewState = {
    passer: "Josh Allen",
    rusher: "Miles Sanders",
};

export const playerViewSlice = createSlice({
    name: "playerView",
    initialState,
    reducers: {
        setPasserView: (state, action: PayloadAction<string> ) => {
            state.passer = action.payload;
        },
        setRusherView: (state, action: PayloadAction<string> ) => {
            state.rusher = action.payload;
        }
    },
});

export const { setPasserView, setRusherView } = playerViewSlice.actions;
export default playerViewSlice.reducer;