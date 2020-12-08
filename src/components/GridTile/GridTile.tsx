import React, { useState, useEffect } from 'react';
import './GridTile.css';

const GridTile = ({ row, col, callback, tile, isVisited }: any) => {
    let isBarier: boolean = false;
    const [isVisitedNode, setIsVisitedNode] = useState<boolean>(true);
    let color = "white";
    useEffect(() => {
        if (isVisitedNode) color = "red";
        else color = "white";
    }, [isVisitedNode]);
    const checkNeighbours = () => {
        console.log(color);
        setIsVisitedNode(true);
        console.log(isVisitedNode);

    }
    return <div id="grid-tile" onClick={checkNeighbours} style={{ backgroundColor: color }}>{tile}</div>
}
export default GridTile