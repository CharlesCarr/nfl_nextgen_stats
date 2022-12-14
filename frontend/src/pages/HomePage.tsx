import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Link } from "react-router-dom";
import { getQBView, getRBView } from "../redux/slices/positionViewSlice";

const HomePage = () => {
  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);
  const dispatch = useDispatch();

  return (
    <div
      className={`w-full flex flex-col justify-start items-center p-20 ${
        darkMode ? "bg-stone-800" : "bg-white"
      }`}
    >
      <h1 className="text-4xl mb-16">
        Welcome to the NFL Next Gen Stats Dashboard
      </h1>

      <div className="flex flex-col justify-start items-center h-1/2 w-1/2 border rounded-xl p-10">
        <p className="mb-10 text-2xl">Select Position to View Stats</p>

        <div className="flex justify-center items-center gap-10">
          <Link to="/passing">
            <button
              className="border rounded-xl py-2 px-6"
              onClick={() => dispatch(getQBView())}
            >
              QB
            </button>
          </Link>
          <Link to="/rushing">
            <button
              className="border rounded-xl py-2 px-6"
              onClick={() => dispatch(getRBView())}
            >
              RB
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
