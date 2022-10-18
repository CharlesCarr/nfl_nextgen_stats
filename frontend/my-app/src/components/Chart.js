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

const Chart = () => {
  // { fullResults, convertDateFormat, tickers, timePeriod }
  // actual data for the chart in the format that need for recharts lib
  const [data, setData] = useState([]);
  // data coming from backend that I will need to create elsewhere
  const [backendData, setBackendData] = useState([
    {
      passYardArr: [
        { week: 1, passYards: 250 },
        { week: 2, passYards: 200 },
        { week: 3, passYards: 300 },
      ],
      playerName: "Josh Allen",
    },
  ]);
  const [players, setPlayers] = useState(["Josh Allen"]);

  useEffect(() => {
    let arr = backendData[0].passYardArr;
    var playerName = backendData[0].playerName;

    setData(() => {
      const objArr = arr.map((day) => {
        let obj = {
          week: day.week,
          [playerName]: day.passYards,
        };
        return obj;
      });

      return objArr;

      // if (timePeriod === "1 YR") {
      //   return objArr;
      // }
    });
  }, [backendData]); // timePeriod

  // logic for finding smallest / largest closes to use for domain for recharts y axis
  const findMinMax = (i) => {
    if (data.length !== 0) {
      const numData = data.map((result) => {
        return Number(result[players[i]]);
      });

      const minVal = numData.reduce((prev, curr) =>
        prev < curr ? prev : curr
      );
      const maxVal = numData.reduce((prev, curr) =>
        prev > curr ? prev : curr
      );

      let minMaxObj = {
        min: minVal,
        max: maxVal,
      };

      return minMaxObj;
    } else {
      let minMaxObj = {
        min: 0,
        max: 1000,
      };
      return minMaxObj;
    }
  };

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
            domain={[findMinMax(0)["min"] * 0.9, findMinMax(0)["max"] * 1.05]}
          />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey={players[0]}
            stroke="#7c72ff"
            fill="url(#color)"
            key={players[0]}
            yAxisId="left-axis"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
