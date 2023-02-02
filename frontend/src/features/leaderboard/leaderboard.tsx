import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";
import {
  LeaderboardProps,
  PassingData,
  RushingData,
} from "../../types/dataTypes";
import Loading from "../ui/Loading";
import Leaders from "./Leaders";
import { getLeaders } from "./utils";

export default function Leaderboard({ type, data }: LeaderboardProps) {
  const playerName = useSelector((state: RootState) => state.playerView[type]);
  const statFilter = useSelector((state: RootState) => state.statFilterView[type]);
  const positionView = useSelector((state: RootState) => state.positionView.position);

  const [leadersData, setLeadersData] = useState<PassingData[] | RushingData[] | null>(null);

  useEffect(() => {
    if (data) {
      setLeadersData(getLeaders(statFilter.key, data));
    }
  }, [data, playerName, statFilter, positionView]);

  return (
    <div className="flex flex-col justify-between items-center h-full w-full sm:w-1/2 lg:w-1/4">
      <div className="w-full h-1/5 flex flex-col items-start justify-center pl-4 font-medium mb-4 sm:mb-0">
        <p className="font-semibold mb-2 sm:mb-0">{`Top ${
          type === "passer" ? "QB" : "RB"
        }s for ${statFilter.name}`}</p>
        <p className="font-extralight text-xs">(2022 Season)</p>
      </div>

      <div className="w-full h-4/5 flex flex-col items-center justify-between">
        {leadersData ? (
          leadersData.map((d: any, index: number) => {
            return (
              <Leaders
                key={index}
                index={index}
                name={d["player_display_name"]}
                team={d["team_abbr"]}
                stat={d[statFilter.key]}
                type={type}
              />
            );
          })
        ) : (
          <div className="pt-10">
            <Loading />
          </div>
        )}
      </div>
    </div>
  );
}
