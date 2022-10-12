import React from "react";
import StatsCard from "./StatsCard";

const DashTop = () => {
  const data = [1, 2, 3];

  return (
    <div className="h-1/2 w-full flex justify-between items-center">
      <div className="flex flex-col justify-between items-center h-full w-3/4 mr-4 pr-3">
        <div className="flex justify-between items-center h-1/2 w-full">
          <div className="w-1/2 h-full flex flex-col justify-start items-start">
            <p className="text-3xl font-bold tracking-widest mb-2">QB SPOTLIGHT</p>
            <p className="font-semibold tracking-wide mb-1">Josh Allen - #17</p>
            <p className="font-light text-sm">Buffalo Bills</p>
          </div>
          <div className="w-1/3 h-full flex flex-col justify-center items-center">
            <div className="w-full h-1/2 flex justify-end items-center pr-4">
              <input placeholder="(Icon) Search" className="w-32 rounded text-sm mr-4 shadow py-px pl-2" />
              <p>Icon</p>
            </div>
            <div className="w-full h-1/2 flex justify-between items-center pr-10 pl-24 text-xs">
              <p className="bg-black text-white rounded-xl py-1 px-4">Week</p>
              <p>Season</p>
              <p>All</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-x-3 h-2/3 w-full">
          {data.map((d: number) => {
            return <StatsCard d={d} />;
          })}
        </div>
      </div>
      <div className="flex justify-center items-center border border-black h-full w-1/4 rounded-2xl">
        <p>Image</p>
      </div>
    </div>
  );
};

export default DashTop;
