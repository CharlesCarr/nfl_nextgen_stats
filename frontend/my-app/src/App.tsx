import useFetchData from "./utilities/hooks/useFetchData";
import NavBar from "./components/NavBar";
import DashTop from "./components/DashTop";
import DashBottom from "./components/DashBottom";

const App = () => {
  const { data, loading, error } = useFetchData();

  let conditionalContent;

  if (loading) {
    conditionalContent = (
      <div className="w-full h-full bg-white p-12 flex items-center justify-center">
        <p className="text-2xl">Loading...</p>
      </div>
    );
  } else if (!loading && !error) {
    conditionalContent = (
      <div className="w-full h-full bg-white p-12">
          <DashTop allPassingData={data} />
          <DashBottom allPassingData={data} />
        </div>
    )
  } else if (!loading && error) {
    conditionalContent = (
      <div className="w-full h-full bg-white p-12 flex items-center justify-center">
        <p className="text-2xl">{error}</p>
      </div>
    )
  }

  return (
    <div className="flex h-screen w-full font-montserrat text-[#1f1f1f]">
      <NavBar />
      {conditionalContent}
    </div>
  );
};

export default App;
