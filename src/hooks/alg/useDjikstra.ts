import { usePathfinderStore } from "../../store"
import Tile from "../../util/Tile";
import { sleep } from "../../util/Utility";
import useRetrace from "./useRetrace";

const positions = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1]
]



const validatePosition = (x: number, y: number, w: number, h: number) => {
    if (x < 0 || x > w) {
        return false;
    }
    if (y < 0 || y > h) {
        return false;
    }

    return true
}

const useDjikstra = () => {
    const store = usePathfinderStore();
    const {retrace } = useRetrace();
    const step = 10;

    const djikstra = async () => {
        const grid = [...store.grid];
        const openNodes: Tile[] = [];

        let current = grid[store.startTile.y][store.startTile.x];
        current.isVisited = true;
        openNodes.push(current)
        current.gCost = 0;
        let stopCounter = 0;
        let found = false;
        while (!!openNodes.length) {
            if (found) {
                break;
            }
            current = openNodes.shift()!;
            current.isVisited = true;
            current.isVisiting = false;

            stopCounter++;
            await sleep(5);


            // check neighbors 
            for (let n = 0; n < positions.length; n++) {
                const cY = current.position.y + positions[n][1];
                const cX = current.position.x + positions[n][0];
                const isValid = validatePosition(cX, cY, grid.length - 1, grid[0].length - 1);
                if (!isValid ) {
                    continue;
                }
                const node = grid[cY][cX];
                
                if (node.isVisited || node.isWall) {
                    continue;
                };

                if (node.position.x === store.endTile.x && node.position.y === store.endTile.y) {
                    found = true;
                    node.parent = current;
                    break;
                }
                node.isVisiting = true;
                const newScore = current.gCost + step;

                if (newScore < node.gCost) {
                    node.gCost = newScore;
                }
                node.parent = current;
                if(!openNodes.find((nd)=>nd.id === node.id)){
                    openNodes.push(node);
                }

            }
            store.setGrid(grid)

            openNodes.sort((a, b) => a.gCost - b.gCost);
        }
        console.log(found);
        
        if(found){
            retrace(store.grid[store.endTile.y][store.endTile.x])
        }
        store.toggleInProgress()
    }

    return ({
        start: () => {
            store.toggleInProgress();
            djikstra();
        }
    })
}

export default useDjikstra;