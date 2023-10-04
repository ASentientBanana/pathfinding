import Tile from "./Tile";
import retrace from './Retrace'
import { MutableRefObject } from "react";


const djikstra = async () => {
  if (startNode) open.push(startNode);

  while (open.nodes.length > 0) {document  if (startNode) open.push(startNode);

    while (open.nodes.length > 0) {
      await sleep(1);
      let current: Tile;
      current = open.peek();

      setTileState(current, 'visited')
      current.setTileVisited();
      if (endNode !== undefined && current === endNode) {
        if (startNode && endNode) retrace(startNode, endNode, db);
        return;
      }
      open.pop();
      closed.current.push(current);
      // eslint-disable-next-line no-loop-func
      current.neighbors.forEach((tile: Tile) => {
        if (!closed.current.includes(tile)) {
          let movementCost: number;
          movementCost = current.g + 1;
          if (movementCost < tile.g || !open.nodes.includes(tile)) {
            setTileState(current, 'visiting')
            tile.g = movementCost;
            tile.previusTile = current;
            open.push(tile);
          }
        }
      });
    }
    await sleep(1);
    let current: Tile;
    current = open.peek();

    setTileState(current, 'visited')
    current.setTileVisited();
    if (endNode !== undefined && current === endNode) {
      if (startNode && endNode) retrace(startNode, endNode, db);
      return;
    }
    open.pop();
    closed.current.push(current);
    // eslint-disable-next-line no-loop-func
    current.neighbors.forEach((tile: Tile) => {
      if (!closed.current.includes(tile)) {
        let movementCost: number;
        movementCost = current.g + 1;
        if (movementCost < tile.g || !open.nodes.includes(tile)) {
          setTileState(current, 'visiting')
          tile.g = movementCost;
          tile.previusTile = current;
          open.push(tile);
        }
      }
    });
  }
};

export default djikstra;
