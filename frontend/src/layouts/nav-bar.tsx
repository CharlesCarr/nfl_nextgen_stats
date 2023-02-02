import { CiSettings } from "react-icons/ci";
import { FaFootballBall } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../stores/store";
import { setDarkMode } from "../stores/slices/darkModeViewSlice";
import { BsSun, BsMoon } from "react-icons/bs";
import { Link } from "react-router-dom";
import { getQBView, getRBView } from "../stores/slices/positionViewSlice";

const NavBar = () => {
  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);
  const positionView = useSelector(
    (state: RootState) => state.positionView.position
  );
  const dispatch = useDispatch();

  return (
    <div
      className="h-10 lg:h-full w-full lg:w-20 flex lg:flex-col flex-row bg-[#1f1f1f] justify-between items-center text-zinc-100 text-xs py-10 px-10 lg:px-0"
      data-testid="navbar"
    >
      <div className="flex lg:flex-col items-center justify-center">
        <Link to="/">
          <FaFootballBall className="w-7 h-7 mb-7 mt-7 lg:mt-0 mr-5 lg:mr-0" />
        </Link>
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

      <div className="flex lg:flex-col items-center justify-between gap-10 mb-32 text-lg">
        <Link to="/passing">
          <button
            className={`rounded-full border ${
              positionView === "QB"
                ? "border-white text-white"
                : "border-gray-300 text-gray-300"
            } p-3 cursor-pointer hover:border-white hover:text-white transition`}
            onClick={() => dispatch(getQBView())}
          >
            QB
          </button>
        </Link>
        <Link to="/rushing">
          <button
            className={`rounded-full border ${
              positionView === "RB"
                ? "border-white text-white"
                : "border-gray-300 text-gray-300"
            } p-3 cursor-pointer hover:border-white hover:text-white transition`}
            onClick={() => dispatch(getRBView())}
          >
            RB
          </button>
        </Link>
      </div>

      <div className="flex flex-col justify-end items-center">
        <CiSettings className="w-8 h-8 cursor-pointer" />
      </div>
    </div>
  );
};

export default NavBar;
