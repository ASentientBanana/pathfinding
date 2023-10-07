import { usePathfinderStore } from "../../store";
import Tile from "../../Models/Tile";
import { sleep } from "../../util/Utility";
import useRetrace from "./useRetrace";

const positions = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

const validatePosition = (x: number, y: number, w: number, h: number) => {
  if (x < 0 || x > w) {
    return false;
  }
  if (y < 0 || y > h) {
    return false;
  }

  return true;
};

// Moze da se iskoristi
// const getHeuristic = (tileA: Tile, tileB: Tile) => {
//     //Manhatan distance heuristic
//     //   const dx = Math.abs(tileA.position.x - tileB.position.x);
//     //   const dy = Math.abs(tileA.position.y - tileB.position.y);
//     //   return dx + dy;
//     return (
//       (tileA.position.x - tileB.position.x) ^
//       (2 - (tileA.position.y - tileB.position.y)) ^
//       2
//     );
//   };

const getHeuristic = (tileA: Tile, tileB: Tile) => {
  //Manhatan distance heuristic
  const D2 = 1.4142135623730951;
  const dx = Math.abs(tileB.position.x - tileA.position.x);
  const dy = Math.abs(tileB.position.y - tileA.position.y);
  return dx + dy;
  // return dx + dy + (D2 - 2) * Math.min(dx, dy);
};

const useAstar = () => {
  const store = usePathfinderStore();
  const { retrace } = useRetrace();
  const step = 10;

  const aStar = async () => {
    const grid = [...store.grid];
    const endTile = grid[store.endTile.y][store.endTile.x];
    let current = grid[store.startTile.y][store.startTile.x];
    const openNodes: Tile[] = [current];
    current.isVisited = true;
    current.gCost = 0;
    let stopCounter = 0;
    let found = false;
    while (!!openNodes.length) {
      if (found) {
        break;
      }
      //pop can be useful for long path making
      current = openNodes.shift()!;
      current.isVisited = true;
      current.isVisiting = false;

      stopCounter++;
      await sleep(10);

      // check neighbors
      for (let n = 0; n < positions.length; n++) {
        const cY = current.position.y + positions[n][1];
        const cX = current.position.x + positions[n][0];
        const isValid = validatePosition(
          cX,
          cY,
          grid.length - 1,
          grid[0].length - 1
        );
        if (!isValid) {
          continue;
        }
        const node = grid[cY][cX];

        if (node.isVisited || node.isWall) {
          continue;
        }

        if (
          node.position.x === store.endTile.x &&
          node.position.y === store.endTile.y
        ) {
          found = true;
          node.parent = current;
          break;
        }
        node.isVisiting = true;
        node.hCost = getHeuristic(node, endTile);
        const newScore = current.gCost + step;

        if (newScore < node.gCost) {
          node.gCost = newScore;
          node.fCost = Math.floor(newScore + node.hCost);
        } else {
          node.fCost = Math.floor(node.gCost + node.hCost);
        }
        if (!node.parent || node.parent.fCost < current.fCost) {
          node.parent = current;
        }
        if (!openNodes.find((t) => t.id === node.id)) {
          openNodes.push(node);
        }
      }
      store.setGrid(grid);
      openNodes.sort((a, b) => a.fCost - b.fCost);
    }

    if (found) {
      retrace(store.grid[store.endTile.y][store.endTile.x]);
    }
    store.toggleInProgress();
  };

  return {
    start: () => {
      store.toggleInProgress();
      aStar();
    },
  };
};

export default useAstar;
