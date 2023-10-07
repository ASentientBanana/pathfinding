import { createRef, memo } from "react";
import "./GridTile.css";
import Tile from "../../Models/Tile";
import { usePathfinderStore } from "../../store";

interface GridTile {
  tile: Tile;
}
const GridTile = ({ tile }: GridTile) => {
  const tileRef = createRef<HTMLButtonElement>();
  const store = usePathfinderStore();
  const isStart =
    tile.position.x === store.startTile.x &&
    tile.position.y === store.startTile.y;
  const isEnd =
    tile.position.x === store.endTile.x && tile.position.y === store.endTile.y;

  const handleClick = () => {
    if (tile.isVisited || tile.isVisiting) return;

    //moving start and end tiles
    if (store.mode) {
      store.setEdgeTiles(store.mode, tile.position);
      return;
    }
    if (isStart) {
      return;
    }
    if (isEnd) {
      return;
    }
    // store.toggleWall(tile.position.x, tile.position.y);
  };

  const handleMouseOver = () => {
    if (tile.isVisited || tile.isVisiting) return;
    if (store.wallDrawMode === "draw") {
      store.toggleWall(tile.position.x, tile.position.y, true);
      return;
    } else if (store.wallDrawMode === "erase") {
      store.toggleWall(tile.position.x, tile.position.y, false);
      return;
    }
    if (isEnd && store.mode === "start") {
      return;
    }
    if (isStart && store.mode === "end") {
      return;
    }

    if (store.mode !== null && !tile.isWall) {
      store.setEdgeTiles(store.mode, tile.position);
    }
  };

  const handleMouseUp = () => {
    store.setDrawMode(null);
    store.setMode(null);
    store.toggleDrawingWalls(false);
  };
  const handleMouseDown = () => {
    store.toggleDrawingWalls(true);
    if (!isStart && !isEnd) {
      store.setDrawMode(tile.isWall ? "erase" : "draw");
      store.toggleWall(tile.position.x, tile.position.y);
    }
    if (isEnd) {
      store.setMode("end");
    }
    if (isStart) {
      store.setMode("start");
    }
  };

  const getBackgroundColor = () => {
    if (isEnd) {
      return "#FAA0A0";
    } else if (isStart) {
      return "lightgreen";
    } else if (tile.isPathTile) {
      return "#eab354";
    } else if (tile.isWall) {
      return "white";
    } else if (tile.isVisiting) {
      return "#5f987b";
    } else if (tile.isVisited) {
      return "#5f787b";
    }
    return "transparent";
  };

  return (
    <button
      type="button"
      className={`grid-tile`}
      style={{
        backgroundColor: getBackgroundColor(),
        height: `${store.tileSize}px`,
        width: `${store.tileSize}px`,
        cursor: isStart || isEnd ? "grab" : "pointer",
      }}
      disabled={store.inProgress}
      ref={tileRef}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseOver={handleMouseOver}
    >
      <span className="btnText">
        {tile.gCost === Infinity ? "" : tile.gCost}
      </span>
    </button>
  );
};
export default memo(GridTile);
