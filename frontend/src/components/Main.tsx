import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GET_PASSERS } from "../queries/passerQueries";
import { RootState } from "../redux/store";
import DashBottom from "./DashBottom";
import DashTop from "./DashTop";
import Loading from "./Loading";

const Main = () => {
  const { loading, error, data } = useQuery(GET_PASSERS);
  console.log(loading);
  console.log(error);
  console.log(data);
  const [passers, setPassers] = useState(null);
  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);

  useEffect(() => {
    if (data) {
      setPassers(data.passers);
    }
  }, [data]);

  if (loading) {
    return (
      <div
        className={`w-full h-full p-12 flex items-center justify-center ${
          darkMode ? "bg-stone-800" : "bg-white"
        }`}
      >
        <Loading />
      </div>
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
    <div
      className={`w-full h-full p-10 ${darkMode ? "bg-stone-800" : "bg-white"}`}
    >
      {!loading && !error && (
        <>
          <DashTop allPassingData={passers} />
          <DashBottom allPassingData={passers} />
        </>
      )}
    </div>
  );
};

export default Main;
