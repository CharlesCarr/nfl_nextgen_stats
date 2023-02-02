import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import { LeadersProps } from "../../types/dataTypes";

const Leaders = ({ index, name, team, stat, type }: LeadersProps) => {
  const statFilter = useSelector(
    (state: RootState) => state.statFilterView[type]
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
        <p className="text-xs font-semibold" id="rank">
          {index + 1}
        </p>
      </div>
      <p className="text-xs font-semibold" data-testid="name">
        {name}
        <span className="font-normal" id="team">
          {" "}
          {`(${team})`}
        </span>
      </p>
      {stat ? (
        <p className="text-xs font-semibold" id="statNum">
          {stat.toFixed(1)}
          <span className="font-normal"> {statFilter.abbr}</span>
        </p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Leaders;
