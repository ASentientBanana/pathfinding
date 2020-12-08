import React from 'react';

class Tile {
    x: number;
    y: number;
    f: number;
    g: number;
    h: number;
    isVisited: boolean;
    constructor(x: number, y: number, isVisited: boolean) {
        this.f = 0;
        this.g = 0;
        this.h = 0;
        this.x = x;
        this.y = y;
        this.isVisited = isVisited;
    }
}
export default Tile;