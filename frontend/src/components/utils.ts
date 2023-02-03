import { filter } from "lodash";
import { playerViewState } from "../stores/slices/playerViewSlice";
import { PassingData, PassPlayer, ReceivingData, RecPlayer, RushingData, RushPlayer } from "../types/types";

export const getWeekData = (
  data: PassingData[] | RushingData[] | ReceivingData[],
  playerName: string,
  week: number
) => {
  // checking with 'any' for now after adding lodash approach b/c of union typeScript bug
  let weekData: any = filter(
    data,
    (d: PassingData | RushingData | ReceivingData) => {
      if (
        d["player_display_name"] === playerName &&
        d.week === week &&
        d.season === 2022
      ) {
        return d;
      } else {
        return null;
      }
    }
  );
  return weekData[0];
};

export const getSeasonData = (
  data: PassingData[] | RushingData[] | ReceivingData[],
  playerName: string,
  season: number
) => {
  let seasonData: any = filter(
    data,
    (d: PassingData | RushingData | ReceivingData) => {
      if (
        d["player_display_name"] === playerName &&
        d.week === 0 &&
        d.season === season
      ) {
        return d;
      } else {
        return null;
      }
    }
  );
  return seasonData[0];
};

export const getAllData = (
  data: PassingData[] | RushingData[] | ReceivingData[],
  playerName: string,
  type: keyof playerViewState
) => {
  let allData: any = filter(
    data,
    (d: PassingData | RushingData | ReceivingData) => {
      if (d["player_display_name"] === playerName && d.week === 0) {
        return d;
      } else {
        return null;
      }
    }
  );
  let totalPassY = 0;
  let totalPassTD = 0;
  let totalPassRSum = 0;
  let totalRushY = 0;
  let totalRushTD = 0;
  let totalAvgRushY = 0;
  let totalRecY = 0;
  let totalRecTD = 0;
  let totalRec = 0;
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
    return playerData;
  } else if (type === "rusher") {
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
    return playerData;
  } else {
    for (let i = 0; i < allData.length; i++) {
      let data = allData[i];
      totalRecY += data["rec_yards"];
      totalRecTD += data["rec_touchdowns"];
      totalRec += data["receptions"];
      playerNum = data["player_jersey_number"];
      playerTeam = data["team_abbr"];
    }

    let playerData: RecPlayer = {
      rec_yards: totalRecY,
      rec_touchdowns: totalRecTD,
      receptions: totalRec,
      player_jersey_number: playerNum,
      team_abbr: playerTeam,
    };
    return playerData;
  }
};

export const getAllPlayers = (
  data: PassingData[] | RushingData[] | ReceivingData[]
) => {
  const allPlayers = data.map(
    (data: PassingData | RushingData | ReceivingData) => {
      return data["player_display_name"];
    }
  );
  const uniquePlayers = new Set(allPlayers);
  return uniquePlayers;
};
