import { useState, useEffect } from "react";
import Chart from "./Chart";
import Leaders from "./Leaders";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const DashBottom = ({ allPassingData }: any) => {
  // Redux State:
  const playerName = useSelector((state: RootState) => state.playerView.player);
  console.log(playerName);
  // Local State:
  const [leadersData, setLeadersData] = useState<any>(null);
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    if (allPassingData) {
      setLeadersData(getPassYardLeaders());
      setChartData(getChartData());
    }
  }, [allPassingData]);

  // start by hard coding for this season week by week
  const getChartData = () => {
    let weekData = allPassingData.filter((d: any) => {
      if (
        d["player_display_name"] === playerName &&
        d.week !== 0 &&
        d.season === 2022
      ) {
        return d;
      }
    });

    let chartData = weekData.map((week: any) => {
      return { week: week.week, passYards: week["pass_yards"] };
    });
    return chartData;
  };

  const getPassYardLeaders = () => {
    let allQBs = allPassingData.filter((d: any) => {
      if (d.week === 0 && d.season === 2022) {
        return d;
      }
    });
    allQBs.sort((a: any, b: any) => {
      return b["pass_yards"] - a["pass_yards"];
    });
    let topThree = allQBs.slice(0, 3);
    return topThree;
  };

  return (
    <div className="w-full h-1/2 flex justify-between items-center">
      {/* Bottom Left */}
      <div className="flex flex-col justify-between items-center h-full w-3/4 mr-4 pr-3">
        <div className="w-full h-1/5 flex justify-between items-center">
          <div className="w-1/2 h-full flex justify-start items-center">
            <p className="text-2xl font-semibold tracking-wider">
              Passing Yards
            </p>
          </div>
          <div className="w-1/3 h-full flex justify-between items-center text-xs">
            <p>Icon</p>
            <p>Icon</p>
            <p>Filter Icon</p>
          </div>
        </div>
        <div className="w-full h-4/5 flex justify-center items-center">
          {/* border border-black */}
          <Chart chartData={chartData} />
        </div>
      </div>

      {/* Bottom Right */}
      <div className="flex flex-col justify-between items-center h-full w-1/4">
        <div className="w-full h-1/5 flex flex-col items-start justify-center pl-4 font-medium">
          <p>Top (QB)s for (Passing Yards)</p>
          <p className="font-extralight text-xs">(This Season)</p>
        </div>

        <div className="w-full h-4/5 flex flex-col items-center justify-between">
          {leadersData &&
            leadersData.map((d: any, index: any) => {
              return (
                <Leaders
                  key={index}
                  index={index}
                  name={d["player_display_name"]}
                  team={d["team_abbr"]}
                  passYards={d["pass_yards"]}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default DashBottom;
