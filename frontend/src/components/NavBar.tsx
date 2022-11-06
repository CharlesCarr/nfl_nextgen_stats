import { CiSettings } from "react-icons/ci";
import { FaFootballBall } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { setDarkMode } from "../redux/slices/darkModeViewSlice";
import { BsSun, BsMoon } from "react-icons/bs";

const NavBar = () => {
  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);
  const dispatch = useDispatch();

  return (
    <div className="h-10 lg:h-full w-full lg:w-20 flex lg:flex-col flex-row bg-[#1f1f1f] justify-between items-center text-zinc-100 text-xs py-10 px-10 lg:px-0" data-testId="navbar">
      <div className="1/5 flex flex-col items-center justify-center">
        <FaFootballBall className="w-7 h-7 mb-7" />
        {darkMode ? (
          <BsSun
            onClick={() => dispatch(setDarkMode())}
            className="cursor-pointer w-5 h-5"
          />
        ) : (
          <BsMoon
            onClick={() => dispatch(setDarkMode())}
            className="cursor-pointer w-5 h-5"
          />
        )}
      </div>
      <div className="flex flex-col justify-end items-center lg:h-3/4">
        {/* add other icons when build out running and receiving stats */}
        {/* <div>Icon1</div>
        <div>Icon2</div> */}
        <CiSettings className="w-8 h-8 cursor-pointer" />
      </div>
    </div>
  );
};

export default NavBar;
