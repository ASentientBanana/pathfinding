
import Tile from "./Tile";
import retrace from './Retrace'
import { MutableRefObject } from "react";
const sleep = (ms: any) => new Promise((res) => setTimeout(res, ms));

const aStar = async (
  startNode: Tile,
  endNode: Tile,
  open: any,
  closed: MutableRefObject<Tile[]>,
  db: any,
  updateTile: any,
  setTileState:Function
  ) => {
  if (startNode) open.push(startNode);
  while (open.nodes.length > 0) {
    await sleep(1);
    let current: Tile;
    current = open.peek();
    if (!current.isEndTile || !current.isStartTile)
    setTileState(current,'visited')
    current.setTileVisited();
    if (endNode !== undefined && current === endNode) {
      if (startNode && endNode) retrace(startNode, endNode, db);
      return;
    }
    open.pop();
    closed.current.push(current);
    current.neighbors.forEach((neighborTile: Tile) => {
      if (!closed.current.includes(neighborTile)) {
        if (neighborTile.g === 0) {
          neighborTile.setGcost(current.g + 0.5);
          neighborTile.previusTile = current;
        } else if (neighborTile.g > current.g + 0.5) {
          neighborTile.setGcost(current.g + 0.5);
          neighborTile.previusTile = current;
        }
        neighborTile.setHcost(getHeuristic(neighborTile, endNode));
        neighborTile.setFCost();
        if (!open.nodes.includes(neighborTile)) {
          setTileState(neighborTile,'visited')
          open.push(neighborTile);
          
          console.log(closed.current.includes(neighborTile));
          
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


export default aStar;
