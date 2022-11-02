import { useEffect, useState } from "react";
import StatsCard from "./StatsCard";
// import NFLNextGen from "../images/nextgen1.jpeg";
import Football from "../images/football-unsplash.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  getWeekView,
  getSeasonView,
  getAllView,
} from "../redux/slices/periodFilterViewSlice";
import { setPlayerView } from "../redux/slices/playerViewSlice";
import { RootState } from "../redux/store";
import { CiSearch } from "react-icons/ci";
import {
  GiAmericanFootballBall,
  GiAmericanFootballHelmet,
  GiAmericanFootballPlayer,
} from "react-icons/gi";
import type {
  PassingData,
  PassPlayer,
  StatCard,
  DashProps,
} from "../types/dataTypes";
import Loading from "./Loading";

const DashTop = ({ allPassingData }: DashProps) => {
  // Redux State:
  const periodFilter = useSelector(
    (state: RootState) => state.periodFilterView
  );
  const playerName = useSelector((state: RootState) => state.playerView.player);
  const dispatch = useDispatch();

  // Local State:
  // state for input field (player name)
  const [inputValue, setInputValue] = useState<string>("");
  const [week, setWeek] = useState<number>(6);
  const [season, setSeason] = useState<number>(2022);
  const [playerData, setPlayerData] = useState<PassPlayer | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [statCardData, setStatCardData] = useState<StatCard[] | null>(null);
  const [allPlayers, setAllPlayers] = useState<any>(null); // this will be a Set
  const [inputError, setInputError] = useState<boolean>(false);

  useEffect(() => {
    if (allPassingData) {
      if (periodFilter.view === "week") {
        // already have so how to get
        getWeekData(playerName, week);
      } else if (periodFilter.view === "season") {
        // grab week 0 for the selected year/season
        getSeasonData(playerName, season);
      } else {
        // all in career - think easiest is to grab all week 0's
        // add passing yards and tds and take the avg of passer rating
        getAllData(playerName);
      }
      // get all unique players (to use for search validation)
      getAllPlayers();
      setIsLoading(false);
    }
  }, [allPassingData, playerName, week, periodFilter]);

  useEffect(() => {
    if (playerData) {
      setStatCardData([
        {
          statName: "Passing Yards",
          statNum: playerData["pass_yards"],
          statIcon: (
            <GiAmericanFootballBall className="w-11 lg:w-14 h-11 lg:h-14 mt-6 mr-4" />
          ),
          statLabel: "yds",
          statKey: "pass_yards",
        },
        {
          statName: "Passing TDs",
          statNum: playerData["pass_touchdowns"],
          statIcon: (
            <GiAmericanFootballHelmet className="w-11 lg:w-14 h-11 lg:h-14 mt-6 mr-4" />
          ),
          statLabel: "TDs",
          statKey: "pass_touchdowns",
        },
        {
          statName: "Passer Rating",
          statNum: Number(playerData["passer_rating"].toFixed(2)),
          statIcon: (
            <GiAmericanFootballPlayer className="w-11 lg:w-14 h-11 lg:h-14 mt-6 mr-4" />
          ),
          statLabel: "RTG",
          statKey: "passer_rating",
        },
      ]);
    }
  }, [playerData]);

  const getWeekData = (playerName: string, week: number) => {
    if (allPassingData) {
      let weekData = allPassingData.filter((d: PassingData) => {
        if (
          d["player_display_name"] === playerName &&
          d.week === week &&
          d.season === 2022
        ) {
          return d;
        } else {
          return null;
        }
      });
      setPlayerData(weekData[0]);
      return weekData[0];
    }
  };

  const getSeasonData = (playerName: string, season: number) => {
    if (allPassingData) {
      let seasonData = allPassingData.filter((d: PassingData) => {
        if (
          d["player_display_name"] === playerName &&
          d.week === 0 &&
          d.season === season
        ) {
          return d;
        } else {
          return null;
        }
      });
      setPlayerData(seasonData[0]);
      return seasonData[0];
    }
  };

  const getAllData = (playerName: string) => {
    if (allPassingData) {
      let allData = allPassingData.filter((d: PassingData) => {
        if (d["player_display_name"] === playerName && d.week === 0) {
          return d;
        } else {
          return null;
        }
      });
      let totalPassY = 0;
      let totalPassTD = 0;
      let totalPassRSum = 0;
      let playerNum = 0;
      let playerTeam = "";

      for (let i = 0; i < allData.length; i++) {
        let data = allData[i];
        totalPassY += data["pass_yards"];
        totalPassTD += data["pass_touchdowns"];
        totalPassRSum += data["passer_rating"];
        playerNum = data["player_jersey_number"];
        playerTeam = data["team_abbr"];
      }

      let playerData: PassPlayer = {
        pass_yards: totalPassY,
        pass_touchdowns: totalPassTD,
        passer_rating: totalPassRSum / allData.length,
        player_jersey_number: playerNum,
        team_abbr: playerTeam,
      };
      setPlayerData(playerData);

      return playerData;
    }
  };

  const getAllPlayers = () => {
    if (allPassingData) {
      const allPlayers = allPassingData.map((data: PassingData) => {
        return data["player_display_name"];
      });
      const uniquePlayers = new Set(allPlayers);
      setAllPlayers(uniquePlayers);
      return uniquePlayers;
    }
  };

  const handleInput = (input: string) => {
    if (allPlayers.has(input)) {
      dispatch(setPlayerView(inputValue));
      setInputError(false);
    } else {
      setInputError(true);
    }
  };

  return (
    <div className="h-1/2 w-full flex justify-between items-center">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-col justify-between items-center h-full w-full lg:w-3/4 mr-0 lg:mr-4 pr-0 lg:pr-3 mb-10 lg:mb-10">
          <div className="flex justify-between items-center h-1/2 w-full mb-5 lg:mb-0">
            <div className="w-1/2 h-full flex flex-col justify-start items-start">
              <p className="text-xl sm:text-2xl lg:text-4xl font-bold tracking-widest mb-2">
                QB SPOTLIGHT
              </p>
              <p className="text-sm lg:text-base font-semibold tracking-wide mb-1">{`${playerName} - #${
                playerData ? playerData["player_jersey_number"] : "Loading..."
              }`}</p>
              <p className="font-light text-xs lg:text-sm">
                {playerData ? playerData["team_abbr"] : "Loading..."}
              </p>
            </div>
            <div className="w-full sm:w-1/3 h-full flex flex-col justify-center items-center">
              <div className="w-full h-1/2 flex justify-end items-center sm:pr-4 mb-10 sm:mb-6 lg:mb-0">
                <input
                  type="text"
                  placeholder="Search"
                  className={`w-28 sm:w-32 rounded text-sm sm:text-base mr-4 shadow py-1 pl-3 font-light text-black ${
                    inputError ? "border border-red-500" : ""
                  }`}
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                />
                <button
                  onClick={() => handleInput(inputValue)}
                  className="border rounded-lg shadow p-2 bg-[#1f1f1f] text-white"
                >
                  <CiSearch className="w-4 h-4 sm:w-6 sm:h-6" />
                </button>
              </div>
              {inputError ? (
                <p className="text-red-500 text-xs">Player Not Found</p>
              ) : null}
              <div className="w-full h-1/2 flex justify-between items-center text-xs pl-10 sm:pl-0 sm:pr-8 lg:pr-0">
                {/* pr-10 pl-24 */}
                <button
                  className={`rounded-xl py-1 px-4 ${
                    periodFilter.view === "week"
                      ? "bg-[#0b6241]/60 text-white "
                      : ""
                  }`}
                  onClick={() => dispatch(getWeekView())}
                >
                  Week
                </button>
                <button
                  className={`rounded-xl py-1 px-4 ${
                    periodFilter.view === "season"
                      ? "bg-[#0b6241]/60 text-white "
                      : ""
                  }`}
                  onClick={() => dispatch(getSeasonView())}
                >
                  Season
                </button>
                <button
                  className={`rounded-xl py-1 px-4 ${
                    periodFilter.view === "all"
                      ? "bg-[#0b6241]/60 text-white "
                      : ""
                  }`}
                  onClick={() => dispatch(getAllView())}
                >
                  All
                </button>
              </div>
            </div>
          </div>
          {statCardData ? (
            <div className="grid grid-col-1 sm:grid-cols-3 gap-y-2 sm:gap-y-0 gap-x-3 h-2/3 w-full mt-px">
              {statCardData.map((d: StatCard, index: number) => {
                return (
                  <StatsCard
                    key={index}
                    statName={d.statName}
                    statNum={d.statNum}
                    statIcon={d.statIcon}
                    statLabel={d.statLabel}
                    statKey={d.statKey}
                  />
                );
              })}
            </div>
          ) : (
            <Loading />
          )}
        </div>
      )}

      <div className="lg:flex justify-center items-center h-full w-1/4 rounded-2xl shadow hidden">
        <img
          src={Football}
          alt="football"
          className="object-cover h-full w-full rounded-2xl shadow brightness-90"
        />
      </div>
    </div>
  );
};

export default DashTop;
