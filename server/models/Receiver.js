const mongoose = require("mongoose");

const ReceiverSchema = new mongoose.Schema({
    avg_cushion: {
        type: Number,
    },
    avg_expected_yac: {
        type: Number,
    },
    avg_intended_air_yards: {
        type: Number,
    },
    avg_separation: {
        type: Number,
    },
    avg_yac: {
        type: Number,
    },
    avg_yac_above_expectation: {
        type: Number,
    },
    catch_percentage: {
        type: Number,
    },
    percent_share_of_intended_air_yards: {
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
    player_position:{
        type: String,
      },
    player_short_name: {
        type: String,
      },
    rec_touchdowns:{
        type: Number,
    },
    receptions: {
        type: Number,
    },
    season: {
        type: Number,
    },
    season_type: {
        type: String,
      },
    targets: {
        type: Number,
    },
    team_abbr: {
        type: String,
      },
    week: {
        type: Number,
    },
    yards: {
        type: Number,
    },
});

module.exports = mongoose.model("Receiver", ReceiverSchema);
