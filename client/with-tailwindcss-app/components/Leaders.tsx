import React from "react";

const Leaders = ({ d }: any) => {
  return (
    <div className="border border-black w-full h-18 flex justify-between items-center px-4 py-2 rounded-2xl">
      <div className="border border-white rounded-lg h-6 w-6 text-xs text-white flex justify-center items-center">
        <p>{d}</p>
      </div>
      <p className="text-xs">Leader Name(Team)</p>
      <p className="text-xs font-semibold">345 yards</p>
    </div>
  );
};

export default Leaders;
