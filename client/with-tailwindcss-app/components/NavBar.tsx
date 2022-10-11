import React from "react";

const NavBar = () => {
  return (
    <div className="h-full w-16 flex flex-col bg-black justify-between items-center text-white py-10">
      <div className="1/5">Top</div>
      <div className="flex flex-col justify-around items-center h-3/4">
        <div>Icon1</div>
        <div>Icon2</div>
        <div>Icon3</div>
      </div>
    </div>
  );
};

export default NavBar;
