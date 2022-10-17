import React from "react";

const StatsCard = ({ d }: any) => {
  return (
    <div className="border border-black rounded-2xl flex flex-col items-between justify-start px-8 text-xs">
      <div className="flex justify-between items-center h-1/2">
        <p className="text-sm">Stat Name</p>
        <p>Icon</p>
      </div>

      <div className="flex justify-center items-center h-1/2">
        <p className="mr-4 text-lg">Stat Num</p>
        <p>Stat Change</p>
      </div>
    </div>
  );
};

export default StatsCard;
