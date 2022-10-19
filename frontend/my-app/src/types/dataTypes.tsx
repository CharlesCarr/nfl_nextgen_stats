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

export interface DashProps {
  allPassingData: PassingData[] | null;
}

export interface PassPlayer {
  pass_yards: number;
  pass_touchdowns: number;
  passer_rating: number;
  player_jersey_number: number;
  team_abbr: string;
}

export interface StatCard {
  statName: string;
  statNum: number;
  statIcon: JSX.Element;
  statLabel: string;
}

export interface ChartData {
  week: number;
  passYards: number;
}

export interface MinMaxAvg {
  min: number;
  max: number;
  avg: string;
}
