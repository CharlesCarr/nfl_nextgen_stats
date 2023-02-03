import { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { setPasserView, setReceiverView, setRusherView } from "../../stores/slices/playerViewSlice";
import { formatInput } from "./utils";

const Search = ({ allPlayers, type, loading }: any) => {
  // state for input field (player name)
  const [inputValue, setInputValue] = useState<string>("");
  const [inputError, setInputError] = useState<boolean>(false);
  const [searchMatches, setSearchMatches] = useState<string[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: any) => {
    const { current: wrap } = wrapperRef;

    if (wrap && !wrap.contains(event.target)) {
      clearInput();
    }
  };

  const handleInput = (value: string) => {
    setInputValue(value);

    const playersArr: string[] = Array.from(allPlayers);

    const filteredPlayers: string[] = playersArr.filter((player: string) => {
      return player.toUpperCase().includes(inputValue.toUpperCase());
    });

    if (value === "") {
      setSearchMatches([]);
    } else {
      setSearchMatches(filteredPlayers);
    }
  };

  const clearInput = () => {
    setInputValue("");
    setSearchMatches([]);
    setInputError(false);
  };

  const submitInput = (input: string) => {
    if (loading) {
      return;
    }

    const formattedInput = formatInput(input);
    setInputValue(formattedInput);

    if (allPlayers.has(formattedInput)) {
      if (type === "passer") {
        dispatch(setPasserView(formattedInput));
      } else if (type === "rusher") {
        dispatch(setRusherView(formattedInput));
      } else {
        dispatch(setReceiverView(formattedInput));
      }
      setInputError(false);
    } else {
      setInputError(true);
    }
  };

  const handleMatchClick = (player: string) => {
    if (type === "passer") {
      dispatch(setPasserView(player));
    } else if (type === "rusher") {
      dispatch(setRusherView(player));
    } else {
      dispatch(setReceiverView(player));
    }

    clearInput();
  };

  return (
    <div className="w-full h-1/2" ref={wrapperRef}>
      <div className="relative flex justify-end items-center sm:pr-4 mb-10 sm:mb-6 lg:mb-0">
        <input
          type="text"
          placeholder="Search"
          className={`w-28 sm:w-32 rounded text-sm sm:text-base mr-4 shadow py-1 pl-3 font-light text-black ${
            inputError ? "border border-red-500" : ""
          }`}
          value={inputValue}
          onChange={(e) => handleInput(e.target.value)}
        />
        <button
          onClick={() => submitInput(inputValue)}
          className="border rounded-lg shadow p-2 bg-[#1f1f1f] text-white"
        >
          <CiSearch className="w-4 h-4 sm:w-6 sm:h-6" />
        </button>

        {searchMatches.length !== 0 && (
          <div className="absolute bg-white text-black border rounded-lg border-black w-52 top-[60px] z-[100] flex-column justify-center items-center max-h-[150px] overflow-hidden overflow-y-auto">
            {searchMatches.map((match: string) => (
              <p
                key={match}
                className="border-b border-black h-10 pl-4 cursor-pointer flex items-center hover:bg-[#0b6241]/60 transition"
                onClick={() => handleMatchClick(match)}
              >
                {match}
              </p>
            ))}
          </div>
        )}
      </div>

      {inputError ? (
        <p className="text-red-500 text-xs">Player Not Found</p>
      ) : null}
    </div>
  );
};

export default Search;
