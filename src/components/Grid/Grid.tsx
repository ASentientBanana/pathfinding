import { useRef } from "react";
import GridTile from "../GridTile/GridTile";
import "./Grid.css";

import { usePathfinderStore } from "../../store";

const Grid = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const store = usePathfinderStore();

  return (
    <div
      ref={containerRef}
      onMouseLeave={() => {
        store.toggleDrawingWalls(false);
      }}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${Math.floor(
          store.gridSize / store.tileSize
        )},${store.tileSize}px)`,
        gap: 0,
      }}
    >
      {store.grid.map((r, y) =>
        r.map((t, x) => {
          return <GridTile key={t.id} tile={t} />;
        })
      )}
    </div>
  );
};
export default Grid;
