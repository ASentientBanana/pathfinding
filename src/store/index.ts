import { create } from "zustand";
import Tile from "../Models/Tile";
import { PathfindingStoreType } from "../types/store";
import { generateGrid } from "../util/Utility";

export const DEFAULT_TILE_SIZE = 40;
export const DEFAULT_GRID_SIZE = 800;

export const usePathfinderStore = create<PathfindingStoreType>()((set) => ({
  // State
  startTile: { x: 1, y: 7 },
  mode: null,
  endTile: { x: 1, y: 5 },
  isDrawingWalls: false,
  inProgress: false,
  grid: generateGrid(DEFAULT_GRID_SIZE, DEFAULT_TILE_SIZE),
  tileSize: DEFAULT_TILE_SIZE,
  gridSize: DEFAULT_GRID_SIZE,
  wallDrawMode: null,
  setDrawMode: (mode: "draw" | "erase" | null) => {
    set((state) => ({ ...state, wallDrawMode: mode }));
  },
  randomize: () => {
    set((state) => {
      const grid = generateGrid(DEFAULT_GRID_SIZE, DEFAULT_TILE_SIZE).map(
        (row) =>
          row.map((tile) => {
            const _tile = new Tile(tile.id, tile.position);
            if (Math.random() * 100 > 70) {
              //Check for start and end tiles
              if (
                !(
                  (_tile.position.x === state.endTile.x &&
                    _tile.position.y === state.endTile.y) ||
                  (_tile.position.x === state.startTile.x &&
                    _tile.position.y === state.startTile.y)
                )
              ) {
                _tile.isWall = true;
              }
            }
            return _tile;
          })
      );
      return { ...state, grid };
    });
  },
  clear: () => {
    set((state) => {
      const grid = state.grid.map((row) =>
        row.map((tile) =>
          tile.isWall ? tile : new Tile(tile.id, tile.position)
        )
      );
      return { ...state, grid };
    });
  },
  clearWalls: () => {
    set((state) => {
      const grid = state.grid.map((row) =>
        row.map((tile) => new Tile(tile.id, tile.position))
      );
      return { ...state, grid };
    });
  },
  // Actions
  setMode: (mode) => {
    set((state) => ({ ...state, mode }));
  },
  setEdgeTiles: (type, pos) => {
    if (type === "end") {
      set((state) => ({ ...state, endTile: pos }));
    } else if (type === "start") {
      set((state) => ({ ...state, startTile: pos }));
    }
  },
  toggleDrawingWalls: (_state: boolean) => {
    set((state) => ({ ...state, isDrawingWalls: _state }));
  },
  toggleVisited: (x: number, y: number) =>
    set((state) => {
      const _grid = state.grid;
      const g = [..._grid];
      const _row = [...g[y]];
      const targetTile = _row.find((t) => t.id === _grid[y][x].id);
      if (!targetTile) return { ...state };
      _row[x] = { ..._row[x], isVisited: !_row[x].isVisited };
      g[y] = _row;

      return { ...state, grid: g };
    }),
  toggleWall: (x: number, y: number, wallState?: boolean) =>
    set((state) => {
      const _grid = state.grid;
      const g = [..._grid];
      const _row = [...g[y]];
      const targetTile = _row.find((t) => t.id === _grid[y][x].id);
      if (!targetTile) return { ...state };
      _row[x] = {
        ..._row[x],
        isWall: wallState !== undefined ? wallState : !_row[x].isWall,
      };
      g[y] = _row;
      return { ...state, grid: g };
    }),
  setTileSize: (tileSize: number) => {
    set((state) => ({ ...state, tileSize }));
  },
  setGridSize: (gridSize: number) => {
    set((state) => ({
      ...state,
      gridSize,
      grid: generateGrid(gridSize, state.tileSize),
    }));
  },
  toggleInProgress: () => {
    set((state) => ({ ...state, inProgress: !state.inProgress }));
  },
  setGrid: (grid: Tile[][]) => {
    set((state) => ({ ...state, grid }));
  },
}));

// return { grid: g }
