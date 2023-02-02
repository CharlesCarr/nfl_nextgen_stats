import { filter } from "lodash";
import { useEffect, useState } from "react";
import { BiStats } from "react-icons/bi";
import { TfiStatsDown, TfiStatsUp } from "react-icons/tfi";
import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import {
  ChartContainerProps,
  ChartData,
  MinMaxAvg,
  PassingData,
} from "../../types/dataTypes";
import Loading from "../ui/Loading";
import Chart from "./Chart";
import ChartStat from "./chart-stat";
import { ChartTitle } from "./chart-title";
import { findMinMaxAvg } from "./utils";

export const ChartContainer = ({ type, data }: ChartContainerProps) => {
  // Redux State:
  const playerName = useSelector((state: RootState) => state.playerView[type]);
  const statFilter = useSelector(
    (state: RootState) => state.statFilterView[type]
  );
  const [chartData, setChartData] = useState<ChartData[] | null>(null);
  const positionView = useSelector(
    (state: RootState) => state.positionView.position
  );
  const [dataSelection, setDataSelection] = useState<any>(null);
  const [minMaxAvg, setMinMaxAvg] = useState<MinMaxAvg | null>(null);
  const [noChart, setNoChart] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      getChartData(statFilter.key);
    }
  }, [data, playerName, statFilter, positionView]);

  useEffect(() => {
    if (chartData && chartData.length > 1) {
      setMinMaxAvg(findMinMaxAvg(chartData));
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

  const chartStats = [
    {
      icon: <BiStats className="w-4 h-4 mr-3" />,
      label: "avg",
      data: minMaxAvg?.avg,
    },
    {
      icon: <TfiStatsUp className="w-4 h-4 mr-3" />,
      label: "max",
      data: minMaxAvg?.max,
    },
    {
      icon: <TfiStatsDown className="w-4 h-4 mr-3" />,
      label: "min",
      data: minMaxAvg?.min,
    },
  ];

  return (
    <>
      {chartData && chartData.length > 3 ? (
        <div className="flex flex-col justify-between items-center h-full w-full lg:w-3/4 mr-4 pr-3 mb-10 lg:mb-0">
          <div className="w-full h-1/5 flex justify-between items-center">
            <div className="w-1/2 h-full flex justify-start items-center">
              <ChartTitle name={statFilter.name} />
              {/* w-fit text-xs border rounded-lg font-light px-2 py-1 */}
              {dataSelection && (
                <p className="ml-6 w-fit text-xs border rounded-lg font-light px-2 py-1">
                  {dataSelection}
                </p>
              )}
            </div>
            {minMaxAvg ? (
              <div className="w-1/2 h-full flex justify-between items-center text-xs">
                {chartStats.map((stat: any) => (
                  <ChartStat key={stat.label} stat={stat} />
                ))}
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
          <div className="w-full h-full lg:h-4/5 flex justify-center items-center">
            <Chart
              chartData={chartData}
              dataSelection={dataSelection}
              setDataSelection={setDataSelection}
            />
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
    </>
  );
};
