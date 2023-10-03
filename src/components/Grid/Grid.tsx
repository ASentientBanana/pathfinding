import React, { useState, useEffect, createRef, useRef } from "react";
import GridTile from "../GridTile/GridTile";
import "./Grid.css";
import Tile from "../../util/Tile";
import aStar from "../../util/Astar";
import djikstra from "../../util/Djikstra";
import bfs from "../../util/BFS";
import { moveStartColor } from "../../util/Utility";
import useGridSize from "../../hooks/useGridSize";
//@ts-ignore
import Heap from 'heap';
import MainContainer from "../MainContainer";
const sleep = (ms: any) => new Promise((res) => setTimeout(res, ms));




const generateGrid = () => {

}


const Grid = (props: any) => {
	const grid = useState<Tile[][]>();
	const containerRef = useRef<HTMLDivElement>(null);
	const [width, height] = useGridSize(containerRef.current);

	return (
		<div ref={containerRef} style={{}}>

		</div>
	);
}
export default Grid;
