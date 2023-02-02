import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DashTop from "../components/DashTop";
import { ChartContainer } from "../features/chart/chart-container";
import Leaderboard from "../features/leaderboard/leaderboard";
import DashLayout from "../layouts/DashLayout";
import { GET_PASSERS } from "../services/queries/passerQueries";
import { RootState } from "../stores/store";

const PassPage = () => {
  // GET_PASSERS
  const { loading, error, data } = useQuery(GET_PASSERS);
  const [players, setPlayers] = useState(null);
  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);

  useEffect(() => {
    if (data) {
      setPlayers(data.passers);
    }
  }, [data]);

  if (!loading && error) {
    return (
      <div
        className={`w-full h-full p-12 flex items-center justify-center ${
          darkMode ? "bg-stone-800" : "bg-white"
        }`}
      >
        <p className="text-2xl">An error has occurred...</p>
      </div>
    );
  }

  const type = "passer";

  return (
    <>
      <DashLayout darkMode={darkMode}>
        {!error && (
          <>
            {/* Top Half of Dashboard */}
            <DashTop data={players} type={type} loading={loading} />

            {/* Bottom Half of Dashboard */}
            {/* <DashBottom data={players} type={type} loading={loading} /> */}
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

export default PassPage;
