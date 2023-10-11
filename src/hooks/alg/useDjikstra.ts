import { usePathfinderStore } from "../../store";
import Tile from "../../Models/Tile";
import { compareTiles, sleep, validatePosition } from "../../util/Utility";
import useRetrace from "./useRetrace";
import { PQ } from "../../util/PriorityQ";

const positions = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

const useDjikstra = () => {
  const store = usePathfinderStore();
  const { retrace } = useRetrace();
  const step = 10;

  const djikstra = async () => {
    const grid = [
      ...store.grid.map((r) => {
        return r.map((t) => ({ ...t }));
      }),
    ];
    const openNodes = new PQ();
    const endTile = grid[store.endTile.y][store.endTile.x];
    let current = grid[store.startTile.y][store.startTile.x];
    openNodes.enqueue(current, 0);
    current.isVisited = true;
    current.gCost = 0;
    let found = false;
    while (!!openNodes.data.length) {
      console.log("das");

      if (found) {
        break;
      }
      current = openNodes.dequeue().val;
      current.isVisited = true;
      current.isVisiting = false;
      await sleep(5);

      // check neighbors
      for (let n = 0; n < positions.length; n++) {
        const cY = current.position.y + positions[n][1];
        const cX = current.position.x + positions[n][0];
        const isValid = validatePosition(
          cX,
          cY,
          grid[0].length - 1,
          grid.length - 1
        );
        if (!isValid) {
          continue;
        }
        const node = grid[cY][cX];

        if (node.isVisited || node.isWall) {
          continue;
        }
        console.log(compareTiles(node, endTile));

        if (compareTiles(node, endTile)) {
          found = true;
          node.parent = current;
          break;
        }
        node.isVisiting = true;
        const newScore = current.gCost + step;

        if (newScore < node.gCost) {
          node.gCost = newScore;
          node.parent = current;
          if (!openNodes.data.find((nd) => nd.val.id === node.id)) {
            openNodes.enqueue(node, node.gCost);
          }
        }
      }
      store.setGrid(grid);
    }
    if (found) {
      retrace(endTile, grid);
    }
    store.toggleInProgress();
  };

  return {
    start: () => {
      store.toggleInProgress();
      djikstra();
    },
  };
};

export default useDjikstra;
