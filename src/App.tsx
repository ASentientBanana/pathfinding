import Grid from "./components/Grid/Grid";
import "./App.css";
import MainContainer from "./components/MainContainer";
import { usePathfinderStore } from "./store";
import useDjikstra from "./hooks/alg/useDjikstra";
import ControlPanel from "./components/nav";
import { useEffect } from "react";
import { PQ } from "./util/PriorityQ";
import Tile from "./Models/Tile";
import BottomNav from "./components/nav/bottomNav";

function App() {
  const { start } = useDjikstra();

  return (
    <div className="app">
      <MainContainer>
        <ControlPanel />
        <Grid />
        <BottomNav />
      </MainContainer>
    </div>
  );
}

export default App;
