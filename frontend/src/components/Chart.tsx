import type { ChartData } from "../types/dataTypes";
import useMeasure from "react-use-measure";
import ChartInner from "./ChartInner";

interface ChartProps {
  chartData: ChartData[] | null;
  // minMaxAvg: MinMaxAvg | null;
}

const Chart = ({ chartData }: ChartProps) => {
  let [ref, bounds] = useMeasure();

  return (
    <div className="flex justify-center items-center pt-2 h-full min-h-[200px] w-full md:mt-2 text-xs font-semibold tracking-wide">
      <div className="relative h-full w-full" ref={ref}>
        {bounds.width > 0 && (
          <ChartInner
            data={chartData}
            width={bounds.width}
            height={bounds.height}
          />
        )}
      </div>
    </div>
  );
};

export default Chart;
