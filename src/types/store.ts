import Tile from "../Models/Tile";

export type PathfindingStoreType = {
  mode: "start" | "end" | null;
  grid: Tile[][];
  endTile: Vector2D;
  gridSize: number;
  tileSize: number;
  startTile: Vector2D;
  inProgress: boolean;
  wallDrawMode: "erase" | "draw" | null;
  isDrawingWalls: boolean;
  setDrawMode: (mode: "erase" | "draw" | null) => void;
  setMode: (type: "start" | "end" | null) => void;
  setTileSize: (size: number) => void;
  setGridSize: (size: number) => void;
  toggleVisited: (x: number, y: number) => void;
  toggleWall: (x: number, y: number, state?: boolean) => void;
  toggleInProgress: () => void;
  toggleDrawingWalls: (_state: boolean) => void;
  setEdgeTiles: (type: "start" | "end", pos: Vector2D) => void;
  setGrid: (grid: Tile[][]) => void;
  clear: () => void;
  randomize: () => void;
  clearWalls: () => void;
};
