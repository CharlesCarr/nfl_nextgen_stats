import React from "react";
import Leaders from "./Leaders";

const DashBottom = () => {
  const data = [1, 2, 3];
  return (
    <div className="border border-slate-100 w-full h-1/2 flex justify-between items-center p-4">
      <div className="flex flex-col justify-between items-center border border-black h-full w-3/4 mr-4 p-4">
        <div className="w-full h-1/4 border border-white flex justify-between items-center p-4">
          <div className="w-1/2 h-full border border-black">HEADER</div>
          <div className="w-1/3 h-full border border-black">FILTERS</div>
        </div>
        <div className="w-full h-4/6 border border-white flex justify-center items-center">
          CHART
        </div>
      </div>
      <div className="flex flex-col justify-between items-center border border-black h-full w-1/4 p-4">
        <div className="w-full h-1/5 flex items-center justify-start border border-white pl-4 text-sm font-medium">
          Top (QB)s for (Passing Yards)
        </div>
        <div className="w-full h-4/5 flex flex-col items-center justify-between border border-white p-2">
          {data.map((d: number) => {
            return <Leaders key={d} d={d} />
          })}
        </div>
      </div>
    </div>
  );
};

export default DashBottom;
