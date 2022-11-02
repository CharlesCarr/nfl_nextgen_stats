import useFetchData from "./hooks/useFetchData";
import NavBar from "./components/NavBar";
import DashTop from "./components/DashTop";
import DashBottom from "./components/DashBottom";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import Loading from "./components/Loading";

const App = () => {
  const { data, loading, error } = useFetchData();
  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);

  let conditionalContent;

  if (loading) {
    conditionalContent = (
      <div className={`w-full h-full p-12 flex items-center justify-center ${darkMode ? ("bg-stone-800") : ("bg-white")}`}>
        <Loading />
      </div>
    );
  } else if (!loading && !error) {
    conditionalContent = (
      <div className={`w-full h-full p-10 ${darkMode ? ("bg-stone-800") : ("bg-white")}`}>
          <DashTop allPassingData={data} />
          <DashBottom allPassingData={data} />
        </div>
    )
  } else if (!loading && error) {
    conditionalContent = (
      <div className={`w-full h-full p-12 flex items-center justify-center ${darkMode ? ("bg-stone-800") : ("bg-white")}`}>
        <p className="text-2xl">{error}</p>
      </div>
    )
  }

  return (
    <div className={`flex flex-col lg:flex-row h-full lg:h-screen w-full font-montserrat ${darkMode ? ("text-white") : ("text-[#1f1f1f]")} `}>
      <NavBar />
      {conditionalContent}
    </div>
  );
};

export default App;
