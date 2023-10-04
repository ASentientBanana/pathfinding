import Grid from "./components/Grid/Grid";
import "./App.css";
import MainContainer from "./components/MainContainer";
import { usePathfinderStore } from "./store";
import useDjikstra from "./hooks/alg/useDjikstra";
import ControlPanel from "./components/nav";

function App() {
  const { start } = useDjikstra();
  return (
    <div className="app">
      <MainContainer>
        <ControlPanel />
        <Grid />
      </MainContainer>
    </div>
  );
}

export default App;
