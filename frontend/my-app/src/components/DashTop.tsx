import { useEffect, useState } from "react";
import StatsCard from "./StatsCard";
// import NFLNextGen from "../images/nextgen1.jpeg";

const DashTop = ({ allPassingData }: any) => {
  // state for input field (player name)
  const [playerName, setPlayerName] = useState<string>("Josh Allen");
  const [week, setWeek] = useState<number>(6);
  const [playerWeekData, setPlayerWeekData] = useState<any>(null);
  console.log(playerWeekData);
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
  const [periodFilter, setPeriodFilter] = useState<string>('week');

  // console.log(allPassingData);

  useEffect(() => {
    const getLatestWeekData = (playerName: string, week: number) => {
      let playerData = allPassingData.filter((d: any) => {
        if (
          d["player_display_name"] === playerName &&
          d.week === week &&
          d.season === 2022
        ) {
          return d;
        }
      });
      return playerData[0];
    };

    if (allPassingData) {
      setPlayerWeekData(getLatestWeekData(playerName, week));

      setIsLoading(false);
    }
  }, [allPassingData, playerName, week]);

  useEffect(() => {
    if (playerWeekData) {
      setStatCardData([
        {
          statName: "Passing Yards",
          statNum: playerWeekData["pass_yards"],
          statIcon: "icon",
          statChange: "change",
        },
        {
          statName: "Passing TDs",
          statNum: playerWeekData["pass_touchdowns"],
          statIcon: "icon",
          statChange: "change",
        },
        {
          statName: "Passer Rating",
          statNum: playerWeekData["passer_rating"].toFixed(2),
          statIcon: "icon",
          statChange: "change",
        },
      ]);
    }
  }, [playerWeekData]);

  useEffect(() => {

    if (periodFilter === "week") {
      // already have so how to get
    } else if (periodFilter === "season") {
      // grab week 0 for the selected year/season
    } else {
      // all in career - think easiest is to grab all week 0's
      // add passing yards and tds and take the avg of passer rating
    }

  }, [periodFilter])

  return (
    <div className="h-1/2 w-full flex justify-between items-center">
      <div className="flex flex-col justify-between items-center h-full w-3/4 mr-4 pr-3">
        <div className="flex justify-between items-center h-1/2 w-full">
          <div className="w-1/2 h-full flex flex-col justify-start items-start">
            <p className="text-3xl font-bold tracking-widest mb-2">
              QB SPOTLIGHT
            </p>
            {/* <p className="font-semibold tracking-wide mb-1">{`${playerName} - #${playerWeekData["player_jersey_number"] || 17}`}</p> */}
            <p className="font-semibold tracking-wide mb-1">{`${playerName} - #17`}</p>
            {/* <p className="font-light text-sm">{playerWeekData["team_abbr"] || 'BUF'}</p> */}
            <p className="font-light text-sm">BUF</p>
          </div>
          <div className="w-1/3 h-full flex flex-col justify-center items-center">
            <div className="w-full h-1/2 flex justify-end items-center pr-4">
              <input
                placeholder="(Icon) Search"
                className="w-32 rounded text-sm mr-4 shadow py-px pl-2"
              />
              <p>Icon</p>
            </div>
            <div className="w-full h-1/2 flex justify-between items-center pr-10 pl-24 text-xs">
              <button className="bg-black text-white rounded-xl py-1 px-4" onClick={() => setPeriodFilter('week')}>Week</button>
              <button onClick={() => setPeriodFilter('season')}>Season</button>
              <button onClick={() => setPeriodFilter('all')}>All</button>
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
      <div className="flex justify-center items-center border border-black h-full w-1/4 rounded-2xl">
        Image
      </div>
    </div>
  );
};

export default DashTop;
