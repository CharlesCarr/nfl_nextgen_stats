import { NumberLiteralType } from "typescript";
import { playerViewState } from "../stores/slices/playerViewSlice";

export interface PassingData {
  aggressiveness: number;
  attempts: number;
  avg_air_distance: number;
  avg_air_yards_differential: number;
  avg_air_yards_to_sticks: number;
  avg_completed_air_yards: number;
  avg_intended_air_yards: number;
  avg_time_to_throw: number;
  completion_percentage: number;
  completion_percentage_above_expectation: number;
  completions: number;
  expected_completion_percentage: number;
  interceptions: number;
  max_air_distance: number;
  max_completed_air_distance: number;
  pass_touchdowns: number;
  pass_yards: number;
  passer_rating: number;
  player_display_name: string;
  player_first_name: string;
  player_gsis_id: string;
  player_jersey_number: number;
  player_last_name: string;
  player_position: string;
  player_short_name: string;
  season: number;
  season_type: string;
  team_abbr: string;
  week: number;
}

export interface RushingData {
  avg_rush_yards: number;
  avg_time_to_los: number;
  efficiency: number;
  expected_rush_yards: number;
  percent_attempts_gte_eight_defenders: number;
  player_display_name: string;
  player_first_name: string;
  player_gsis_id: string;
  player_jersey_number: number;
  player_last_name: string;
  player_position: string;
  player_short_name: string;
  rush_attempts: number;
  rush_pct_over_expected: number;
  rush_touchdowns: number;
  rush_yards: number;
  rush_yards_over_expected: number;
  rush_yards_over_expected_per_att: number;
  season: number;
  season_type: string;
  team_abbr: string;
  week: number;
}

export interface ReceivingData {
  rec_touchdowns: number;
  yards: number;
  receptions: number;
  player_display_name: string;
  player_jersey_number: number;
  season: number;
  team_abbr: string;
  week: number;
}

export interface DashProps {
  data: PassingData[] | RushingData[] | null;
  type: keyof playerViewState;
  loading: boolean;
}

export interface ChartContainerProps {
  type: keyof playerViewState;
  data: PassingData[] | null;
}

export interface LeaderboardProps {
  type: keyof playerViewState;
  data: PassingData[] | null;
}

export interface PassPlayer {
  pass_yards: number;
  pass_touchdowns: number;
  passer_rating: number;
  player_jersey_number: number;
  team_abbr: string;
}

export interface RushPlayer {
  rush_yards: number;
  rush_touchdowns: number;
  avg_rush_yards: number;
  player_jersey_number: number;
  team_abbr: string;
}

export interface RecPlayer {
  rec_yards: number;
  rec_touchdowns: number;
  receptions: number;
  player_jersey_number: number;
  team_abbr: string;
}

export interface LeadersProps {
  index: number;
  name: string;
  team: string;
  stat: number;
  type: keyof playerViewState;
}

export interface ChartData {
  week: number;
  stat: number;
}

export interface MinMaxAvg {
  min: string;
  max: string;
  avg: string;
}
