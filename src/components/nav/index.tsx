import useAstar from "../../hooks/alg/useAstar";
import useAstarFast from "../../hooks/alg/useAstarFast";
import useBFS from "../../hooks/alg/useBFS";
import useDjikstra from "../../hooks/alg/useDjikstra";
import { usePathfinderStore } from "../../store";
import "./Nav.scss";

const ControlPanel = () => {
  const store = usePathfinderStore();
  const djikstra = useDjikstra();
  const aStar = useAstar();
  const aStarFast = useAstarFast();
  return (
    <div className="MainNavContainer">
      <div className="algContainer">
        <div className="algButtonsRow">
          <button
            disabled={store.inProgress}
            className="navBtn navTextColor"
            onClick={djikstra.start}
          >
            Djikstra
          </button>
          <button
            disabled={store.inProgress}
            className="navBtn navTextColor"
            onClick={aStar.start}
          >
            A-star
          </button>
        </div>
        <button
          disabled={store.inProgress}
          className="rndBtn navBtn navTextColor"
          onClick={store.randomize}
        >
          Randomize
        </button>
        {/* <button
          disabled={store.inProgress}
          className="navBtn navTextColor"
          onClick={aStarFast.start}
        >
          A-star Fast
        </button> */}
        {/* <button
        disabled={store.inProgress} className="navBtn navTextColor" onClick={bfs.start}>
          BFS
        </button> */}
      </div>

      <div className="utilContainer">
        <button
          disabled={store.inProgress}
          className="navBtn startBtn navTextColor"
          onClick={() => store.setMode("start")}
        >
          Move start
        </button>
        <button
          disabled={store.inProgress}
          className="navBtn endBtn navTextColor"
          onClick={() => store.setMode("end")}
        >
          Move End
        </button>
        <button
          disabled={store.inProgress}
          className="navBtn navTextColor"
          onClick={() => store.clear()}
        >
          Clear path
        </button>
        <button
          disabled={store.inProgress}
          className="navBtn navTextColor"
          onClick={() => store.clearWalls()}
        >
          Clear all
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;
