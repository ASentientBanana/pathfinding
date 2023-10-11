import "./Nav.scss";
import { usePathfinderStore } from "../../store";

const BottomNav = () => {
  const store = usePathfinderStore();

  return (
    <div className="MainBotomnavContainer">
      <div className="sideContainer">
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
      </div>
      <button
        disabled={store.inProgress}
        className="rndBtn navBtn navTextColor"
        onClick={store.randomize}
      >
        Randomize
      </button>
      <div className="sideContainer">
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

export default BottomNav;
