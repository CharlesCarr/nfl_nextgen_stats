import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import type { ChartData, MinMaxAvg } from "../types/dataTypes";
import { RootState } from "../redux/store";
import useMeasure from "react-use-measure";
import ChartInner from "./ChartInner";

interface ChartProps {
  chartData: ChartData[] | null;
  minMaxAvg: MinMaxAvg | null;
}

const Chart = ({ chartData, minMaxAvg }: ChartProps) => {
  // Redux State:
  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);
  const playerName = useSelector((state: RootState) => state.playerView.player);
  const statFilter = useSelector(
    (state: RootState) => state.statFilterView.view
  );
  // actual data for the chart in the format that need for recharts lib
  const [data, setData] = useState<any>(null);
  console.log(data);
  let [ref, bounds] = useMeasure();

  useEffect(() => {
    if (chartData && minMaxAvg) {
      setData(() => {
        const objArr = chartData.map((week: ChartData) => {
          let obj = {
            week: week.week,
            [playerName]: week.passYards,
          };
          return obj;
        });

        return objArr;
      });
    }
  }, [chartData, playerName, minMaxAvg]);

  let dummyData = [
    [0, 10],
    [5, 50],
    [15, 75],
    [55, 100],
    [75, 10],
    [100, 5],
  ];

  return (
    <div className="flex justify-center items-center pt-2 h-full min-h-[200px] w-full md:mt-2 text-xs font-semibold tracking-wide">
      {chartData && minMaxAvg ? (
        <div className="relative h-full w-full" ref={ref}>
          {bounds.width > 0 && (
            <ChartInner
              data={dummyData}
              width={bounds.width}
              height={bounds.height}
            />
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Chart;
