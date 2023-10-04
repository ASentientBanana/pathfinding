import useAstar from "../../hooks/alg/useAstar";
import useBFS from "../../hooks/alg/useBFS";
import useDjikstra from "../../hooks/alg/useDjikstra";
import { usePathfinderStore } from "../../store";
import "./Nav.scss";

const ControlPanel = () => {
  const store = usePathfinderStore();
  const djikstra = useDjikstra();
  const aStar = useAstar();
  const bfs = useBFS();
  return (
    <div className="MainNavContainer">
      <div className="algContainer">
        <button className="navBtn navTextColor" onClick={djikstra.start}>
          Djikstra
        </button>
        <button className="navBtn navTextColor" onClick={aStar.start}>
          A-star
        </button>
        {/* <button className="navBtn navTextColor" onClick={bfs.start}>
          BFS
        </button> */}
        <button className="navBtn navTextColor" onClick={store.randomize}>
          Randomize
        </button>
      </div>
      <div className="algContainer">
        <button
          className="navBtn startBtn navTextColor"
          onClick={() => store.setMode("start")}
        >
          Move start
        </button>
        <button
          className="navBtn endBtn navTextColor"
          onClick={() => store.setMode("end")}
        >
          Move End
        </button>
        <button className="navBtn navTextColor" onClick={() => store.clear()}>
          Clear
        </button>
        <button
          className="navBtn navTextColor"
          onClick={() => store.clearWalls()}
        >
          Clear Walls
        </button>
      </div>
      {/* <div className="sizeControls">
        <div className="sizeControlElementContainer">
          <label className="navTextColor">Tile size: {store.tileSize}</label>
          <input
            type="range"
            value={store.tileSize}
            min={20}
            max={100}
            step={10}
            onChange={(e) => {
              store.setTileSize(+e.target.value);
            }}
            name=""
            id=""
          />
        </div>
        <div className="sizeControlElementContainer">
          <label className="navTextColor">Grid size: {store.gridSize}</label>
          <input
            step={20}
            min={1000}
            max={500}
            value={store.gridSize}
            onChange={(e) => {
              store.setGridSize(+e.target.value);
            }}
            type="range"
            name=""
            id=""
          />
        </div>
      </div> */}
    </div>
  );
};

export default ControlPanel;
