import { CiSettings } from "react-icons/ci";
import { FaFootballBall } from "react-icons/fa";

const NavBar = () => {
  return (
    <div className="h-full w-20 flex flex-col bg-[#1f1f1f] justify-between items-center text-zinc-100 text-xs py-10">
      <div className="1/5 flex items-center justify-center">
        <FaFootballBall className="w-7 h-7" />
      </div>
      <div className="flex flex-col justify-end items-center h-3/4">
        {/* add other icons when build out running and receiving stats */}
        {/* <div>Icon1</div>
        <div>Icon2</div> */}
        <CiSettings className="w-8 h-8 cursor-pointer" />
      </div>
    </div>
  );
};

export default NavBar;
