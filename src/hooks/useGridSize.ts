import React from 'react';
import Tile from '../util/Tile';
import { usePathfinderStore } from '../store';


const useGridSize = (grid: HTMLDivElement | null): number[] => {
    const store = usePathfinderStore()
    if (grid) {
        const widthCount: number = Math.floor(grid.clientWidth / store.tileSize)
        const heightCount: number = Math.floor(grid.clientHeight / store.tileSize)
        if (widthCount) {
            return [widthCount, heightCount]
        }
        else return [20, 20]
    }
    else return [20, 20]

}
export default useGridSize;