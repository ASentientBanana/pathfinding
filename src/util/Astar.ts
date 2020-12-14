import React from 'react';
import Tile from './Tile'

const aStar = (startNode:Tile | undefined,endNode:Tile | undefined,open:Tile[],closed:Tile[],colors:any,db:any) => {
    if (startNode) open.push(startNode)
    const interval = setInterval(() => {
        let current: Tile;
        open = open.sort((a, b) => a.f - b.f)
        console.log(open[0].f);

        current = open[0]
        open.shift()
        if (!current.isEndTile || !current.isStartTile) db.current[current.id].style['backgroundColor'] = colors.accentGreyColor;
        db.current[current.id].style['border'] = `${colors.accentGoldColor} 0.5px solid`;
        current.setTileVisited()
        if (endNode !== undefined && current === endNode) {
            if (startNode && endNode) retrace(startNode, endNode,db,colors);
            clearInterval(interval)
            return;
        }
        closed.push(current)
        let tmp: Tile[] = []
        current.neighbors.forEach((tile: Tile) => {
            if (!closed.includes(tile)) {
                let movementCost: number;
                movementCost = current.g + 1;
                if (open.includes(tile)) {
                    if (movementCost < tile.g) tile.g = movementCost
                } else {
                    tile.g = movementCost;
                    tmp.push(tile)
                    // open.push(tile)
                }
                if (endNode) tile.h = getHeuristic(tile, endNode)
                tile.setFCost()
                tile.previusTile = current;
                db.current[tile.id].style['backgroundColor'] = "#afc7f3";
                tmp = tmp.sort((a, b) => a.f - b.f)
                open.push(tmp[0])
                //Sumnjivo
            }
        })
        if (!(open.length > 0)) clearInterval(interval);
    }, 1)
}
const getHeuristic = (tileA: Tile, tileB: Tile) => Math.abs(tileA.x - tileB.x) + Math.abs(tileA.y - tileB.y)

const retrace = (start: Tile, end: Tile,db:any,colors:any) => {
    const path: Tile[] = [];
    let current: Tile = end;
    while (current !== start) {
        path.push(current)
        if (current.previusTile) current = current.previusTile;
    }
    path.push(start)
    path.reverse();
    path.forEach((tile: Tile, index: number) => {
        setTimeout(() => {
            db.current[tile.id].style['backgroundColor'] = colors.accentGoldColor;
            db.current[tile.id].style['border'] = `${colors.accentGreyColor} 0.5px solid`;
        }, 50 * index)
    })
}
export default aStar;