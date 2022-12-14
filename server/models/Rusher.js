const mongoose = require("mongoose");

const RusherSchema = new mongoose.Schema({
  avg_rush_yards: {
    type: Number,
  },
  avg_time_to_los: {
    type: Number,
  },
  efficiency: {
    type: Number,
  },
  expected_rush_yards: {
    type: Number,
  },
  percent_attempts_gte_eight_defenders: {
    type: Number,
  },
  player_display_name: {
    type: String,
  },
  player_first_name: {
    type: String,
  },
  player_gsis_id: {
    type: String,
  },
  player_jersey_number: {
    type: Number,
  },
  player_last_name: {
    type: String,
  },
  player_position: {
    type: String,
  },
  player_short_name: {
    type: String,
  },
  rush_attempts: {
    type: Number,
  },
  rush_pct_over_expected: {
    type: Number,
  },
  rush_touchdowns: {
    type: Number,
  },
  rush_yards: {
    type: Number,
  },
  rush_yards_over_expected: {
    type: Number,
  },
  rush_yards_over_expected_per_att: {
    type: Number,
  },
  season: {
    type: Number,
  },
  season_type: {
    type: String,
  },
  team_abbr: {
    type: String,
  },
  week: {
    type: Number,
  },
});

module.exports = mongoose.model("Rusher", RusherSchema);
