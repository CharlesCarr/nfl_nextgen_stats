import { useEffect, useState } from "react";
import StatsCard from "./StatsCard";
import Football from "../images/football-unsplash.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  getWeekView,
  getSeasonView,
  getAllView,
} from "../redux/slices/periodFilterViewSlice";
import { RootState } from "../redux/store";
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
  RushingData,
  RushPlayer,
} from "../types/dataTypes";
import Loading from "./Loading";
import Search from "./Search";
import { filter } from "lodash";

const DashTop = ({ data, type, loading }: DashProps) => {
  // Redux State:
  const periodFilter = useSelector(
    (state: RootState) => state.periodFilterView
  );
  const playerName = useSelector((state: RootState) => state.playerView[type]);
  const dispatch = useDispatch();

  // Local State:
  // hardcoded
  const [week] = useState<number>(16);
  const [season] = useState<number>(2022);
  // PassPlayer | RushPlayer | null - this is what it should be but have errs, figure out later
  const [playerData, setPlayerData] = useState<any>(null);
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  const [statCardData, setStatCardData] = useState<StatCard[]>([
    {
      statName: "Passing Yards",
      statNum: "Loading...",
      statIcon: (
        <GiAmericanFootballBall className="w-11 lg:w-14 h-11 lg:h-14 mt-6 mr-4" />
      ),
      statLabel: "yds",
      statKey: "pass_yards",
      type: "passer",
    },
    {
      statName: "Passing TDs",
      statNum: "Loading...",
      statIcon: (
        <GiAmericanFootballHelmet className="w-11 lg:w-14 h-11 lg:h-14 mt-6 mr-4" />
      ),
      statLabel: "TDs",
      statKey: "pass_touchdowns",
      type: "passer",
    },
    {
      statName: "Passer Rating",
      statNum: "Loading...",
      statIcon: (
        <GiAmericanFootballPlayer className="w-11 lg:w-14 h-11 lg:h-14 mt-6 mr-4" />
      ),
      statLabel: "RTG",
      statKey: "passer_rating",
      type: "passer",
    },
  ]);
  const [allPlayers, setAllPlayers] = useState<any>(null); // this will be a Set

  useEffect(() => {
    if (data) {
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
      // setIsLoading(false);
    }
  }, [data, playerName, week, season, periodFilter]);

  useEffect(() => {
    if (playerData) {
      if (type === "passer") {
        setStatCardData([
          {
            statName: "Passing Yards",
            statNum: playerData["pass_yards"],
            statIcon: (
              <GiAmericanFootballBall className="w-11 lg:w-14 h-11 lg:h-14 mt-6 mr-4" />
            ),
            statLabel: "yds",
            statKey: "pass_yards",
            type: "passer",
          },
          {
            statName: "Passing TDs",
            statNum: playerData["pass_touchdowns"],
            statIcon: (
              <GiAmericanFootballHelmet className="w-11 lg:w-14 h-11 lg:h-14 mt-6 mr-4" />
            ),
            statLabel: "TDs",
            statKey: "pass_touchdowns",
            type: "passer",
          },
          {
            statName: "Passer Rating",
            statNum: Number(playerData["passer_rating"].toFixed(2)),
            statIcon: (
              <GiAmericanFootballPlayer className="w-11 lg:w-14 h-11 lg:h-14 mt-6 mr-4" />
            ),
            statLabel: "RTG",
            statKey: "passer_rating",
            type: "passer",
          },
        ]);
      } else {
        setStatCardData([
          {
            statName: "Rushing Yards",
            statNum: playerData ? playerData["rush_yards"] : "loading...",
            statIcon: (
              <GiAmericanFootballBall className="w-11 lg:w-14 h-11 lg:h-14 mt-6 mr-4" />
            ),
            statLabel: "yds",
            statKey: "rush_yards",
            type: "rusher",
          },
          {
            statName: "Rushing TDs",
            statNum: playerData["rush_touchdowns"],
            statIcon: (
              <GiAmericanFootballHelmet className="w-11 lg:w-14 h-11 lg:h-14 mt-6 mr-4" />
            ),
            statLabel: "TDs",
            statKey: "rush_touchdowns",
            type: "rusher",
          },
          {
            statName: "Avg Rush Yards",
            statNum: Number(playerData["avg_rush_yards"].toFixed(2)),
            statIcon: (
              <GiAmericanFootballPlayer className="w-11 lg:w-14 h-11 lg:h-14 mt-6 mr-4" />
            ),
            statLabel: "yds",
            statKey: "avg_rush_yards",
            type: "rusher",
          },
        ]);
      }
    }
  }, [playerData]);

  const getWeekData = (playerName: string, week: number) => {
    if (data) {
      // let weekData = data.filter((d: PassingData | RushingData ) => {
      // checking with 'any' for now after adding lodash approach b/c of union typeScript bug
      let weekData: any = filter(data, (d: PassingData | RushingData) => {
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
    if (data) {
      // let seasonData = data.filter((d: PassingData | RushingData) => {
      let seasonData: any = filter(data, (d: PassingData | RushingData) => {
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
    if (data) {
      // let allData = data.filter((d: PassingData | RushingData) => {
      let allData: any = filter(data, (d: PassingData | RushingData) => {
        if (d["player_display_name"] === playerName && d.week === 0) {
          return d;
        } else {
          return null;
        }
      });
      let totalPassY = 0;
      let totalPassTD = 0;
      let totalPassRSum = 0;
      let totalRushY = 0;
      let totalRushTD = 0;
      let totalAvgRushY = 0;
      let playerNum = 0;
      let playerTeam = "";

      if (type === "passer") {
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
      } else {
        for (let i = 0; i < allData.length; i++) {
          let data = allData[i];
          totalRushY += data["rush_yards"];
          totalRushTD += data["rush_touchdowns"];
          totalAvgRushY += data["avg_rush_yards"];
          playerNum = data["player_jersey_number"];
          playerTeam = data["team_abbr"];
        }

        let playerData: RushPlayer = {
          rush_yards: totalRushY,
          rush_touchdowns: totalRushTD,
          avg_rush_yards: totalAvgRushY / allData.length,
          player_jersey_number: playerNum,
          team_abbr: playerTeam,
        };
        setPlayerData(playerData);
      }

      return playerData;
    }
  };

  const getAllPlayers = () => {
    if (data) {
      const allPlayers = data.map((data: PassingData | RushingData) => {
        return data["player_display_name"];
      });
      const uniquePlayers = new Set(allPlayers);
      setAllPlayers(uniquePlayers);
      return uniquePlayers;
    }
  };

  return (
    <div className="h-1/2 w-full flex justify-between items-center">
      <div className="flex flex-col justify-between items-center h-full w-full lg:w-3/4 mr-0 lg:mr-4 pr-0 lg:pr-3 mb-10 lg:mb-10">
        <div className="flex justify-between items-center h-1/2 w-full mb-5 lg:mb-0">
          <div className="w-1/2 h-full flex flex-col justify-start items-start">
            <p className="text-xl sm:text-2xl lg:text-4xl font-bold tracking-widest mb-2">
              {type === "passer" ? "QB" : "RB"} SPOTLIGHT
            </p>
            <p className="text-sm lg:text-base font-semibold tracking-wide mb-1">{`${playerName} - #${
              !loading && playerData ? playerData["player_jersey_number"] : ""
            }`}</p>
            <p className="font-light text-xs lg:text-sm">
              {!loading && playerData ? playerData["team_abbr"] : ""}
            </p>
          </div>
          <div className="w-full sm:w-1/3 h-full flex flex-col justify-center items-center">
            <Search allPlayers={allPlayers} type={type} loading={loading} />
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
                type={type}
              />
            );
          })}
        </div>
      </div>

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
