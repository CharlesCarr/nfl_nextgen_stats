import { playerViewState } from "../../stores/slices/playerViewSlice";

export interface StatCard {
  statName: string;
  statNum: number | JSX.Element;
  statIcon: JSX.Element;
  statLabel: string;
  statKey: string;
  type: keyof playerViewState;
}

export interface StatsCardListProps {
  statCardData: StatCard[] | null;
  type: keyof playerViewState;
}
