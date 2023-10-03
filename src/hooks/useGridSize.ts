import React from 'react';
import Tile from '../util/Tile';

// in px
export const TILE_SIZE = 20;


const useGridSize = (grid: HTMLDivElement | null): number[] => {
    if (grid) {
        const widthCount: number = Math.floor(grid.clientWidth / TILE_SIZE)
        const heightCount: number = Math.floor(grid.clientHeight / TILE_SIZE)
        if (widthCount) {
            return [widthCount, heightCount]
        }
        else return [20, 20]
    }
    else return [20, 20]

}
export default useGridSize;