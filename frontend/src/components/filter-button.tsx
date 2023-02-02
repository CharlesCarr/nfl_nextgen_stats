import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../stores/store";

export const FilterButton = ({ timeline }: any) => {
  const dispatch = useDispatch();
  const periodFilter = useSelector(
    (state: RootState) => state.periodFilterView
  );

  return (
    <button
      key={timeline.timeline}
      className={`rounded-xl py-1 px-4 ${
        periodFilter.view === timeline.timeline.toLowerCase()
          ? "bg-[#0b6241]/60 text-white "
          : ""
      }`}
      onClick={() => dispatch(timeline.dataFn())}
    >
      {timeline.timeline}
    </button>
  );
};
