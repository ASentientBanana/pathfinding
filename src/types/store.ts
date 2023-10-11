import { Vector2D } from ".";
import Tile from "../Models/Tile";

export type RefMap = {
  [index: string]: React.MutableRefObject<HTMLButtonElement | undefined>;
};

export type PathfindingStoreType = {
  mode: "start" | "end" | null;
  grid: Tile[][];
  endTile: Vector2D;
  gridSize: number;
  tileSize: number;
  startTile: Vector2D;
  gridReferences: any[];
  inProgress: boolean;
  gridHeight: number;
  wallDrawMode: "erase" | "draw" | null;
  isDrawingWalls: boolean;
  noAnimation: boolean;
  refMap: RefMap;
  setReferences: (ref: any, id: string) => void;
  setNoAnimation: (b: boolean) => void;
  setGridReferences: (ref: any[]) => void;
  setDrawMode: (mode: "erase" | "draw" | null) => void;
  setMode: (type: "start" | "end" | null) => void;
  setTileSize: (size: number) => void;
  setGridSize: (size: number, gridHeight: number) => void;
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
