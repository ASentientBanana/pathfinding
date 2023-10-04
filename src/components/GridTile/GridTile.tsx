import { createRef, memo } from "react";
import "./GridTile.css";
import Tile from "../../util/Tile";
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
    //moving start and end tiles
    if (store.mode) {
      store.setEdgeTiles(store.mode, tile.position);
      return;
    }
    if (
      tile.position.x === store.startTile.x &&
      tile.position.y === store.startTile.y
    ) {
      return;
    }
    if (
      tile.position.x === store.endTile.x &&
      tile.position.y === store.endTile.y
    ) {
      return;
    }
    store.toggleWall(tile.position.x, tile.position.y);
  };

  const handleMouseOver = () => {
    if (store.isDrawingWalls) {
      store.toggleWall(tile.position.x, tile.position.y);
    }
  };

  return (
    <button
      type="button"
      className={`grid-tile`}
      style={
        isEnd || isStart
          ? {
              backgroundColor: isStart ? "lightgreen" : "#FAA0A0",
              height: `${store.tileSize}px`,
              width: `${store.tileSize}px`,
            }
          : tile.isPathTile
          ? {
              backgroundColor: "#eab354",
            }
          : {
              backgroundColor: tile.isWall
                ? "white"
                : tile.isVisiting
                ? "#5f987b"
                : tile.isVisited
                ? "#5f787b"
                : "transparent",
              height: `${store.tileSize}px`,
              width: `${store.tileSize}px`,
            }
      }
      disabled={store.inProgress}
      ref={tileRef}
      onClick={handleClick}
      onMouseDown={() => {
        store.toggleDrawingWalls(true);
      }}
      onMouseUp={() => {
        store.toggleDrawingWalls(false);
      }}
      onMouseOver={handleMouseOver}
    >
      {tile.gCost === Infinity ? "" : tile.gCost}
    </button>
  );
};
export default memo(GridTile);
