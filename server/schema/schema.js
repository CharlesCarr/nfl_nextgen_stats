const Passer = require("../models/Passer");
const Rusher = require("../models/Rusher");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLSchema,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
} = require("graphql");

// Passer Type
const PasserType = new GraphQLObjectType({
  name: "Passer",
  fields: () => ({
    id: { type: GraphQLID },
    aggressiveness: { type: GraphQLFloat },
    attempts: { type: GraphQLFloat },
    avg_air_distance: { type: GraphQLFloat },
    avg_air_yards_differential: { type: GraphQLFloat },
    avg_air_yards_to_sticks: { type: GraphQLFloat },
    avg_completed_air_yards: { type: GraphQLFloat },
    avg_intended_air_yards: { type: GraphQLFloat },
    avg_time_to_throw: { type: GraphQLFloat },
    completion_percentage: { type: GraphQLFloat },
    completion_percentage_above_expectation: { type: GraphQLFloat },
    completions: { type: GraphQLFloat },
    expected_completion_percentage: { type: GraphQLFloat },
    interceptions: { type: GraphQLFloat },
    max_air_distance: { type: GraphQLFloat },
    max_completed_air_distance: { type: GraphQLFloat },
    pass_touchdowns: { type: GraphQLFloat },
    pass_yards: { type: GraphQLFloat },
    passer_rating: { type: GraphQLFloat },
    player_display_name: { type: GraphQLString },
    player_first_name: { type: GraphQLString },
    player_gsis_id: { type: GraphQLString },
    player_jersey_number: { type: GraphQLFloat },
    player_last_name: { type: GraphQLString },
    player_position: { type: GraphQLString },
    player_short_name: { type: GraphQLString },
    season: { type: GraphQLFloat },
    season_type: { type: GraphQLString },
    team_abbr: { type: GraphQLString },
    week: { type: GraphQLFloat },
  }),
});

// Rusher Type
const RusherType = new GraphQLObjectType({
  name: "Rusher",
  fields: () => ({
    id: { type: GraphQLID },
    avg_rush_yards: { type: GraphQLFloat },
    avg_time_to_los: { type: GraphQLFloat },
    efficiency: { type: GraphQLFloat },
    expected_rush_yards: { type: GraphQLFloat },
    percent_attempts_gte_eight_defenders: { type: GraphQLFloat },
    player_display_name: { type: GraphQLString },
    player_first_name: { type: GraphQLString },
    player_gsis_id: { type: GraphQLString },
    player_jersey_number: { type: GraphQLFloat },
    player_last_name: { type: GraphQLString },
    player_position: { type: GraphQLString },
    player_short_name: { type: GraphQLString },
    rush_attempts: { type: GraphQLFloat },
    rush_pct_over_expected: { type: GraphQLFloat },
    rush_touchdowns: { type: GraphQLFloat },
    rush_yards: { type: GraphQLFloat },
    rush_yards_over_expected: { type: GraphQLFloat },
    rush_yards_over_expected_per_att: { type: GraphQLFloat },
    season: { type: GraphQLFloat },
    season_type: { type: GraphQLString },
    team_abbr: { type: GraphQLString },
    week: { type: GraphQLFloat },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    passers: {
      type: new GraphQLList(PasserType),
      resolve(parent, args) {
        return Passer.find();
      },
    },
    rushers: {
      type: new GraphQLList(RusherType),
      resolve(parent, args) {
        return Rusher.find();
      },
    },
    passer: {
      type: PasserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Passer.findById(args.id);
      },
    },
    rusher: {
      type: RusherType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Rusher.findById(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
