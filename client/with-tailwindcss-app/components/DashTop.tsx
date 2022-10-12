import React from "react";

const DashTop = () => {
  const data = [1, 2, 3];

  return (
    <div className="h-1/2 w-full flex justify-between items-center border-white border p-4">
      <div className="flex flex-col justify-between items-center border border-black h-full w-3/4 mr-4">
        <div className="flex justify-between items-center border border-white h-1/2 w-full p-4">
          <div className="border border-black w-1/2 h-full">
            PLAYER SPOTLIGHT
          </div>
          <div className="border border-black w-1/3 h-full flex flex-col justify-center items-center p-2">
            <div className="border border-white w-full h-1/3 mb-2">SEARCH</div>
            <div className="border border-white w-full h-1/2">TABS</div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 border border-white h-2/4 w-full p-4">
          {data.map((d: number) => {
            return <div className="border border-black">{d}</div>;
          })}
        </div>
      </div>
      <div className="flex justify-center items-center border border-black h-full w-1/4">
        <p>Image</p>
      </div>
    </div>
  );
};

export default DashTop;
