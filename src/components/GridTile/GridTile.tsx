import React, { useState, useEffect } from 'react';
import './GridTile.css';

const GridTile = ({ index }: any) => {
    const [row, setRow] = useState(0);
    let isBarier: boolean = false;
    useEffect(() => {
        setRow(Math.floor(index / 10) + 1);
    }, [isBarier]);
    const checkNeighbours = () => {

    }
    return (
        <div id="grid-tile">{`row  ${row}`}</div>
    );
}
export default GridTile