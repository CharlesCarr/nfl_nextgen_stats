import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import { ChartContainerProps, ChartData, MinMaxAvg } from "../../types/types";
import Loading from "../ui/Loading";
import Chart from "./chart";
import ChartStat from "./chart-stat";
import { ChartTitle } from "./chart-title";
import { findMinMaxAvg, getChartData } from "./utils";
import { BiStats } from "react-icons/bi";
import { TfiStatsDown, TfiStatsUp } from "react-icons/tfi";

export const ChartContainer = ({ type, data }: ChartContainerProps) => {
  const playerName = useSelector((state: RootState) => state.playerView[type]);
  const statFilter = useSelector(
    (state: RootState) => state.statFilterView[type]
  );
  const positionView = useSelector(
    (state: RootState) => state.positionView.position
  );

  const [chartData, setChartData] = useState<ChartData[] | null>(null);
  const [dataSelection, setDataSelection] = useState<any>(null);
  const [minMaxAvg, setMinMaxAvg] = useState<MinMaxAvg | null>(null);

  useEffect(() => {
    if (data) {
      setChartData(getChartData(data, statFilter.key, playerName));
    }
  }, [data, playerName, statFilter, positionView]);

  useEffect(() => {
    if (chartData && chartData.length > 1) {
      setMinMaxAvg(findMinMaxAvg(chartData));
    }
  }, [chartData]);

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
              {dataSelection && (
                <p className="ml-6 w-fit text-xs border rounded-lg font-light px-2 py-1">
                  {dataSelection}
                </p>
              )}
            </div>
            {minMaxAvg && (
              <div className="w-1/2 h-full flex justify-between items-center text-xs">
                {chartStats.map((stat: any) => (
                  <ChartStat key={stat.label} stat={stat} />
                ))}
              </div>
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
