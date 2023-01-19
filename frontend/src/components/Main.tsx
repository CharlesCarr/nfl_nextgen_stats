import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import DashBottom from "./DashBottom";
import DashTop from "./DashTop";
import Loading from "./Loading";
import NavBar from "./NavBar";

const Main = ({ query, type }: any) => {
  // GET_PASSERS
  const { loading, error, data } = useQuery(query);
  const [players, setPlayers] = useState(null);
  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);
  console.log(loading);
  console.log(error);
  console.log(data);

  useEffect(() => {
    if (data) {
      if (data.hasOwnProperty("passers")) {
        setPlayers(data.passers);
      } else {
        setPlayers(data.rushers);
      }
    }
  }, [data]);

  if (loading && type === "rusher") {
    return (
      <>
      <NavBar />
        <div
          className={`w-full h-full p-12 flex items-center justify-center ${
            darkMode ? "bg-stone-800" : "bg-white"
          }`}
        >
          <Loading />
        </div>
      </>
    );
  }

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
  return (
    <>
      <NavBar />
      <div
        className={`w-full h-full p-10 ${
          darkMode ? "bg-stone-800" : "bg-white"
        }`}
      >
        {!error && (
          <>
            <DashTop data={players} type={type} loading={loading} />
            <DashBottom data={players} type={type} loading={loading} />
          </>
        )}
      </div>
    </>
  );
};

export default Main;
