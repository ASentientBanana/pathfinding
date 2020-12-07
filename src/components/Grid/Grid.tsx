import React from 'react';
import GridTile from '../GridTile/GridTile'
import './Grid.css'

const Grid = () => {
    const x: number[] = [];
    for (let i = 0; i < 100; i++) {
        x.push(i)
    }
    return (
        <div id="Grid">
            {x.map(x => <GridTile index={x} />)}
        </div>
    );
}
export default Grid;