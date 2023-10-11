import { usePathfinderStore } from "../../store";
import Tile from "../../Models/Tile";
import { compareTiles, sleep, validatePosition } from "../../util/Utility";
import useRetrace from "./useRetrace";
import { Node, PQ } from "../../util/PriorityQ";

const positions = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

const getHeuristic = (tileA: Tile, tileB: Tile) => {
  //Manhatan distance heuristic
  const dx = Math.abs(tileB.position.x - tileA.position.x) ** 2;
  const dy = Math.abs(tileB.position.y - tileA.position.y) ** 2;
  return dx + dy;
};

const useAstar = () => {
  const store = usePathfinderStore();
  const { retrace } = useRetrace();
  const step = 10;
  const aStar = async () => {
    const grid = [
      ...store.grid.map((r) => {
        return r.map((t) => ({ ...t }));
      }),
    ];

    const endTile = grid[store.endTile.y][store.endTile.x];
    let current = grid[store.startTile.y][store.startTile.x];
    const openNodes = new PQ();
    const closed = [];
    current.gCost = 0;
    current.fCost = 0;
    openNodes.enqueue(current, 0);
    while (!!openNodes.data.length) {
      current = openNodes.dequeue().val;
      console.log("..");
      console.log(openNodes);

      closed.push(current.id);
      await sleep(1);

      current.isVisited = true;
      current.isVisiting = false;
      if (compareTiles(current, endTile)) {
        retrace(endTile, grid);
        break;
      }
      // Search neighbors
      for (let index = 0; index < positions.length; index++) {
        let node: Tile;
        const ofX = positions[index][0];
        const ofY = positions[index][1];

        const cY = current.position.y + ofY;
        const cX = current.position.x + ofX;
        if (!validatePosition(cX, cY, grid[0].length, grid.length - 1)) {
          continue;
        }
        node = grid[cY][cX];
        if (!node || node.isWall) {
          continue;
        }
        node.isVisiting = true;
        const newScore = current.gCost + step;
        if (newScore < node.gCost) {
          node.gCost = newScore;
          node.fCost = node.gCost * getHeuristic(node, endTile);
          if (
            !openNodes.data.find((target: Node) => target.val.id === node.id) &&
            !closed.find((target) => target === node.id)
          ) {
            console.log("im in");

            node.parent = current;
            openNodes.enqueue(node, node.fCost);
          }
        }
      }
      store.setGrid(grid);
    }
  };
  return {
    start: () => {
      store.toggleInProgress();
      aStar();
      store.toggleInProgress();
    },
  };
};

export default useAstar;
