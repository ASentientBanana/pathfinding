import React from "react";
import Tile from "./Tile";

const djikstra = (
  startNode: Tile,
  endNode: Tile,
  open: Tile[],
  closed: Tile[],
  db: any,
  colors: any
) => {
  if (startNode) open.push(startNode);

  const interval = setInterval(() => {
    let current: Tile;
    current = open[0];
    open.forEach((tile: Tile, index: number) => {
      if (current.f > tile.f) current = tile;
    });
    open = open.filter((tile: Tile) => tile !== current);
    db[current.id].style["backgroundColor"] = "green";
    current.setTileVisited();
    if (endNode != undefined && current === endNode) {
      if (startNode && endNode) retrace(startNode, endNode, db, colors);
      clearInterval(interval);
      return;
    }
    open = open.filter((tile: Tile) => tile !== current);
    closed.push(current);
    current.neighbors.forEach((tile: Tile) => {
      if (!closed.includes(tile)) {
        let movementCost: number;
        movementCost = current.g + getDistance(current, tile);
        if (movementCost < tile.g || !open.includes(tile)) {
          db[tile.id].style["backgroundColor"] = "purple";
          tile.g = movementCost;
          if (endNode) tile.h = getDistance(tile, endNode);
          tile.previusTile = current;
          open.push(tile);
        }
      }
    });
    if (!(open.length > 0)) clearInterval(interval);
  }, 3);
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

const getDistance = (tileA: Tile, tileB: Tile): number => {
  const distX = Math.abs(tileA.x - tileB.x);
  const distY = Math.abs(tileA.y - tileB.y);
  if (distX > distY) return 14 * distX + 10 * (distX - distY);
  else return 14 * distY + 10 * (distY - distX);
};
