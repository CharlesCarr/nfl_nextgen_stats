import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface LeadersProps {
  index: number;
  name: string;
  team: string;
  stat: number;
}

const Leaders = ({ index, name, team, stat }: LeadersProps) => {
  const statFilter = useSelector(
    (state: RootState) => state.statFilterView.view
  );
  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);

  return (
    <div
      className={`w-full h-1/3 flex justify-between items-center px-4 py-2 rounded-3xl shadow mb-5 sm:mb-3 ${
        darkMode ? "bg-[#1f1f1f]" : ""
      }`}
    >
      {/* first:bg-[#1f1f1f] first:text-white */}
      <div className="border border-black rounded-lg h-6 w-6 text-xs flex justify-center items-center">
        <p className="text-xs font-semibold">{index + 1}</p>
      </div>
      <p className="text-xs font-semibold">
        {name}
        <span className="font-normal"> {`(${team})`}</span>
      </p>
      <p className="text-xs font-semibold">
        {stat.toFixed(1)}
        <span className="font-normal"> {statFilter.abbr}</span>
      </p>
    </div>
  );
};

export default Leaders;
