import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DashTop from "../features/player-stats/player-stats";
import DashLayout from "../layouts/dash-layout";
import { GET_RUSHERS } from "../services/queries/rusherQueries";
import { RootState } from "../stores/store";
import { ErrorStatus } from "../features/ui/error-status";
import { ChartContainer } from "../features/chart/chart-container";
import Leaderboard from "../features/leaderboard/leaderboard";

const RushPage = () => {
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
            <DashTop data={players} type={type} loading={loading} />

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

export default RushPage;
