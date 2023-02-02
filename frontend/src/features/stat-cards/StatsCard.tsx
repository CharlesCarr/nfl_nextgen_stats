import type { StatCard } from "../../types/dataTypes";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import { setPasserView, setRusherView } from "../../stores/slices/statFilterViewSlice";
import { useEffect, useState } from "react";

const StatsCard = ({
  statName,
  statNum,
  statIcon,
  statLabel,
  statKey,
  type
}: StatCard) => {
  const statFilter = useSelector(
    (state: RootState) => state.statFilterView[type]
  );
  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);
  const dispatch = useDispatch();
  const [itemStyles, setItemStyles] = useState<string>("");

  useEffect(() => {
    if (statFilter.key === statKey) {
      setItemStyles("bg-[#0b6241]/80 text-white");
    } else if (darkMode && statFilter.key !== statKey) {
      setItemStyles("bg-[#1f1f1f]");
    } else {
      setItemStyles("");
    }
  }, [darkMode, statFilter, statKey]);

  return (
    <div
      className={`relative shadow rounded-2xl flex flex-col items-between justify-start px-8 text-xs font-medium cursor-pointer ${itemStyles}`}
      onClick={() =>
        type === "passer" ? (dispatch(setPasserView({ name: statName, abbr: statLabel, key: statKey }))) : (dispatch(setRusherView({ name: statName, abbr: statLabel, key: statKey })))
      }
    >
      {darkMode && statFilter.key === statKey ? (
        <div className="absolute inset-2/4 -translate-y-2/4 -translate-x-2/4 w-52 h-36 bg-slate-50 rounded-full mix-blend-lighten filter blur-xl opacity-20"></div>
      ) : null}
      <div className="flex justify-between items-center h-1/2">
        <p className="text-lg font-semibold">{statName}</p>
        {statIcon}
      </div>
      <div className="flex justify-center items-end h-1/2 pb-8">
        <p className={`${typeof statNum === 'string' ? "text-base" : "text-4xl font-bold"} mr-2`}>{statNum}</p>
        <p className={`${typeof statNum === 'string' ? "hidden" : "block"} text-base lg:text-xl`}>{statLabel}</p>
      </div>
    </div>
  );
};

export default StatsCard;
