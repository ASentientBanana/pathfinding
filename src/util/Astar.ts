import React, { FunctionComponent } from "react";
import Tile from "./Tile";
const sleep = (ms: any) => new Promise((res) => setTimeout(res, ms));

const aStar = async (
  startNode: Tile,
  endNode: Tile,
  open: any,
  closed: Tile[],
  db: any,
  colors: any,
  updateTile: any
) => {
  if (startNode) open.push(startNode);
  while (open.nodes.length > 0) {
    await sleep(1);
    let current: Tile;
    current = open.peek();
    if (!current.isEndTile || !current.isStartTile)
      db[current.id].style["backgroundColor"] = colors.accentGreyColor;
    db[current.id].style["border"] = `${colors.accentGoldColor} 0.5px solid`;
    current.setTileVisited();
    if (endNode !== undefined && current === endNode) {
      if (startNode && endNode) retrace(startNode, endNode, db, colors);
      return;
    }
    open.pop();
    closed.push(current);
    current.neighbors.forEach((neighborTile: Tile) => {
      if (!closed.includes(neighborTile)) {
        if (neighborTile.g === 0) {
          neighborTile.setGcost(current.g + 0.2);
          neighborTile.previusTile = current;
        } else if (neighborTile.g > current.g + 0.2) {
          neighborTile.setGcost(current.g + 0.2);
          neighborTile.previusTile = current;
        }
        neighborTile.setHcost(getHeuristic(neighborTile, endNode));
        neighborTile.setFCost();
        db[neighborTile.id].style["backgroundColor"] = "#afc7f3";
        if (!open.nodes.includes(neighborTile)) {
          open.push(neighborTile);
        }
      }
    });
  }
};

function getHeuristic(tileA: Tile, tileB: Tile) {
  const D2 = 1.4142135623730951;
  const dx = Math.abs(tileA.x - tileB.x);
  const dy = Math.abs(tileA.y - tileB.y);
  return dx + dy + (D2 - 2) * Math.min(dx, dy);
  // alternativa
  // return D * (dx + dy) + (D2 - 2 * D) * Math.min(dx, dy);
}

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
    }, 15 * index);
  });
};
export default aStar;
