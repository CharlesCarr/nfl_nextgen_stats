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
    <div className="flex justify-center items-center pt-2 h-full w-full md:mt-2 text-xs font-semibold tracking-wide">
      {chartData && minMaxAvg ? (
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4b9d62" stopOpacity={0.4} />
                {/* #7c72ff --> #72FF7C */}
                <stop offset="75%" stopColor="#4b9d62" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="colorTwo" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#549256" stopOpacity={0.4} />
                {/* #2d324d --> #324D2D */}
                <stop offset="75%" stopColor="#549256" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid opacity={0.25} vertical={false} />
            <XAxis
              stroke="#1f1f1f"
              dataKey="week"
              // interval={xInterval}
              axisLine={false}
              tickLine={false}
              tickFormatter={(week) => `Week: ${week}`}
            />
            <YAxis
              stroke="#1f1f1f"
              axisLine={false}
              tickLine={false}
              tickCount={5}
              tickFormatter={(yards) =>
                `${yards.toFixed(0)} ${statFilter.abbr}`
              }
              yAxisId="left-axis"
              domain={[Number(minMaxAvg.min) * 0.8, Number(minMaxAvg.max) * 1.2]}
            />
            <Tooltip labelFormatter={() => "Week Stat -"} />
            <Legend />
            <Area
              type="monotone"
              dataKey={playerName}
              stroke="#0b6241"
              fill="url(#color)"
              key={playerName}
              yAxisId="left-axis"
            />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Chart;
