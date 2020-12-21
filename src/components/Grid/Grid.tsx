import React, { useState, useEffect, createRef, useRef } from 'react';
import GridTile from '../GridTile/GridTile'
import './Grid.css'
import Tile from '../../util/Tile';
import aStar from '../../util/Astar';
import djikstra from '../../util/Djikstra';
const Heap = require('heap');


const Grid = () => {
    const graph = useRef<Tile[][]>();
    const startNode = useRef<Tile>();
    const endNode = useRef<Tile>();
    const [gridStyle, setGridStyle] = useState<any>()
    const gridRef = createRef<HTMLDivElement>();
    const db = useRef<any>({})
    const mouseState = useRef(false)
    const isMovingStart = useRef<boolean>(false)
    const isMovingEnd = useRef<boolean>(false)
    const colors = {
        bakgroundMainColor: "#262b2b",
        bakgroundColor: "#2d3636",
        accentGoldColor: "#eab354",
        accentGreyColor: "#5f787b",
        accentGreenColor: "#66ff66",
        accentRedColor: "#cc2900",
    };
    const openHeap = new Heap((a: Tile, b: Tile) =>  a.f -  b.f );

    useEffect(() => {
        const [col, row] = setGrid();
        if (!graph.current) graph.current = new Array(row)
        if (graph.current) {
            for (let i = 0; i < row; i++) {
                graph.current[i] = new Array(col)
                for (let j = 0; j < graph.current[i].length; j++) {
                    graph.current[i][j] = new Tile(j, i)
                }
            }
        }
        // // adds neighbours
        if (graph.current) {
            for (let i = 0; i < graph.current.length; i++) for (let j = 0; j < graph.current[i].length; j++) {
                graph.current[i][j].addNeighbors(graph.current);
            }
            const tmpinterval = setInterval(() => {
                try {
                    if (graph.current) {

                        startNode.current = graph.current[0][0]
                        if (startNode.current && db.current) db.current[startNode.current.id].style['backgroundColor'] = colors.accentGreenColor;

                        endNode.current = graph.current[graph.current.length - 1][graph.current[graph.current.length - 1].length - 1]
                        if (endNode.current && db.current) db.current[endNode.current.id].style['backgroundColor'] = colors.accentRedColor;
                        clearInterval(tmpinterval)
                    }
                } catch (error) {
                }
            }, 200)
        }
    }, [graph.current]);

    const setGrid = (): number[] => {
        if (gridRef.current) {
            const widthCount: number = Math.floor(gridRef.current.clientWidth / 25)
            const heightCount: number = Math.floor(gridRef.current.clientHeight / 25)
            setGridStyle({
                display: 'grid',
                gridTemplateColumns: `repeat(${widthCount},25px)`,
                gridTemplateRows: `repeat(${43},25px)`,
                gridColumnGap: '0px',
                gridRowGap: '0px'
            })
            if (widthCount) {
                return [widthCount, heightCount]
            }
            else return [20, 20]
        } else return [20, 20]

    }

    let open: Tile[] = []
    let closed: Tile[] = []

    const addToClosed = (tile: Tile) => {
        if (closed.includes(tile)) closed = closed.filter((t: Tile) => tile !== t)
        else closed.push(tile)

    }

    const saveRef = (ref: React.RefObject<HTMLDivElement>, tile: Tile) => { db.current[tile.id] = ref.current; }
    const tileOnClickHandler = (x: number, y: number) => {
        if (isMovingStart.current) {
            if (startNode.current && graph.current) {
                db.current[startNode.current.id].style['backgroundColor'] = colors.bakgroundColor;
                startNode.current = graph.current[y][x];
                db.current[startNode.current.id].style['backgroundColor'] = colors.accentGreenColor;
            }
        } else if (isMovingEnd.current) {
            if (endNode.current && graph.current) {
                db.current[endNode.current.id].style['backgroundColor'] = colors.bakgroundColor;
                endNode.current = graph.current[y][x];
                db.current[endNode.current.id].style['backgroundColor'] = colors.accentRedColor;
            }
        }
        isMovingStart.current = false;
        isMovingEnd.current = false;
    }
    const updateTile = (id: string, fCost: number, hCost: number, gCost: number) => {
        db.current[id].innerText = `f:${fCost} h:${hCost} g:${gCost}`;
    }
    return (
        <div>
            <div id="Grid" style={gridStyle} ref={gridRef}
                onMouseDown={() => { mouseState.current = true; }}
                onMouseLeave={() => mouseState.current = false}
                onMouseUp={() => mouseState.current = false}>
                {graph.current?.map((g: any, i: number) => g.map((tile: any) =>
                    <GridTile
                        key={Math.random() * 100000}
                        moveStartEnd={tileOnClickHandler}
                        close={addToClosed}
                        tile={tile}
                        saveRef={saveRef}
                        isMovingStart={isMovingStart}
                        isMovingEnd={isMovingEnd}
                        mouseState={mouseState} />))}

            </div>
            <button onClick={() => {
                if (startNode.current && endNode.current) aStar(startNode.current, endNode.current, openHeap, closed, db.current, colors, updateTile)
            }}>Start Astar</button>
            <button onClick={() => {
                if (startNode.current && endNode.current) djikstra(startNode.current, endNode.current, open, closed, db.current, colors)
            }}>Djikstra</button>
            <button onClick={() => {
                isMovingEnd.current = false;
                isMovingStart.current = true;
            }}>Move Start</button>
            <button onClick={() => {
                isMovingStart.current = false
                isMovingEnd.current = true;
            }}>Move End</button>
        </div>
    );
}
export default Grid;

