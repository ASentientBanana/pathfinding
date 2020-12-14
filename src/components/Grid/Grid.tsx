import React, { useState, useEffect, createRef, useRef } from 'react';
import GridTile from '../GridTile/GridTile'
import './Grid.css'
import Tile from '../../util/Tile';


const Grid = () => {
    const graph = useRef<Tile[][]>();
    const startNode = useRef<Tile>();
    const endNode = useRef<Tile>();
    const [gridStyle, setGridStyle] = useState<any>()
    const gridRef = createRef<HTMLDivElement>();
    const db = useRef<any>({})
    const mouseState = useRef(false)
    const colors = {
        bakgroundMainColor: "#262b2b",
        bakgroundColor: "#2d3636",
        accentGoldColor: "#eab354",
        accentGreyColor: "#5f787b",
        accentGreenColor: "#66ff66",
        accentRedColor: "#cc2900",
    };

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
    const aStar = () => {
        if (startNode.current) open.push(startNode.current)
        const interval = setInterval(() => {
            let current: Tile;
            open = open.sort((a, b) => a.f - b.f)
            console.log(open[0].f);

            current = open[0]
            open.shift()
            if (!current.isEndTile || !current.isStartTile) db.current[current.id].style['backgroundColor'] = colors.accentGreyColor;
            db.current[current.id].style['border'] = `${colors.accentGoldColor} 0.5px solid`;
            current.setTileVisited()
            if (endNode.current !== undefined && current === endNode.current) {
                if (startNode.current && endNode.current) retrace(startNode.current, endNode.current);
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
                    if (endNode.current) tile.h = getHeuristic(tile, endNode.current)
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
    const addToClosed = (tile: Tile) => {
        if (closed.includes(tile)) closed = closed.filter((t: Tile) => tile !== t)
        else closed.push(tile)

    }
    const getHeuristic = (tileA: Tile, tileB: Tile) => Math.abs(tileA.x - tileB.x) + Math.abs(tileA.y - tileB.y)

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
                db.current[tile.id].style['backgroundColor'] = colors.accentGoldColor;
                db.current[tile.id].style['border'] = `${colors.accentGreyColor} 0.5px solid`;
            }, 50 * index)
        })
    }
    const saveRef = (ref: React.RefObject<HTMLDivElement>, tile: Tile) => { db.current[tile.id] = ref.current; }


    return (
        <div>
            <div id="Grid" style={gridStyle} ref={gridRef}
                onMouseDown={() => { mouseState.current = true; }}
                onMouseLeave={() => mouseState.current = false}
                onMouseUp={() => mouseState.current = false}>
                {graph.current?.map((g: any, i: number) => g.map((tile: any) =>
                    <GridTile
                        key={Math.random() * 100000}
                        close={addToClosed}
                        tile={tile}
                        saveRef={saveRef}
                        mouseState={mouseState} />))}
            </div>
            <button onClick={aStar}>Start</button>
            {/* ()=>aStar(startNode.current,endNode.current,open,closed,db,colors) */}
        </div>
    );
}
export default Grid;

