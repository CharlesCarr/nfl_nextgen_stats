import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface playerViewState {
    passer: string,
    rusher: string,
    receiver: string,
}

const initialState: playerViewState = {
    passer: "Josh Allen",
    rusher: "Miles Sanders",
    receiver: "Ja'Marr Chase",
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
        },
        setReceiverView: (state, action: PayloadAction<string> ) => {
            state.receiver = action.payload;
        }
    },
});

export const { setPasserView, setRusherView, setReceiverView } = playerViewSlice.actions;
export default playerViewSlice.reducer;