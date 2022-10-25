import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface playerViewState {
    player: string,
}

const initialState: playerViewState = {
    player: "Josh Allen",
};

export const playerViewSlice = createSlice({
    name: "playerView",
    initialState,
    reducers: {
        setPlayerView: (state, action: PayloadAction<string> ) => {
            state.player = action.payload;
        },
    },
});

export const { setPlayerView } = playerViewSlice.actions;
export default playerViewSlice.reducer;