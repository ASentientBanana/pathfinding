import React, {useState, useEffect } from 'react';
import GridTile from '../GridTile/GridTile'
import './Grid.css'

const Grid = () => {
    const [graph,setGraph] = useState<number[][]>([
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0]
    ]);
    useEffect(()=>{},[graph]);
    const changeTile= (row:number,col:number)=>{
        graph[row][col] = 1;
        if(col !== graph[0].length-1) graph[row][col+1] = 1;
        if(col !== 0) graph[row][col-1] = 1;
        if(row !== graph.length-1) graph[row+1][col] = 1;
        if(row !== 0) graph[row-1][col] = 1;
        setGraph([...graph])
    }
    return (
        <div id="Grid">
            {graph.map((g,row)=>g.map((tile,col)=> <GridTile key={Math.random()*100000} tile={tile} row={row} col={col} callback={changeTile}/>))}
        </div>
    );
}
export default Grid;