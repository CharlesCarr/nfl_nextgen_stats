import React from "react";

const Leaders = ({ index, name, team, passYards }: any) => {
  return (
    <div className="w-full h-1/3 flex justify-between items-center px-4 py-2 rounded-3xl first:bg-black first:text-white">
      <div className="border border-black rounded-lg h-6 w-6 text-xs flex justify-center items-center">
        <p>{index + 1}</p>
      </div>
      <p className="text-xs">{`${name} (${team})`}</p>
      <p className="text-xs font-semibold">{`${passYards} yards`}</p>
    </div>
  );
};

export default Leaders;
