import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface StatFilterState {
  passer: {
    name: string;
    abbr: string;
    key: string;
  };
  rusher: {
    name: string;
    abbr: string;
    key: string;
  };
  receiver: {
    name: string;
    abbr: string;
    key: string;
  };
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
    key: "rush_yards",
  },
  receiver: {
    name: "Receiving Yards",
    abbr: "yds",
    key: "yards",
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
      };
    },
    getPassTDView: (state) => {
      state.passer = {
        name: "Passing TDs",
        abbr: "TDs",
        key: "pass_touchdowns",
      };
    },
    getPassRatingView: (state) => {
      state.passer = {
        name: "Passer Rating",
        abbr: "RTG",
        key: "passer_rating",
      };
    },
    getRushYardView: (state) => {
      state.rusher = {
        name: "Rushing Yards",
        abbr: "yds",
        key: "rush_yards",
      };
    },
    getRushTDView: (state) => {
      state.rusher = {
        name: "Rushing TDs",
        abbr: "TDs",
        key: "rush_touchdowns",
      };
    },
    getAvgRushView: (state) => {
      state.rusher = {
        name: "Avg Rush Yards",
        abbr: "yds",
        key: "avg_rush_yards",
      };
    },
    getReceiveYardView: (state) => {
      state.receiver = {
        name: "Receiving Yards",
        abbr: "yds",
        key: "yards",
      };
    },
    getReceiveTDView: (state) => {
      state.receiver = {
        name: "Receiving TDs",
        abbr: "TDs",
        key: "rec_touchdowns",
      };
    },
    getReceptionsView: (state) => {
      state.receiver = {
        name: "Receptions",
        abbr: "rec",
        key: "receptions",
      };
    },
    setPasserView: (state, action: PayloadAction<any>) => {
      state.passer = action.payload;
    },
    setRusherView: (state, action: PayloadAction<any>) => {
      state.rusher = action.payload;
    },
    setReceiverView: (state, action: PayloadAction<any>) => {
      state.receiver = action.payload;
    },
  },
});

export const {
  getPassYardView,
  getPassTDView,
  getPassRatingView,
  getRushYardView,
  getRushTDView,
  getAvgRushView,
  getReceptionsView,
  getReceiveTDView,
  getReceiveYardView,
  setPasserView,
  setRusherView,
  setReceiverView,
} = statFilterViewSlice.actions;
export default statFilterViewSlice.reducer;
