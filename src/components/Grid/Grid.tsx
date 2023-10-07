import { useRef } from "react";
import GridTile from "../GridTile/GridTile";
import "./Grid.css";

import { usePathfinderStore } from "../../store";
import useGridSize from "../../hooks/useGridSize";

const Grid = () => {
  const store = usePathfinderStore();
  const { containerRef } = useGridSize();
  return (
    <div
      ref={containerRef}
      onMouseLeave={() => {
        store.toggleDrawingWalls(false);
        store.setDrawMode(null);
        store.setMode(null);
      }}
      style={{
        // border: "solid 1px red",
        display: "grid",
        gridTemplateColumns: `repeat(${Math.floor(
          store.gridSize / store.tileSize
        )},1fr`,
        gap: 0,
      }}
    >
      {store.grid.map((r, y) =>
        r.map((t) => {
          return <GridTile key={t.id} tile={t} />;
        })
      )}
    </div>
  );
};
export default Grid;
