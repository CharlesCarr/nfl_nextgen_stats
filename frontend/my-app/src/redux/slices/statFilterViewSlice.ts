import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface StatFilterState {
    view: {
        name: string,
        abbr: string,
        key: string,
    }
}

const initialState: StatFilterState = {
    view: {
        name: "Passing Yards",
        abbr: "yds",
        key: "pass_yards",
    }
};

export const statFilterViewSlice = createSlice({
    name: "statViews",
    initialState,
    reducers: {
        getPassYardView: (state) => {
            state.view = {
                name: "Passing Yards",
                abbr: "yds",
                key: "pass_yards",
            }
        },
        getPassTDView: (state) => {
            state.view = {
                name: "Passing TDs",
                abbr: "TDs",
                key: "pass_touchdowns",
            }
        },
        getPassRatingView: (state) => {
            state.view = {
                name: "Passer Rating",
                abbr: "RTG",
                key: "passer_rating",
            }
        },
        setStatView: (state, action: PayloadAction<any> ) => {
            state.view = action.payload;
        },
    },
});

export const { getPassYardView, getPassTDView, getPassRatingView, setStatView } = statFilterViewSlice.actions;
export default statFilterViewSlice.reducer;