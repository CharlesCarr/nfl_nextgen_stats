import { useEffect, useState } from "react";
import StatsCard from "./stats-card";
import { useSelector } from "react-redux";
import {
  getWeekView,
  getSeasonView,
  getAllView,
} from "../../stores/slices/periodFilterViewSlice";
import { RootState } from "../../stores/store";
import {
  GiAmericanFootballBall,
  GiAmericanFootballHelmet,
  GiAmericanFootballPlayer,
} from "react-icons/gi";
import type { StatCard, DashProps } from "../../types/dataTypes";
import Loading from "../ui/Loading";
import Search from "../search/search";
import DashTitle from "../ui/dash-title";
import { PlayerInfo } from "./player-info";
import { FilterButton } from "./filter-button";
import { FieldImgContainer } from "../ui/field-img-container";
import { getAllData, getAllPlayers, getSeasonData, getWeekData } from "./utils";

const PlayerStats = ({ data, type, loading }: DashProps) => {
  const periodFilter = useSelector((state: RootState) => state.periodFilterView);
  const playerName = useSelector((state: RootState) => state.playerView[type]);
  // hardcoded
  const [week] = useState<number>(16);
  const [season] = useState<number>(2022);
  // PassPlayer | RushPlayer | null - this is what it should be but have errs, figure out later
  const [playerData, setPlayerData] = useState<any>(null);
  const [statCardData, setStatCardData] = useState<StatCard[]>([
    {
      statName: "Passing Yards",
      statNum: <Loading />,
      statIcon: (
        <GiAmericanFootballBall className="w-11 lg:w-14 h-11 lg:h-14 mt-6 mr-4" />
      ),
      statLabel: "yds",
      statKey: "pass_yards",
      type: "passer",
    },
    {
      statName: "Passing TDs",
      statNum: <Loading />,
      statIcon: (
        <GiAmericanFootballHelmet className="w-11 lg:w-14 h-11 lg:h-14 mt-6 mr-4" />
      ),
      statLabel: "TDs",
      statKey: "pass_touchdowns",
      type: "passer",
    },
    {
      statName: "Passer Rating",
      statNum: <Loading />,
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
        setPlayerData(getWeekData(data, playerName, week));
      } else if (periodFilter.view === "season") {
        // grab week 0 for the selected year/season
        setPlayerData(getSeasonData(data, playerName, season));
      } else {
        // all in career - think easiest is to grab all week 0's
        // add passing yards and tds and take the avg of passer rating
        setPlayerData(getAllData(data, playerName, type));
      }
      // get all unique players (to use for search validation)
      setAllPlayers(getAllPlayers(data));
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

  const timelineFilters = [
    {
      timeline: "Week",
      dataFn: getWeekView,
    },
    {
      timeline: "Season",
      dataFn: getSeasonView,
    },
    {
      timeline: "All",
      dataFn: getAllView,
    },
  ];

  return (
    <div className="h-1/2 w-full flex justify-between items-center">
      <div className="flex flex-col justify-between items-center h-full w-full lg:w-3/4 mr-0 lg:mr-4 pr-0 lg:pr-3 mb-10 lg:mb-10">
        <div className="flex justify-between items-center h-1/2 w-full mb-5 lg:mb-0">
          <div className="w-1/2 h-full flex flex-col justify-start items-start">
            <DashTitle type={type} />
            <PlayerInfo
              playerData={playerData}
              playerName={playerName}
              loading={loading}
            />
          </div>
          <div className="w-full sm:w-1/3 h-full flex flex-col justify-center items-center">
            <Search allPlayers={allPlayers} type={type} loading={loading} />
            <div className="w-full h-1/2 flex justify-between items-center text-xs pl-10 sm:pl-0 sm:pr-8 lg:pr-0">
              {/* pr-10 pl-24 */}
              {timelineFilters.map((timeline: any) => {
                return (
                  <FilterButton
                    key={timeline.timeline}
                    timeline={timeline}
                    periodFilter
                  />
                );
              })}
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

      <FieldImgContainer />
    </div>
  );
};

export default PlayerStats;
