import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DashBottom from "../components/DashBottom";
import DashTop from "../components/DashTop";
import DashLayout from "../components/layout/DashLayout";
import { GET_RUSHERS } from "../queries/rusherQueries";
import { RootState } from "../redux/store";

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

  if (loading) return <p className="text-black">Loading..</p>;

  const type = "rusher";

  return (
    <>
      <DashLayout darkMode={darkMode}>
        {!error && (
          <>
            <DashTop data={players} type={type} loading={loading} />
            <DashBottom data={players} type={type} loading={loading} />
          </>
        )}
      </DashLayout>
    </>
  );
};

export default RushPage;
