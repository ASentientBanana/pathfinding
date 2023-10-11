import Tile from "../Models/Tile";

export const sleep = (time: number = 10) =>
  new Promise((res) => {
    setTimeout(() => {
      res(null);
    }, time);
  });

export const generateGrid = (
  gridSize: number,
  tileSize: number,
  gridHeight: number
) => {
  const _grid: Tile[][] = [];

  const nRows = gridHeight / tileSize;
  const nCols = gridSize / tileSize;

  for (let i = 0; i < nRows; i++) {
    _grid.push([]);
    for (let j = 0; j < nCols; j++) {
      _grid[i].push(new Tile(`${j}-${i}`, { x: j, y: i }));
    }
  }
  return _grid;
};

export const validatePosition = (
  x: number,
  y: number,
  w: number,
  h: number
) => {
  if (x < 0 || x > w) {
    return false;
  }
  if (y < 0 || y > h) {
    return false;
  }

  return true;
};

export const compareTiles = (tileA: Tile, tileB: Tile) => {
  return (
    tileA.position.x === tileB.position.x &&
    tileA.position.y === tileB.position.y
  );
};
