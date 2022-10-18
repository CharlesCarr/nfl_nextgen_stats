import React from "react";

const Leaders = ({ index, name, team, passYards }: any) => {
  return (
    <div className="w-full h-1/3 flex justify-between items-center px-4 py-2 rounded-3xl shadow mb-3">
      {/* first:bg-[#1f1f1f] first:text-white */}
      <div className="border border-black rounded-lg h-6 w-6 text-xs flex justify-center items-center">
        <p className="text-xs font-semibold">{index + 1}</p>
      </div>
      <p className="text-xs font-semibold">{name}<span className="font-normal">{" "}{`(${team})`}</span></p>
      <p className="text-xs font-semibold">{passYards}<span className="font-normal">{" "}yards</span></p>
    </div>
  );
};

export default Leaders;
