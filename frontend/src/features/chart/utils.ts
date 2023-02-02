import type { ChartData } from "../../types/dataTypes";

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
