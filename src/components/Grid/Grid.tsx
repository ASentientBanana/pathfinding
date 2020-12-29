import React, { useState, useEffect, createRef, useRef } from "react";
import GridTile from "../GridTile/GridTile";
import "./Grid.css";
import Tile from "../../util/Tile";
import aStar from "../../util/Astar";
import djikstra from "../../util/Djikstra";
import bfs from "../../util/BFS";
import { moveStartColor } from "../../util/Utility";
const sleep = (ms: any) => new Promise((res) => setTimeout(res, ms));

const Heap = require("heap");

const Grid = (props: any) => {
	const graph = useRef<Tile[][]>();
	const startNode: React.MutableRefObject<Tile | undefined> = props.startTile;
	const endNode: React.MutableRefObject<Tile | undefined> = props.endTile;
	const [gridStyle, setGridStyle] = useState<any>();
	const gridRef = createRef<HTMLDivElement>();
	const db = useRef<any>({});
	const mouseState = useRef(false);
	const isMovingStart = useRef<boolean>(false);
	const isMovingEnd = useRef<boolean>(false);
	const [rend, setRend] = useState<boolean>(false);
	const clickable = useRef<boolean>(false);
	const openHeapAstar = new Heap((a: Tile, b: Tile) => a.f - b.f);
	const openHeapDjikstra = new Heap((a: Tile, b: Tile) => a.g - b.g);
	let openList: Tile[] = [];
	const closed = useRef<Tile[]>([]);

	useEffect(() => { setup() }, [graph.current, rend]);
	const setup = async () => {
		const [col, row] = setGrid();
		if (!graph.current) graph.current = new Array(row);
		if (graph.current) {
			for (let i = 0; i < row; i++) {
				graph.current[i] = new Array(col);
				for (let j = 0; j < graph.current[i].length; j++) {
					graph.current[i][j] = new Tile(j, i);
				}
			}
		}
		// // adds neighbours and walls
		await sleep(500)
		if (graph.current) {
			for (let i = 0; i < graph.current.length; i++)
				for (let j = 0; j < graph.current[i].length; j++) {
					graph.current[i][j].addNeighbors(graph.current);
				}
			try {
				if (graph.current && db.current) {
					if (!startNode.current) setStart()
					else setStart(startNode.current.x, startNode.current.y, true)
					if (!endNode.current) setEnd()
					else setEnd(endNode.current.x, endNode.current.y, true)
					console.log(endNode);

				}
				
			} catch (error) { }
			if(props.obsticlePos.current.length > 0){
				props.obsticlePos.current.forEach((tile:Tile)=>{
					tileState(tile,'obsticle')
					if(graph.current)closed.current.push(graph.current[tile.y][tile.x])
				})
			}
			console.log(props.obsticlePos.current.length);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
		clickable.current = true;

	};
	const setStart = (x: number = 5, y: number = 5, isRedraw: boolean = false) => {
		try {
			if (startNode.current && isRedraw) {
				startNode.current.isEndTile = false;
				db.current[startNode.current.id].classList.remove('startTile')
			}
			startNode.current = graph.current![y][x]
				startNode.current.isEndTile = true;
				db.current[startNode.current.id].classList.add('startTile')
		} catch { }

		console.log(startNode.current);
	}
	const setEnd = (x: number = 5, y: number = 9, isRedraw: boolean = false) => {
		try {
			if (endNode.current && isRedraw) {
				db.current[endNode.current.id].classList.remove('endTile')
				endNode.current.isEndTile = false;
			}
			endNode.current = graph.current![y][x]
			if (endNode.current) {
				db.current[endNode.current.id].classList.add('endTile')
				endNode.current.isEndTile = true;
			}
		} catch (error) { }
	}
	const tileState = (tile: Tile, className: string) => {
		// .obsticle  .visiting .visited 
		const x =db.current[tile.id]
		console.log(x.className);
		x.classList.add(className)
	}
	const clearTileClass = (tile:Tile) =>{
		db.current[tile.id].className = 'grid-tile'
	}
	const setGrid = (): number[] => {
		if (gridRef.current) {
			const widthCount: number = Math.floor(gridRef.current.clientWidth / 25);
			const heightCount: number = Math.floor(gridRef.current.clientHeight / 25);
			setGridStyle({
				display: "grid",
				gridTemplateColumns: `repeat(${widthCount},25px)`,
				gridTemplateRows: `repeat(${heightCount},25px)`,
				gridColumnGap: "0px",
				gridRowGap: "0px",
			});
			if (widthCount) {
				return [widthCount, heightCount];
			} else return [20, 20];
		} else return [20, 20];
	};

	const addToClosed = (tile: Tile) => {
		if (closed.current.includes(tile)) {
			closed.current = closed.current.filter((t: Tile) => tile !== t);
		} else {
			closed.current.push(tile);
		}
	};

	const saveRef = (ref: React.RefObject<HTMLDivElement>, tile: Tile) => {
		db.current[tile.id] = ref.current;
	};
	const tileOnClickHandler = (x: number, y: number) => {
		if (isMovingStart.current) {
			if (startNode.current && graph.current) setStart(x, y, true)
		} else if (isMovingEnd.current) {
			if (endNode.current && graph.current) setEnd(x, y, true)
		} else {
			if (graph.current) tileState(graph.current[y][x], 'obsticle')
		}
		isMovingStart.current = false;
		isMovingEnd.current = false;
	}
	const updateTile = (
		id: string,
		fCost: number,
		hCost: number,
		gCost: number
	) => {
		db.current[id].innerText = `f:${fCost} h:${hCost} g:${gCost}`;
	};
	const clearBoard = () => {
		if(graph.current)graph.current.forEach((r,index) => {
			r.forEach((tile:Tile)=>{
				if(!tile.isStartTile && !tile.isEndTile) {
					clearTileClass(tile);
					closed.current = closed.current.filter((tileC:Tile)=> tile === tileC)
				}else{
					db.current[tile.id].classList.remove('path')
					db.current[tile.id].classList.remove('visited')
					db.current[tile.id].classList.remove('visiting')
				}
			})
			
		});
		clickable.current = true;
	};
	const clearBordWithWalls = () => {
		if(graph.current)graph.current.forEach((r:Tile[]) => {
			r.forEach((tile:Tile)=>{
				if(!tile.isStartTile && !tile.isEndTile ) {
					if(tile.isWalkable){
						clearTileClass(tile);
						closed.current = closed.current.filter((tileC:Tile)=> tile.isWalkable)
					}
				}
			})
			
		});
		clickable.current = true;
	}
	return (
		<div>
			<div
				id="Grid"
				style={gridStyle}
				ref={gridRef}
				onMouseDown={() => {
					mouseState.current = true;
				}}
				onMouseLeave={() => (mouseState.current = false)}
				onMouseUp={() => (mouseState.current = false)}
			>
				{graph.current?.map((g: any, i: number) =>
					g.map((tile: any) => (
						<GridTile
							key={Math.random() * 100000}
							moveStartEnd={tileOnClickHandler}
							close={addToClosed}
							tile={tile}
							saveRef={saveRef}
							isMovingStart={isMovingStart}
							isMovingEnd={isMovingEnd}
							mouseState={mouseState}
						/>
					))
				)}
			</div>
			<div className="button-tray">
				<div>
					<button
						onClick={() => {
												
							if (!clickable.current) return;
							if (startNode.current && endNode.current) {
								aStar(
									startNode.current,
									endNode.current,
									openHeapAstar,
									closed,
									db.current,
									updateTile,
									tileState,
								);
							}
							clickable.current = false;
						}}
					>
						Start Astar
      </button>
					<button
						onClick={() => {
							if (!clickable.current) return;
							if (startNode.current && endNode.current)
								djikstra(
									startNode.current,
									endNode.current,
									openHeapDjikstra,
									closed,
									db.current,
									tileState
								);
							clickable.current = false;
						}}
					>
						Djikstra
      </button>
					<button
						onClick={() => {
							if (!clickable.current) return;
							if (startNode.current && endNode.current) bfs(startNode.current, endNode.current, db.current, openList, closed, tileState)
							clickable.current = false;
						}}
					>
						BFS
      </button>
				</div>
				<div>

					<button
						className="start"
						onClick={() => {
							if (!clickable.current) return;
							isMovingEnd.current = false;
							isMovingStart.current = true;
						}}
					>
						Move Start Node
      </button>
					<button
						className="end"
						onClick={() => {
							if (!clickable.current) return;
							isMovingStart.current = false;
							isMovingEnd.current = true;
						}}
					>
						Move End Node
      </button>
					<button onClick={()=>{
						props.fullClear()
						clearBoard()
					}}>Clear Board</button>
					{/* <button onClick={()=>{
						clearBordWithWalls()
					}}>Clear Board Leave Walls</button> */}
				</div>
			</div>
		</div>
	);
}
export default Grid;
