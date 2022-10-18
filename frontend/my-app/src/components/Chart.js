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

const Chart = ({ chartData }) => {
  // Redux State:
  const playerName = useSelector((state) => state.playerView.player);
  console.log(playerName);
  // actual data for the chart in the format that need for recharts lib
  const [data, setData] = useState([]);

  useEffect(() => {
    if (chartData) {
      setData(() => {
        const objArr = chartData.map((week) => {
          let obj = {
            week: week.week,
            [playerName]: week.passYards,
          };
          return obj;
        });

        return objArr;
      });
    }
  }, [chartData, playerName]);

  // logic for finding smallest / largest closes to use for domain for recharts y axis
  // const findMinMax = () => {
  //   if (chartData) {
  //     const numData = chartData.map((week) => {
  //       return week.passYards;
  //     });

  //     const minVal = numData.reduce((prev, curr) =>
  //       prev < curr ? prev : curr
  //     );
  //     const maxVal = numData.reduce((prev, curr) =>
  //       prev > curr ? prev : curr
  //     );

  //     let minMaxObj = {
  //       min: minVal,
  //       max: maxVal,
  //     };

  //     console.log(minMaxObj);
  //     return minMaxObj;
  //   }
  // };

  return (
    <div className="flex justify-center items-center pt-2 h-full w-full md:mt-2 text-xs">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7c72ff" stopOpacity={0.4} />
              <stop offset="75%" stopColor="#7c72ff" stopOpacity={0.05} />
            </linearGradient>
            <linearGradient id="colorTwo" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2d324d" stopOpacity={0.4} />
              <stop offset="75%" stopColor="#2d324d" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid opacity={0.25} vertical={false} />
          <XAxis
            stroke="black"
            dataKey="week"
            // interval={xInterval}
            axisLine={false}
            tickLine={false}
            tickFormatter={(week) => `Week: ${week}`}
          />
          <YAxis
            stroke="black"
            axisLine={false}
            tickLine={false}
            tickCount={5}
            tickFormatter={(yards) => `${yards} yds`}
            yAxisId="left-axis"
            domain={[0, 600]}
          />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey={playerName}
            stroke="#7c72ff"
            fill="url(#color)"
            key={playerName}
            yAxisId="left-axis"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
