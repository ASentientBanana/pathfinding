class Tile {
  isVisited: boolean = false;
  isVisiting: boolean = false;
  isWall: boolean = false;
  isPathTile: boolean = false;
  neighbors: number[] = [];
  id: string;
  position: Vector2D;
  gCost: number = Infinity;
  hCost: number = 0;
  fCost: number = 0;
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
