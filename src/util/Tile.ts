class Tile {
  x: number;
  y: number;
  f: number;
  g: number;
  h: number;
  tileSize: number;
  id: string;
  isVisited: boolean;
  neighbors: Tile[];
  previusTile: Tile | undefined;
  isWalkable: boolean;
  isStartTile: boolean;
  isEndTile: boolean;
  constructor(
    x: number,
    y: number,
    tileSize: number = 25,
    isWalkable: boolean = true,
    isStartTile: boolean = false,
    isEndTile: boolean = false
  ) {
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.x = x;
    this.y = y;
    this.id = "";
    this.isVisited = false;
    this.neighbors = [];
    this.tileSize = tileSize;
    this.isWalkable = isWalkable;
    this.isStartTile = isStartTile;
    this.isEndTile = isEndTile;
  }
  addNeighbors(grid: Tile[][]) {
    if (this.y !== grid.length - 1)   this.neighbors.push(grid[this.y + 1][this.x]);
    if (this.x !== grid[0].length - 1) this.neighbors.push(grid[this.y][this.x + 1]);
    if (this.y !== 0) this.neighbors.push(grid[this.y - 1][this.x]);
    if (this.x !== 0) this.neighbors.push(grid[this.y][this.x - 1]);
  }
  setTileVisited = () => (this.isVisited = true);
  setWalkable = () => (this.isWalkable = !this.isWalkable);
  setId = (id: string) => (this.id = id);
  setGcost = (g: number) => (this.g = g);
  setHcost = (h: number) => (this.h = h);
  setFCost = () => (this.f = this.g + this.h);
  setStartTile = () => {
    if (!this.isEndTile) this.isStartTile = true;
  };
  setEndTile = () => {
    if (!this.isStartTile) this.isEndTile = true;
  };
}
export default Tile;
