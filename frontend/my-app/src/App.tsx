import { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import DashTop from "./components/DashTop";
import DashBottom from "./components/DashBottom";

function App() {
  const [allPassingData, setAllPassingData] = useState<any>(null);
  // console.log(allPassingData);

  useEffect(() => {
    fetch("/passing")
      .then((res) => res.json())
      .then((data) => {
        setAllPassingData(data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="flex h-screen w-full font-montserrat text-[#1f1f1f]">
      <NavBar />

      <div className="w-full h-full bg-white p-12">
        <DashTop allPassingData={allPassingData} />
        <DashBottom allPassingData={allPassingData} />
      </div>
    </div>
  );
}

export default App;
