import React from "react";

const Leaders = ({ d }: any) => {
  return (
    <div className="w-full h-1/3 flex justify-between items-center px-4 py-2 rounded-3xl first:bg-black first:text-white">
      <div className="border border-white rounded-lg h-6 w-6 text-xs flex justify-center items-center">
        <p>{d}</p>
      </div>
      <p className="text-xs">Leader Name(Team)</p>
      <p className="text-xs font-semibold">345 yards</p>
    </div>
  );
};

export default Leaders;
