
import Tile from "./Tile";
import retrace from './Retrace'
import Queue from './Queue'
import { MutableRefObject } from "react";


const sleep = (ms: any) => new Promise((res) => setTimeout(res, ms));

const bfs = async (
  startNode: Tile,
  endNode: Tile,
  db: any,
  openList: Tile[],
  closedList:MutableRefObject<Tile[]>,
  setTileState:Function
  ) => {
  startNode.isVisited = true;
  const queue = new Queue<Tile>();
  queue.push(startNode)
  while (!queue.isEmpty()) {
    await sleep(1);
    const curNode: Tile = queue.shift()!;
   setTileState(curNode,'visited')
    if (curNode === endNode) {
      retrace(startNode, endNode, db)
      break;
    }
    curNode.neighbors.forEach(neighbor => {
      if (!closedList.current.includes(neighbor)) {
        setTileState(curNode,'visiting')
        neighbor.isVisited = true;
        closedList.current.push(neighbor);
        neighbor.previusTile = curNode;
        queue.push(neighbor);
      }
    })
  }
}

export default bfs; 