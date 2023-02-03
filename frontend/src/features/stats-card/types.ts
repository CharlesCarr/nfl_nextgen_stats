import { playerViewState } from "../../stores/slices/playerViewSlice";
export interface StatCard {
  statName: string | null;
  statNum: number | JSX.Element | null;
  statIcon: JSX.Element | null;
  statLabel: string | null;
  statKey: string | null;
  type: keyof playerViewState;
  loading: boolean;
}

export interface StatsCardListProps {
  statCardData: StatCard[];
  type: keyof playerViewState;
  loading: boolean;
}
