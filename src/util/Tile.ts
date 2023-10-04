class Tile {
  isVisited: boolean;
  isVisiting: boolean;
  isWall: boolean;
  isPathTile:boolean;
  neighbors: number[];
  id: string;
  position: Vector2D;
  gCost: number;
  hCost:number
  parent: Tile | null;
  
  constructor(id: string, position: Vector2D) {
    this.isWall = false;
    this.isVisited = false;
    this.isVisiting = false;
    this.isPathTile = false;
    this.neighbors = [];
    this.position = position;
    this.id = id;
    this.gCost = Infinity;
    this.hCost = Infinity;
    this.parent = null;
  }
  setGCost = (cost: number) => {
    this.gCost = cost;
  }

}
export default Tile;
