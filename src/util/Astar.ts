import React, { FunctionComponent } from 'react';
import Tile from './Tile'

const aStar = (startNode: Tile, endNode: Tile, open: any, closed: Tile[], db: any, colors: any, updateTile: any) => {
    if (startNode) open.push(startNode)
    const interval = setInterval(() => {
        let current: Tile;
        current = open.peek()
        if (!current.isEndTile || !current.isStartTile) db[current.id].style['backgroundColor'] = colors.accentGreyColor;
        db[current.id].style['border'] = `${colors.accentGoldColor} 0.5px solid`;
        current.setTileVisited()
        if (endNode !== undefined && current === endNode) {
            if (startNode && endNode) retrace(startNode, endNode, db, colors);
            clearInterval(interval)
            return;
        }
        open.pop()
        closed.push(current)
        current.neighbors.forEach((tile: Tile) => {
            if (!closed.includes(tile)) {
                tile.g = current.g + 1;
                if (endNode) tile.h = getHeuristic(tile, endNode)
                tile.setFCost()
                if (!open.nodes.includes(tile)) open.push(tile)
                updateTile(tile.id, tile.f, tile.h, tile.g)
                tile.previusTile = current;
                open.push(tile)
                db[tile.id].style['backgroundColor'] = "#afc7f3";
            }
        })
        if (!(open.nodes.length > 0)) clearInterval(interval);
    }, 5)
}

const getHeuristic = (tileA: Tile, tileB: Tile) => Math.abs(tileA.x - tileB.x) + Math.abs(tileA.y - tileB.y)

const retrace = (start: Tile, end: Tile, db: any, colors: any) => {
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
            db[tile.id].style['backgroundColor'] = colors.accentGoldColor;
            db[tile.id].style['border'] = `${colors.accentGreyColor} 0.5px solid`;
        }, 40 * index)
    })
}
export default aStar;