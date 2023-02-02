import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface StatFilterState {
    passer: {
        name: string,
        abbr: string,
        key: string,
    },
    rusher: {
        name: string,
        abbr: string,
        key: string,
    }
}

const initialState: StatFilterState = {
    passer: {
        name: "Passing Yards",
        abbr: "yds",
        key: "pass_yards",
    },
    rusher: {
        name: "Rushing Yards",
        abbr: "yds",
        key: "rush_yards"
    },
};

export const statFilterViewSlice = createSlice({
    name: "statViews",
    initialState,
    reducers: {
        getPassYardView: (state) => {
            state.passer = {
                name: "Passing Yards",
                abbr: "yds",
                key: "pass_yards",
            }
        },
        getPassTDView: (state) => {
            state.passer = {
                name: "Passing TDs",
                abbr: "TDs",
                key: "pass_touchdowns",
            }
        },
        getPassRatingView: (state) => {
            state.passer = {
                name: "Passer Rating",
                abbr: "RTG",
                key: "passer_rating",
            }
        },
        getRushYardView: (state) => {
            state.rusher = {
                name: "Rushing Yards",
                abbr: "yds",
                key: "rush_yards",
            }
        },
        getRushTDView: (state) => {
            state.rusher = {
                name: "Rushing TDs",
                abbr: "TDs",
                key: "rush_touchdowns",
            }
        },
        getAvgRushView: (state) => {
            state.rusher = {
                name: "Avg Rush Yards",
                abbr: "yds",
                key: "avg_rush_yards",
            }
        },
        setPasserView: (state, action: PayloadAction<any> ) => {
            state.passer = action.payload;
        },
        setRusherView: (state, action: PayloadAction<any> ) => {
            state.rusher = action.payload;
        },
    },
});

export const { getPassYardView, getPassTDView, getPassRatingView, getRushYardView, getRushTDView, getAvgRushView, setPasserView, setRusherView } = statFilterViewSlice.actions;
export default statFilterViewSlice.reducer;