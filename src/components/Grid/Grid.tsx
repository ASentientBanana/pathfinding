import React, { useState, useEffect, createRef, useRef } from 'react';
import GridTile from '../GridTile/GridTile'
import './Grid.css'
import Tile from '../../util/Tile';

const Grid = () => {
    const tileSize: number = 25
    const graph = useRef<Tile[][]>();
    const startNode = useRef<Tile>();
    const endNode = useRef<Tile>();
    const [gridStyle, setGridStyle] = useState<any>()
    const gridRef = createRef<HTMLDivElement>();
    const db =  useRef<any>({})
    const mouseState = useRef(false)
    useEffect(() => {
        const [col, row] = setGrid();
        if(!graph.current)graph.current = new Array(row)
        if(graph.current){
            for (let i = 0; i < row; i++) {
                graph.current[i]= new Array(col)
                for (let j = 0; j < graph.current[i].length; j++) {
                    graph.current[i][j] = new Tile(j,i)
                }                   
            }
        }        
        // // adds neighbours
        if(graph.current){
            for (let i = 0; i < graph.current.length; i++) for(let j = 0; j < graph.current[i].length; j++) {
                graph.current[i][j].addNeighbors(graph.current);
            } 
            startNode.current = graph.current[20][15];
            // endNode.current = graph.current[graph.current.length-1][graph.current[graph.current.length-1].length-1]
            endNode.current = graph.current[0][0]
            // db[graph.current[graph.current.length-1][graph.current[graph.current.length-1].length-1].id].style['backgroundColor'] = "cyan";
        } 
        
    }, [graph.current]);


    const setGrid = (): number[] => {
        if (gridRef.current) {
            const widthCount: number = Math.floor(gridRef.current.clientWidth / 25)
            const heightCount:number = Math.floor(gridRef.current.clientHeight / 25)
            setGridStyle({
                display: 'grid',
                gridTemplateColumns: `repeat(${widthCount},25px)`,
                gridTemplateRows: `repeat(${43},25px)`,
                gridColumnGap:'0px',
                gridRowGap:'0px'
            })
            if (widthCount) {
                return [widthCount, heightCount]
            }
            else return [20, 20]
        } else return [20, 20]

    }
    
    let open: Tile[] = []
    let closed: Tile[] = []
    const aStar = () => {
        if (startNode.current) open.push(startNode.current)
        
        const interval = setInterval(() => {
            let current: Tile;
            current = open[0]
            open.forEach((tile: Tile, index: number) => {
                if (current.f > tile.f) current = tile;
            })
            open = open.filter((tile: Tile) => tile !== current)
            db.current[current.id].style['backgroundColor'] = "green";
            current.setTileVisited()
            if (endNode.current !== undefined && current === endNode.current) {
                if (startNode.current && endNode.current) retrace(startNode.current, endNode.current);
                clearInterval(interval)
                return;
            }
            closed.push(current)
            current.neighbors.forEach((tile: Tile) => {
                if (!closed.includes(tile)) {
                    let movementCost: number;
                    movementCost = current.g + getDistance(current, tile);
                    if (movementCost < tile.g || !open.includes(tile)) {
                        db.current[tile.id].style['backgroundColor'] = "purple";
                        tile.g = movementCost;
                        if (endNode.current) tile.h = getDistance(tile, endNode.current);
                        tile.previusTile = current;
                        open.push(tile);
                    }
                }
            })
            if (!(open.length > 0)) clearInterval(interval);
        }, 0)
    }
    const addToClosed = (tile: Tile) => {
        if (closed.includes(tile)) closed = closed.filter((t: Tile) => tile !== t)
        else closed.push(tile)

    }
    const retrace = (start: Tile, end: Tile) => {
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
                db.current[tile.id].style['backgroundColor'] = "blue";
            }, 1 * index)
        })
    }
    const test= ()=>{
        if(graph.current){
                for (let j = 0; j < graph.current[0].length; j++) {
                    setTimeout(()=>{
                        if(graph.current &&graph.current[0][j].x === 0 && graph.current[0][j].y===0) db.current[graph.current[0][j].id].style['backgroundColor'] = "blue";
                        else if( graph.current &&graph.current[0][j].x === graph.current.length-1  && graph.current[0][j].y===graph.current[0].length-1)db.current[graph.current[0][j].id].style['backgroundColor'] = "purple";
                        // else if(graph.current) db[graph.current[0][j].id].style['backgroundColor'] = "yellow";
                    },30*j)
            }
        }
    }
    const getDistance = (tileA: Tile, tileB: Tile): number => {
        const distX = Math.abs(tileA.x - tileB.x);
        const distY = Math.abs(tileA.y - tileB.y);
        if (distX > distY) return 14 * distX + 10 * (distX - distY);
        else return 14 * distY + 10 * (distY - distX)
    }
    const saveRef = (ref: React.RefObject<HTMLDivElement>, tile: Tile) => { db.current[tile.id] = ref.current; }
    // style={{ gridTemplateColumns: `${gridRowCount}`, gridTemplateRows: `${gridRowCount}`, rowGap: "0", columnGap: "0" }} 
    return (
        <div>
            <div id="Grid" style={gridStyle} ref={gridRef} onMouseDown={() => { mouseState.current = true; }} onMouseLeave={() => mouseState.current = false} onMouseUp={() => mouseState.current = false}>
                {graph.current?.map((g: any, i: number) => g.map((tile: any) => <GridTile key={Math.random() * 100000} close={addToClosed} tile={tile}  saveRef={saveRef} mouseState={mouseState} />))}
            </div>
            <button onClick={aStar}>Start</button>

        </div>
    );
}
export default Grid;

