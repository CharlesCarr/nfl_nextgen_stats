import type { StatCard } from "../types/dataTypes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setStatView } from "../redux/slices/statFilterViewSlice";

const StatsCard = ({ statName, statNum, statIcon, statLabel, statKey }: StatCard) => {
  const statFilter = useSelector(
    (state: RootState) => state.statFilterView.view
  );
  const dispatch = useDispatch();

  return (
    <div
      className={`relative shadow rounded-2xl flex flex-col items-between justify-start px-8 text-xs  font-medium cursor-pointer ${
        statFilter.key === statKey ? "bg-[#0b6241]/80 text-white" : null
      }`}
      onClick={() => dispatch(setStatView({name: statName, abbr:statLabel, key: statKey}))}
    >
      <div className="absolute inset-2/4 -translate-y-2/4 -translate-x-2/4 w-52 h-36 bg-slate-50 rounded-full mix-blend-lighten filter blur-xl opacity-20"></div>
      <div className="flex justify-between items-center h-1/2">
        <p className="text-lg font-semibold">{statName}</p>
        {statIcon}
      </div>

      <div className="flex justify-center items-end h-1/2 pb-8">
        <p className="mr-2 text-4xl font-bold">{statNum}</p>
        <p className="text-xl">{statLabel}</p>
      </div>
    </div>
  );
};

export default StatsCard;
