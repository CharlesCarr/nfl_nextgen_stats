import { PassingData, RushingData } from "../../types/types";
import { filter } from "lodash";

export const getLeaders = (stat: string, data: PassingData[] | RushingData[]) => {
  let allPlayers: any = filter(data, (d: PassingData | RushingData) => {
    if (d.week === 0 && d.season === 2022) {
      return d;
    } else {
      return null;
    }
  });
  allPlayers.sort((a: any, b: any) => {
    // PassingData, PassingData
    return b[stat] - a[stat];
  });
  let topThree = allPlayers.slice(0, 3);
//   setLeadersData(topThree);
  return topThree;
};
