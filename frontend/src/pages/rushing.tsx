import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PlayerStats from "../components/player-stats";
import { ChartContainer } from "../features/chart/chart-container";
import Leaderboard from "../features/leaderboard/leaderboard";
import { ErrorStatus } from "../features/ui/error-status";
import DashLayout from "../layouts/dash-layout";
import { GET_RUSHERS } from "../services/queries/rusher-queries";
import { RootState } from "../stores/store";

const Rushing = () => {
  // GET_RUSHERS
  const { loading, error, data } = useQuery(GET_RUSHERS);
  const [players, setPlayers] = useState(null);
  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);

  useEffect(() => {
    if (data) {
      setPlayers(data.rushers);
    }
  }, [data]);

  // refactor later!
  const type = "rusher";

  if (!loading && error) return <ErrorStatus />;

  return (
    <>
      <DashLayout darkMode={darkMode}>
        {!error && (
          <>
            {/* Top Half of Dashboard */}
            <PlayerStats data={players} type={type} loading={loading} />

            {/* Bottom Half of Dashboard */}
            <div className="w-full h-1/2 flex flex-col lg:flex-row justify-between items-center mt-2">
              {/* Bottom Left */}
              <ChartContainer type={type} data={players} />
              {/* Bottom Right */}
              <Leaderboard type={type} data={players} />
            </div>
          </>
        )}
      </DashLayout>
    </>
  );
};

export default Rushing;
