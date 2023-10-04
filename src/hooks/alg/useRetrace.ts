import { usePathfinderStore } from "../../store";
import Tile from "../../util/Tile";
import { sleep } from "../../util/Utility";



const useRetrace = () =>{
    const store = usePathfinderStore();
    const retrace = async (start:Tile)=>{
        const grid = [...store.grid];

        const nodes:Tile[] = [];
        let current = start;
        while(!!current.parent){
            console.log('search');
            nodes.push(current.parent);
            current = current.parent
        }
        for (let i = 0; i < nodes.length; i++) {
            const element = nodes[i];
            await sleep(10)
            grid[element.position.y][element.position.x].isPathTile = true;
            store.setGrid(grid)
        }
    }
    
    return{
        retrace
    }
}

export default useRetrace;