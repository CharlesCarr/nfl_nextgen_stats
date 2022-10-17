import { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import DashTop from "./components/DashTop";
import DashBottom from "./components/DashBottom";

function App() {
  const [allPassingData, setAllPassingData] = useState<any>(null);
  // const [allIndPlayerData, setAllIndPlayerData] = useState<any>(null);
  // console.log(backendData);

  useEffect(() => {
    fetch("/passing")
      .then((res) => res.json())
      .then((data) => {
        setAllPassingData(data.data);
      })
      .catch((err) => console.error(err));      
  }, []);

  const getPlayerData = (player: string) => {
    let playerData = allPassingData.filter((d: any) => {
      if (d["player_display_name"] === player && d['week'] === 0) {
        return d;
      }
    });
    console.log(playerData);
  }

  return (
    <div className="flex h-screen w-full font-montserrat">
      <NavBar />

      <div className="w-full h-full bg-white p-12">
        <DashTop />
        <DashBottom />
      </div>
    </div>
  );
}

export default App;
