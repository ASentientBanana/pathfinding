import { usePathfinderStore } from "../../store";
import Tile from "../../Models/Tile";
import { sleep, validatePosition } from "../../util/Utility";
import useRetrace from "./useRetrace";
import { Node, PQ } from "../../util/PriorityQ";

const positions = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

// Moze da se iskoristi
// const getHeuristic = (tileA: Tile, tileB: Tile) => {
//   //Manhatan distance heuristic
//   //   const dx = Math.abs(tileA.position.x - tileB.position.x);
//   //   const dy = Math.abs(tileA.position.y - tileB.position.y);
//   //   return dx + dy;
//   return (
//     (tileA.position.x - tileB.position.x) ^
//     (2 - (tileA.position.y - tileB.position.y)) ^
//     2
//   );
// };

const getBackgroundColorFast = (
  item: Tile,
  isStart: boolean,
  isEnd: boolean
) => {
  if (isEnd) {
    return "#FAA0A0";
  } else if (isStart) {
    return "lightgreen";
  } else if (item.isPathTile) {
    return "#eab354";
  } else if (item.isWall) {
    return "white";
  } else if (item.isVisited) {
    return "#5f987b";
  } else if (item.isVisiting) {
    return "#5f787b";
  }
  return "transparent";
};

const getHeuristic = (tileA: Tile, tileB: Tile) => {
  //Manhatan distance heuristic
  const dx = Math.abs(tileB.position.x - tileA.position.x) ** 2;
  const dy = Math.abs(tileB.position.y - tileA.position.y) ** 2;
  return dx + dy;
};

const compareTiles = (tileA: Tile, tileB: Tile) => {
  return (
    tileA.position.x === tileB.position.x &&
    tileA.position.y === tileB.position.y
  );
};

const useAstarFast = () => {
  const store = usePathfinderStore();
  const { retrace } = useRetrace();
  const step = 10;

  const stepper = async (history: any[]) => {
    // console.log(Object.keys(store.refMap));
    for (let i = 0; i < history.length; i++) {
      const _grid = history[i];
      for (let row = 0; row < _grid.length; row++) {
        for (let col = 0; col < _grid[row].length; col++) {
          const tile = _grid[row][col];
          if (store.refMap[tile.id].current) {
            const isStart =
              tile.position.x === store.startTile.x &&
              tile.position.y === store.startTile.y;
            const isEnd =
              tile.position.x === store.endTile.x &&
              tile.position.y === store.endTile.y;
            store.refMap[tile.id!].current!.style.backgroundColor =
              getBackgroundColorFast(tile, isStart, isEnd);
            await sleep(10);
          }
        }
      }
      // store.setGrid(history[i]);
    }
    retrace(
      history[history.length - 1][store.endTile.y][store.endTile.x],
      history[history.length - 1]
    );
  };

  const aStar = async () => {
    const history: any[] = [];
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
      closed.push(current.id);

      current.isVisited = true;
      current.isVisiting = false;
      if (compareTiles(current, endTile)) {
        // retrace(endTile);
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
            node.parent = current;
            openNodes.enqueue(node, node.fCost);
          }
          // add grds to array
        }
        history.push(grid);
      }
    }

    return history;
  };
  return {
    start: async () => {
      store.toggleInProgress();
      console.log("start fast");
      const h = await aStar();
      stepper(h);
      store.toggleInProgress();
    },
  };
};

export default useAstarFast;
