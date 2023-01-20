import { useState, useEffect, useCallback } from "react";
import Chart from "./Chart";
import Leaders from "./Leaders";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { TfiStatsDown, TfiStatsUp } from "react-icons/tfi";
import { BiStats } from "react-icons/bi";
import type {
  PassingData,
  DashProps,
  ChartData,
  MinMaxAvg,
  RushingData,
} from "../types/dataTypes";
import { filter } from "lodash";
import { playerViewState } from "../redux/slices/playerViewSlice";
import Loading from "./Loading";

const DashBottom = ({ data, type }: DashProps) => {
  // Redux State:
  const playerName = useSelector((state: RootState) => state.playerView[type]);
  const statFilter = useSelector(
    (state: RootState) => state.statFilterView[type]
  );
  const positionView = useSelector(
    (state: RootState) => state.positionView.position
  );

  // Local State:
  const [leadersData, setLeadersData] = useState<
    PassingData[] | RushingData[] | null
  >(null);
  const [chartData, setChartData] = useState<ChartData[] | null>(null);
  const [minMaxAvg, setMinMaxAvg] = useState<MinMaxAvg | null>(null);
  const [noChart, setNoChart] = useState<boolean>(false);
  const [dataSelection, setDataSelection] = useState<any>(null);

  useEffect(() => {
    if (data) {
      getLeaders(statFilter.key);
      getChartData(statFilter.key);
    }
  }, [data, playerName, statFilter, positionView]);

  useEffect(() => {
    if (chartData && chartData.length > 1) {
      findMinMaxAvg();
    } else {
      setNoChart(true);
    }
  }, [chartData]);

  // start by hard coding for this season week by week
  const getChartData = (stat: string) => {
    if (data) {
      // let weekData = data.filter((d: PassingData) => {
      let weekData = filter(data, (d: PassingData) => {
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

      let chartData = weekData
        .map((week: any) => {
          //PassingData
          return { week: week.week, stat: week[stat] };
        })
        .sort((a, b) => {
          // add sorting to make sure data is in order weeks
          return a.week - b.week;
        });

      setChartData(chartData);
      return chartData;
    }
  };

  const getLeaders = (stat: string) => {
    if (data) {
      let allPlayers: any = filter(data, (d: PassingData | RushingData) => {
        if (d.week === 0 && d.season === 2022) {
          return d;
        } else {
          return null;
        }
      });
      allPlayers.sort((a: any, b: any) => {
        // PassingData, PassingData
        return b[stat] - a[stat];
      });
      let topThree = allPlayers.slice(0, 3);
      setLeadersData(topThree);
      return topThree;
    }
  };

  // logic for finding smallest / largest closes to use for domain for recharts y axis
  const findMinMaxAvg = () => {

    if (chartData && chartData.length > 1) {
      const numData = chartData.map((week: ChartData) => {
        return week.stat;
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
      {chartData && chartData.length > 3 ? (
        <div className="flex flex-col justify-between items-center h-full w-full lg:w-3/4 mr-4 pr-3 mb-10 lg:mb-0">
          <div className="w-full h-1/5 flex justify-between items-center">
            <div className="w-1/2 h-full flex justify-start items-center">
              <p className="text-2xl font-semibold tracking-wider">
                {statFilter.name}
              </p>
              {/* w-fit text-xs border rounded-lg font-light px-2 py-1 */}
              {dataSelection && <p className="ml-6 w-fit text-xs border rounded-lg font-light px-2 py-1">{dataSelection}</p>}
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
            <Chart chartData={chartData} dataSelection={dataSelection} setDataSelection={setDataSelection} />
          </div>
        </div>
      ) : (
        <>
          {!chartData ? (
            <div className="h-full w-full flex items-center justify-center">
              <Loading />
            </div>
          ) : (
            <p className="flex justify-center items-center h-full w-full lg:w-3/4 mr-4 pr-3 mb-10 lg:mb-0 font-bold">
              Not enough data to generate chart...
            </p>
          )}
        </>
      )}

      {/* Bottom Right */}
      <div className="flex flex-col justify-between items-center h-full w-full sm:w-1/2 lg:w-1/4">
        <div className="w-full h-1/5 flex flex-col items-start justify-center pl-4 font-medium mb-4 sm:mb-0">
          <p className="font-semibold mb-2 sm:mb-0">{`Top ${
            type === "passer" ? "QB" : "RB"
          }s for ${statFilter.name}`}</p>
          <p className="font-extralight text-xs">(2022 Season)</p>
        </div>

        <div className="w-full h-4/5 flex flex-col items-center justify-between">
          {leadersData ? (
            leadersData.map((d: any, index: number) => {
              return (
                <Leaders
                  key={index}
                  index={index}
                  name={d["player_display_name"]}
                  team={d["team_abbr"]}
                  stat={d[statFilter.key]}
                  type={type}
                />
              );
            })
          ) : (
            <div className="pt-10">
              <Loading />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashBottom;
