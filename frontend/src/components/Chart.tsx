import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";
import type { ChartData, MinMaxAvg } from "../types/dataTypes";
import { RootState } from "../redux/store";

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

  return (
    <div className="flex justify-center items-center pt-2 h-full min-h-[200px] w-full md:mt-2 text-xs font-semibold tracking-wide">
      {chartData && minMaxAvg ? (
        <div>New D3 Chart to go here</div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Chart;
