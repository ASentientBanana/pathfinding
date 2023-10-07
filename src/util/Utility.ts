import Tile from "../Models/Tile";

export const sleep = (time: number = 10) =>
  new Promise((res) => {
    setTimeout(() => {
      res(null);
    }, time);
  });
export const generateGrid = (gridSize: number, tileSize: number) => {
  const _grid: Tile[][] = [];

  const nRows = gridSize / tileSize;
  const nCols = gridSize / tileSize;

  for (let i = 0; i < nRows; i++) {
    _grid.push([]);
    for (let j = 0; j < nCols; j++) {
      _grid[i].push(new Tile(`${j}-${i}`, { x: j, y: i }));
    }
  }
  return _grid;
};
