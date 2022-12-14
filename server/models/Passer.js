const mongoose = require("mongoose");

const PasserSchema = new mongoose.Schema({
  aggressiveness: {
    type: Number,
  },
  attempts: {
    type: Number,
  },
  avg_air_distance: {
    type: Number,
  },
  avg_air_yards_differential: {
    type: Number,
  },
  avg_air_yards_to_sticks: {
    type: Number,
  },
  avg_completed_air_yards: {
    type: Number,
  },
  avg_intended_air_yards: {
    type: Number,
  },
  avg_time_to_throw: {
    type: Number,
  },
  completion_percentage: {
    type: Number,
  },
  completion_percentage_above_expectation: {
    type: Number,
  },
  completions: {
    type: Number,
  },
  expected_completion_percentage: {
    type: Number,
  },
  interceptions: {
    type: Number,
  },
  max_air_distance: {
    type: Number,
  },
  max_completed_air_distance: {
    type: Number,
  },
  pass_touchdowns: {
    type: Number,
  },
  pass_yards: {
    type: Number,
  },
  passer_rating: {
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

module.exports = mongoose.model("Passer", PasserSchema);
