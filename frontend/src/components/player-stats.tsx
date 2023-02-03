import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getWeekView,
  getSeasonView,
  getAllView,
} from "../stores/slices/periodFilterViewSlice";
import { RootState } from "../stores/store";
import {
  GiAmericanFootballBall,
  GiAmericanFootballHelmet,
  GiAmericanFootballPlayer,
} from "react-icons/gi";
import type { DashProps } from "../types/dataTypes";
import DashTitle from "../features/ui/dash-title";
import { PlayerInfo } from "../features/ui/player-info";
import { FieldImgContainer } from "../features/ui/field-img-container";
import { getAllData, getAllPlayers, getSeasonData, getWeekData } from "./utils";
import Search from "../features/search/search";
import { FilterList } from "../features/filter/filter-list";
import { TimelineFilter } from "../features/filter/types";
import { StatsCardList } from "../features/stats-card/stats-card-list";
import { StatCard } from "../features/stats-card/types";

const PlayerStats = ({ data, type, loading }: DashProps) => {
  const positionView = useSelector((state: RootState) => state.positionView);
  const periodFilter = useSelector(
    (state: RootState) => state.periodFilterView
  );
  const playerName = useSelector((state: RootState) => state.playerView[type]);
  // hardcoded
  const [week] = useState<number>(20);
  const [season] = useState<number>(2022);
  // PassPlayer | RushPlayer | null - this is what it should be but have errs, figure out later
  const [playerData, setPlayerData] = useState<any>(null);
  const [statCardData, setStatCardData] = useState<StatCard[]>([
    {
      statName: null,
      statNum: null,
      statIcon: null,
      statLabel: null,
      statKey: null,
      type: "passer",
      loading: true,
    },
    {
      statName: null,
      statNum: null,
      statIcon: null,
      statLabel: null,
      statKey: null,
      type: "passer",
      loading: true,
    },
    {
      statName: null,
      statNum: null,
      statIcon: null,
      statLabel: null,
      statKey: null,
      type: "passer",
      loading: true,
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
  }, [data, playerName, week, season, periodFilter, type]);

  useEffect(() => {
    if (playerData) {
      if (positionView.position === "WR/TE") {
        setStatCardData([
          {
            statName: "Receiving Yards",
            statNum: playerData["yards"],
            statIcon: (
              <GiAmericanFootballBall className="w-11 lg:w-14 h-11 lg:h-14 mt-6 mr-4" />
            ),
            statLabel: "yds",
            statKey: "yards",
            type: "receiver",
            loading: false,
          },
          {
            statName: "Receiving TDs",
            statNum: playerData["rec_touchdowns"],
            statIcon: (
              <GiAmericanFootballHelmet className="w-11 lg:w-14 h-11 lg:h-14 mt-6 mr-4" />
            ),
            statLabel: "TDs",
            statKey: "rec_touchdowns",
            type: "receiver",
            loading: false,
          },
          {
            statName: "Receptions",
            statNum: playerData["receptions"],
            statIcon: (
              <GiAmericanFootballPlayer className="w-11 lg:w-14 h-11 lg:h-14 mt-6 mr-4" />
            ),
            statLabel: "rec",
            statKey: "receptions",
            type: "receiver",
            loading: false,
          },
        ]);
      } else if (positionView.position === "RB") {
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
            loading: false,
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
            loading: false,
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
            loading: false,
          },
        ]);
      } else {
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
            loading: false,
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
            loading: false,
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
            loading: false,
          },
        ]);
      }
    }
  }, [playerData, type, positionView]);

  const timelineFilters: TimelineFilter[] = [
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
            <FilterList timelineFilters={timelineFilters} />
          </div>
        </div>
        <StatsCardList
          statCardData={statCardData}
          type={type}
          loading={loading}
        />
      </div>
      <FieldImgContainer />
    </div>
  );
};

export default PlayerStats;
