import { FilterButton } from "./filter-button";
import { TimelineFilter } from "./types";

interface FilterListProps {
  timelineFilters: TimelineFilter[];
}

export const FilterList = ({ timelineFilters }: FilterListProps) => {
  return (
    <div className="w-full h-1/2 flex justify-between items-center text-xs pl-10 sm:pl-0 sm:pr-8 lg:pr-0">
      {timelineFilters.map((timeline: TimelineFilter) => {
        return (
          <FilterButton
            key={timeline.timeline}
            timeline={timeline}
            periodFilter
          />
        );
      })}
    </div>
  );
};
