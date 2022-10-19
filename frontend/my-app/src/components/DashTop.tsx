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
import { GiAmericanFootballBall, GiAmericanFootballHelmet, GiAmericanFootballPlayer } from "react-icons/gi";


const DashTop = ({ allPassingData }: any) => {
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
  const [playerData, setPlayerData] = useState<any>(null);
  console.log(playerData);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [statCardData, setStatCardData] = useState<any>([
    {
      statName: "Loading",
      statNum: "Loading",
      statIcon: "Loading",
      statChange: "Loading",
    },
    {
      statName: "Loading",
      statNum: "Loading",
      statIcon: "Loading",
      statChange: "Loading",
    },
    {
      statName: "Loading",
      statNum: "Loading",
      statIcon: "Loading",
      statChange: "Loading",
    },
  ]);

  useEffect(() => {
    if (allPassingData) {
      if (periodFilter.view === "week") {
        // already have so how to get
        setPlayerData(getWeekData(playerName, week));
      } else if (periodFilter.view === "season") {
        // grab week 0 for the selected year/season
        setPlayerData(getSeasonData(playerName, season));
      } else {
        // all in career - think easiest is to grab all week 0's
        // add passing yards and tds and take the avg of passer rating
        setPlayerData(getAllData(playerName));
      }

      setIsLoading(false);
    }
  }, [allPassingData, playerName, week, periodFilter]);

  useEffect(() => {
    if (playerData) {
      setStatCardData([
        {
          statName: "Passing Yards",
          statNum: playerData["pass_yards"],
          statIcon: <GiAmericanFootballBall className="w-14 h-14 mt-6 mr-4" />,
          statChange: "yards",
        },
        {
          statName: "Passing TDs",
          statNum: playerData["pass_touchdowns"],
          statIcon: <GiAmericanFootballHelmet className="w-14 h-14 mt-6 mr-4" />,
          statChange: "TDs",
        },
        {
          statName: "Passer Rating",
          statNum: playerData["passer_rating"].toFixed(2),
          statIcon: <GiAmericanFootballPlayer className="w-14 h-14 mt-6 mr-4" />,
          statChange: "RTG",
        },
      ]);
    }
  }, [playerData]);

  const getWeekData = (playerName: string, week: number) => {
    let weekData = allPassingData.filter((d: any) => {
      if (
        d["player_display_name"] === playerName &&
        d.week === week &&
        d.season === 2022
      ) {
        return d;
      }
    });
    return weekData[0];
  };

  const getSeasonData = (playerName: string, season: number) => {
    let seasonData = allPassingData.filter((d: any) => {
      if (
        d["player_display_name"] === playerName &&
        d.week === 0 &&
        d.season === season
      ) {
        return d;
      }
    });
    return seasonData[0];
  };

  const getAllData = (playerName: string) => {
    let allData = allPassingData.filter((d: any) => {
      if (d["player_display_name"] === playerName && d.week === 0) {
        return d;
      }
    });
    let totalPassY = 0;
    let totalPassTD = 0;
    let totalPassRSum = 0;

    for (let i = 0; i < allData.length; i++) {
      let data = allData[i];
      totalPassY += data["pass_yards"];
      totalPassTD += data["pass_touchdowns"];
      totalPassRSum += data["passer_rating"];
    }
    // console.log(allData);
    return {
      pass_yards: totalPassY,
      pass_touchdowns: totalPassTD,
      passer_rating: totalPassRSum / allData.length,
    };
  };

  return (
    <div className="h-1/2 w-full flex justify-between items-center">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col justify-between items-center h-full w-3/4 mr-4 pr-3">
          <div className="flex justify-between items-center h-1/2 w-full">
            <div className="w-1/2 h-full flex flex-col justify-start items-start">
              <p className="text-4xl font-bold tracking-widest mb-2">
                QB SPOTLIGHT
              </p>
              <p className="font-semibold tracking-wide mb-1">{`${playerName} - #${playerData["player_jersey_number"]}`}</p>
              <p className="font-light text-sm">{playerData["team_abbr"]}</p>
            </div>
            <div className="w-1/3 h-full flex flex-col justify-center items-center">
              <div className="w-full h-1/2 flex justify-end items-center pr-4">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-32 rounded text-md mr-4 shadow py-1 pl-3 font-light"
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                />
                <button
                  onClick={() => dispatch(setPlayerView(inputValue))}
                  className="border rounded-lg shadow p-2 bg-[#1f1f1f] text-white"
                >
                  <CiSearch className="w-6 h-6"/>
                </button>
              </div>
              <div className="w-full h-1/2 flex justify-between items-center pr-10 pl-24 text-xs">
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
          <div className="grid grid-cols-3 gap-x-3 h-2/3 w-full">
            {statCardData.map((d: any, index: any) => {
              return (
                <StatsCard
                  key={index}
                  statName={d.statName}
                  statNum={d.statNum}
                  statIcon={d.statIcon}
                  statChange={d.statChange}
                />
              );
            })}
          </div>
        </div>
      )}

      <div className="flex justify-center items-center h-full w-1/4 rounded-2xl shadow">
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
