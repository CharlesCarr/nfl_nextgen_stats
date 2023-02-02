import { filter } from "lodash";
import type { ChartData, PassingData } from "../../types/dataTypes";

// logic for finding smallest / largest closes to use for domain for recharts y axis
export const findMinMaxAvg = (chartData: ChartData[]) => {
  // if (chartData && chartData.length > 1) {
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

  // setMinMaxAvg(minMaxAvg);
  return minMaxAvg;
  // }
};

// start by hard coding for this season week by week
export const getChartData = (
  data: PassingData[],
  stat: string,
  playerName: string
) => {
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

  return chartData;
};
