import React, { useState, useEffect } from 'react';
import GridTile from '../GridTile/GridTile'
import './Grid.css'
import Tile from '../../util/Tile';
const Grid = () => {
    const [graph, setGraph] = useState<Tile[][]>();
    const rows: any = 10;
    const cols: any = 10;
    const visitedNodes: Tile[] = []
    const notVisitedNodes: Tile[] = []
    const [startNode, setStartNode] = useState<Tile>();
    const [endNode, setEndNode] = useState<Tile>();

    useEffect(() => {
        console.log(graph);
        if (!graph) setGraph(new Array(cols));
        console.log(graph);
        if (graph) {
            for (let index = 0; index < rows; index++) graph![index] = new Array(rows);
            for (let col = 0; col < cols; col++) for (let row = 0; row < rows; row++) {
                if (graph) {
                    graph![col][row] = new Tile(col, row, false);
                    notVisitedNodes.push(graph![col][row])
                }
            }
        }
        if (graph) {
            setStartNode(graph[0][0]);
            setEndNode(graph[cols - 1][rows - 1]);
            visitedNodes.push(startNode!);
        }

    }, [graph]);

    const aStar = () => {
        while (notVisitedNodes.length > 0) {

        }
    }

    return (
        <div id="Grid">
            {graph?.map((g, row) => g.map((tile, col) => <GridTile key={Math.random() * 100000} tile={tile.f} row={row} col={col} isVisited={tile.isVisited} callback={null} />))}
        </div>
    );
}
export default Grid;