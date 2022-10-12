import React from "react";
import Leaders from "./Leaders";

const DashBottom = () => {
  const data = [1, 2, 3];
  return (
    <div className="w-full h-1/2 flex justify-between items-center">
      {/* Bottom Left */}
      <div className="flex flex-col justify-between items-center h-full w-3/4 mr-4">
        <div className="w-full h-1/5 flex justify-between items-center">
          <div className="w-1/2 h-full flex justify-start items-center">
            <p className="text-xl">Passing Yards</p>
          </div>
          <div className="w-1/3 h-full flex justify-between items-center text-xs">
            <p>Icon</p>
            <p>Icon</p>
            <p>Filter Icon</p>
          </div>
        </div>
        <div className="w-full h-4/5 border border-black flex justify-center items-center">
          CHART
        </div>
      </div>

      {/* Bottom Right */}
      <div className="flex flex-col justify-between items-center h-full w-1/4">
        <div className="w-full h-1/5 flex items-center justify-start pl-4 font-medium">
          Top (QB)s for (Passing Yards)
        </div>
        <div className="w-full h-4/5 flex flex-col items-center justify-between">
          {data.map((d: number) => {
            return <Leaders key={d} d={d} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default DashBottom;
