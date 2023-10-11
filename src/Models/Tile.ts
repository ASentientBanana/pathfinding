import { Vector2D } from "../types";

class Tile {
  isVisited: boolean = false;
  isVisiting: boolean = false;
  isWall: boolean = false;
  isPathTile: boolean = false;
  neighbors: number[] = [];
  id: string;
  position: Vector2D;
  gCost: number = Infinity;
  hCost: number = Infinity;
  fCost: number = Infinity;
  parent: Tile | null = null;

  constructor(id: string, position: Vector2D) {
    this.id = id;
    this.position = position;
  }
  setGCost = (cost: number) => {
    this.gCost = cost;
  };
}
export default Tile;
