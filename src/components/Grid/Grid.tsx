import React, { useState, useEffect, createRef, useRef } from 'react';
import GridTile from '../GridTile/GridTile'
import './Grid.css'
import Tile from '../../util/Tile';

const Grid = () => {
    const [graph, setGraph] = useState<Tile[][]>();
    const rows: number = 20;
    const cols: number = 20;
    const tileSize: number = 25
    const [visitedNodes, setVisitedNodes] = useState<Tile[]>()
    const [notVisitedNodes, setNotVisitedNodes] = useState<Tile[]>()
    const [startNode, setStartNode] = useState<Tile>();
    const [endNode, setEndNode] = useState<Tile>();
    const [gridRowCount, setGridRowCount] = useState<string>()
    const gridRef = createRef<HTMLDivElement>();
    const mouseState = useRef(false)
    useEffect(() => {
        if (!graph) setGraph(new Array(cols));
        if (graph) {
            for (let index = 0; index < rows; index++) graph![index] = new Array(rows);
            for (let col = 0; col < cols; col++) for (let row = 0; row < rows; row++) {
                if (graph) {
                    graph![col][row] = new Tile(col, row);
                    if (notVisitedNodes) setNotVisitedNodes([...notVisitedNodes, graph![col][row]])
                }
            }
        }
        //adds neighbours
        if (graph) for (let i = 0; i < graph.length; i++) for (let j = 0; j < graph[i].length; j++) graph[i][j].addNeighbors(graph)
        if (graph) {
            setStartNode(graph[0][0]);
            setEndNode(graph[cols - 1][rows - 1]);
            if (visitedNodes && startNode) setNotVisitedNodes([...visitedNodes, startNode])
        }
        setGrid()
    }, [graph]);


    const setGrid = () => {
        let t = '';
        for (let i = 0; i < rows; i++) {
            t += '1fr '
        }
        console.log(t);
        console.log(gridRowCount);

        setGridRowCount(t)
    }

    const db: any = {}
    let open: Tile[] = []
    let closed: Tile[] = []
    const aStar = () => {
        if (startNode) open.push(startNode)

        const interval = setInterval(() => {
            let current: Tile;
            current = open[0]
            open.forEach((tile: Tile, index: number) => {
                if (current.f > tile.f) current = tile;
            })
            open = open.filter((tile: Tile) => tile !== current)
            db[current.id].style['backgroundColor'] = "green";
            current.setTileVisited()
            if (endNode != undefined && current === endNode) {
                if (startNode && endNode) retrace(startNode, endNode);
                clearInterval(interval)
                return;
            }
            closed.push(current)
            current.neighbors.forEach((tile: Tile) => {
                if (!closed.includes(tile)) {
                    let movementCost: number;
                    movementCost = current.g + getDistance(current, tile);
                    if (movementCost < tile.g || !open.includes(tile)) {
                        db[tile.id].style['backgroundColor'] = "purple";
                        tile.g = movementCost;
                        if (endNode) tile.h = getDistance(tile, endNode)
                        tile.previusTile = current;
                        open.push(tile)
                    }
                }
            })
            if (!(open.length > 0)) clearInterval(interval);
        }, 3)
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
                db[tile.id].style['backgroundColor'] = "blue";
            }, 15 * index)
        })

    }
    const getDistance = (tileA: Tile, tileB: Tile): number => {
        const distX = Math.abs(tileA.x - tileB.x);
        const distY = Math.abs(tileA.y - tileB.y);
        if (distX > distY) return 14 * distX + 10 * (distX - distY)
        else return 14 * distY + 10 * (distY - distX)
    }
    const saveRef = (ref: React.RefObject<HTMLDivElement>, tile: Tile) => { db[tile.id] = ref.current; }

    return (
        <div>
            <div id="Grid" style={{ gridTemplateColumns: `${gridRowCount}`, gridTemplateRows: `${gridRowCount}`, rowGap: "0", columnGap: "0" }} ref={gridRef} onMouseDown={() => { mouseState.current = true; }} onMouseLeave={() => mouseState.current = false} onMouseUp={() => mouseState.current = false}>
                {graph?.map((g) => g.map((tile) => <GridTile key={Math.random() * 100000} close={addToClosed} tile={tile} rowTileCount={rows} tileSize={tileSize} saveRef={saveRef} mouseState={mouseState} />))}
            </div>
            <button onClick={aStar}>Start</button>

        </div>
    );
}
export default Grid;

