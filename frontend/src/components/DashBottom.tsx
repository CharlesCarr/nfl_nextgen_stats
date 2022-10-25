import { useState, useEffect } from "react";
import Chart from "./Chart";
import Leaders from "./Leaders";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
// import { BsFilterRight } from "react-icons/bs";
import { TfiStatsDown, TfiStatsUp } from "react-icons/tfi";
import { BiStats } from "react-icons/bi";
import type {
  PassingData,
  DashProps,
  ChartData,
  MinMaxAvg,
} from "../types/dataTypes";

const DashBottom = ({ allPassingData }: DashProps) => {
  // Redux State:
  const playerName = useSelector((state: RootState) => state.playerView.player);
  const statFilter = useSelector((state: RootState) => state.statFilterView.view);
  // Local State:
  const [leadersData, setLeadersData] = useState<PassingData[] | null>(null);
  console.log(leadersData);
  const [chartData, setChartData] = useState<ChartData[] | null>(null);
  const [minMaxAvg, setMinMaxAvg] = useState<MinMaxAvg | null>(null);

  useEffect(() => {
    if (allPassingData) {
      getPassLeaders(statFilter.key);
      getChartData(statFilter.key);
    }
  }, [allPassingData, playerName, statFilter]);

  useEffect(() => {
    findMinMaxAvg();
  }, [chartData]);

  // start by hard coding for this season week by week
  const getChartData = (stat: string) => {
    if (allPassingData) {
      let weekData = allPassingData.filter((d: PassingData) => {
        if (
          d["player_display_name"] === playerName &&
          d.week !== 0 &&
          d.season === 2022
        ) {
          return d;
        } else {
          return null;
        }
      });

      let chartData = weekData.map((week: any) => { //PassingData
        return { week: week.week, passYards: week[stat] };
      });
      setChartData(chartData);
      return chartData;
    }
  };

  const getPassLeaders = (stat: string) => {
    if (allPassingData) {
      let allQBs = allPassingData.filter((d: PassingData) => {
        if (d.week === 0 && d.season === 2022) {
          return d;
        } else {
          return null;
        }
      });
      allQBs.sort((a: any, b: any) => { // PassingData, PassingData
        return b[stat] - a[stat];
      });
      let topThree = allQBs.slice(0, 3);
      setLeadersData(topThree);
      return topThree;
    }
  };

  // logic for finding smallest / largest closes to use for domain for recharts y axis
  const findMinMaxAvg = () => {
    if (chartData) {
      const numData = chartData.map((week: ChartData) => {
        return week.passYards;
      });

      const minVal = numData.reduce((prev: number, curr: number) =>
        prev < curr ? prev : curr
      );
      const maxVal = numData.reduce((prev: number, curr: number) =>
        prev > curr ? prev : curr
      );

      const avgVal =
        numData.reduce((prev: number, curr: number) => prev + curr, 0) /
        numData.length;

      let minMaxAvg = {
        min: minVal.toFixed(0),
        max: maxVal.toFixed(0),
        avg: avgVal.toFixed(0),
      };

      setMinMaxAvg(minMaxAvg);
      return minMaxAvg;
    }
  };

  return (
    <div className="w-full h-1/2 flex flex-col lg:flex-row justify-between items-center mt-2">
      {/* Bottom Left */}
      <div className="flex flex-col justify-between items-center h-full w-full lg:w-3/4 mr-4 pr-3 mb-10 lg:mb-0">
        <div className="w-full h-1/5 flex justify-between items-center">
          <div className="w-1/2 h-full flex justify-start items-center">
            <p className="text-2xl font-semibold tracking-wider">
              {statFilter.name}
            </p>
          </div>
          {minMaxAvg ? (
            <div className="w-1/2 h-full flex justify-between items-center text-xs">
              <div className="flex items-center justify-center">
                <BiStats className="w-4 h-4 mr-3" />
                <p>{`avg: ${minMaxAvg.avg}`}</p>
              </div>
              <div className="flex items-center justify-center">
                <TfiStatsUp className="w-4 h-4 mr-3" />
                <p>{`max: ${minMaxAvg.max}`}</p>
              </div>
              <div className="flex items-center justify-center">
                <TfiStatsDown className="w-4 h-4 mr-3" />
                <p>{`min: ${minMaxAvg.min}`}</p>
              </div>

              {/* Adding additional filter functionality later */}
              {/* <BsFilterRight className="w-7 h-7 cursor-pointer" /> */}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className="w-full h-full lg:h-4/5 flex justify-center items-center">
          {/* border border-black */}
          <Chart chartData={chartData} minMaxAvg={minMaxAvg} />
        </div>
      </div>

      {/* Bottom Right */}
      <div className="flex flex-col justify-between items-center h-full w-full sm:w-1/2 lg:w-1/4">
        <div className="w-full h-1/5 flex flex-col items-start justify-center pl-4 font-medium mb-4 sm:mb-0">
          <p className="font-semibold mb-2 sm:mb-0">{`Top QBs for ${statFilter.name}`}</p>
          <p className="font-extralight text-xs">(2022 Season)</p>
        </div>

        <div className="w-full h-4/5 flex flex-col items-center justify-between">
          {leadersData &&
            leadersData.map((d: any, index: number) => { // PassingData
              return (
                <Leaders
                  key={index}
                  index={index}
                  name={d["player_display_name"]}
                  team={d["team_abbr"]}
                  stat={d[statFilter.key]}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default DashBottom;
