import React from "react";
import Tile from "./Tile";

const sleep = (ms: any) => new Promise((res) => setTimeout(res, ms));

const djikstra = async (
  startNode: Tile,
  endNode: Tile,
  open: any,
  closed: Tile[],
  db: any,
  colors: any
) => {
  if (startNode) open.push(startNode);

  while (open.nodes.length > 0) {
    await sleep(1);
    let current: Tile;
    current = open.peek();

    db[current.id].style["backgroundColor"] = colors.accentGreyColor;
    db[current.id].style["border"] = `${colors.accentGoldColor} 0.5px solid`;
    current.setTileVisited();
    if (endNode !== undefined && current === endNode) {
      if (startNode && endNode) retrace(startNode, endNode, db, colors);
      return;
    }
    open.pop();
    closed.push(current);
    // eslint-disable-next-line no-loop-func
    current.neighbors.forEach((tile: Tile) => {
      if (!closed.includes(tile)) {
        let movementCost: number;
        movementCost = current.g + 1;
        if (movementCost < tile.g || !open.nodes.includes(tile)) {
          db[tile.id].style["backgroundColor"] = "#afc7f3";
          tile.g = movementCost;
          tile.previusTile = current;
          open.push(tile);
        }
      }
    });
  }
};

const retrace = (start: Tile, end: Tile, db: any, colors: any) => {
  const path: Tile[] = [];
  let current: Tile = end;
  while (current !== start) {
    path.push(current);
    if (current.previusTile) current = current.previusTile;
  }
  path.push(start);
  path.reverse();
  path.forEach((tile: Tile, index: number) => {
    setTimeout(() => {
      db[tile.id].style["backgroundColor"] = colors.accentGoldColor;
      db[tile.id].style["border"] = `${colors.accentGreyColor} 0.5px solid`;
    }, 50 * index);
  });
};
export default djikstra;
