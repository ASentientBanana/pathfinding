import React from 'react';
import Tile from '../util/Tile';



const useGridSize = (grid:HTMLDivElement | null): number[] => {
if(grid){
    const widthCount: number = Math.floor(grid.clientWidth / 25)
    const heightCount:number = Math.floor(grid.clientHeight / 25)
    if (widthCount) {
        return [widthCount, heightCount]
    }
    else return [20, 20]
}
else return [20, 20]

}
export default useGridSize;