import GridTile from "../GridTile/GridTile";
import "./Grid.css";

import { usePathfinderStore } from "../../store";
import useGridSize from "../../hooks/useGridSize";
import { useRef } from "react";

const Grid = () => {
  const store = usePathfinderStore();
  const { containerRef } = useGridSize();
  return (
    <div
      className="MainGridContainer"
      style={{
        display: "flex",
        justifyContent: "center",
        // height: "80vh",
        // border: "1px red solid",
      }}
    >
      <div
        ref={containerRef}
        onMouseLeave={() => {
          store.toggleDrawingWalls(false);
          store.setDrawMode(null);
          store.setMode(null);
        }}
        className="das"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {store.grid.map((r, y) => {
          const refMap: {
            [index: string]: React.RefObject<HTMLButtonElement>;
          } = {};
          const grid = r.map((t) => {
            return <GridTile key={t.id} tile={t} />;
          });

          return grid;
        })}
      </div>
    </div>
  );
};
export default Grid;
