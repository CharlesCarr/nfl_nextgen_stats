import StatsCard from "./stats-card";
import { StatCard, StatsCardListProps } from "./types";

export const StatsCardList = ({ statCardData, type, loading }: StatsCardListProps) => {
  
  return (
    <div className="grid grid-col-1 sm:grid-cols-3 gap-y-2 sm:gap-y-0 gap-x-3 h-2/3 w-full mt-px">
      {statCardData?.map((d: StatCard, index: number) => {
        return (
          <StatsCard
            key={index}
            statName={d.statName}
            statNum={d.statNum}
            statIcon={d.statIcon}
            statLabel={d.statLabel}
            statKey={d.statKey}
            type={type}
            loading={loading}
          />
        );
      })}
    </div>
  );
};
