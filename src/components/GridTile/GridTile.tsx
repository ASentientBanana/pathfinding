import React, {
  useState,
  useEffect,
  createRef,
  useRef,
  MutableRefObject,
} from "react";
import "./GridTile.css";
import Tile from "../../util/Tile";
interface style {
  backgroundColor: string;
}
interface GridTile {
  mouseState: any;
  tile: Tile;
  isMovingStart: MutableRefObject<boolean>;
  isMovingEnd: MutableRefObject<boolean>;
  close: Function;
  saveRef: Function;
  moveStartEnd: Function;
}
const GridTile = ({
  tile,
  saveRef,
  close,
  mouseState,
  isMovingStart,
  isMovingEnd,
  moveStartEnd,
}: GridTile) => {
  const tileRef = createRef<HTMLDivElement>();
  const tileId = useRef<string>(`node-${tile.y}-${tile.x}`);
  useEffect(() => {
    resizeTiles();
    if (tile) tile.setId(tileId.current);
    if (tileRef.current) saveRef(tileRef, tile);
  }, [tile.f]);
  const resizeTiles = () => {
    if (tileRef.current) {
      const tile: HTMLDivElement = tileRef.current;
      tile.style.height = `${25}px`;
      tile.style.width = `${25}px`;
    }
  };
  const mouseDownHandler = () => {
    if (isMovingStart.current || isMovingEnd.current)
      moveStartEnd(tile.x, tile.y);
    else {
      tile.setWalkable();
      close(tile);
     if(!tile.isStartTile || !tile.isEndTile) {
       if(tileRef.current?.className.includes('obsticle')){
        tileRef.current?.classList.remove('obsticle')
      }else{
        tileRef.current?.classList.add('obsticle')
      }
     }
    }
  };
  return (
    <div
      className={`grid-tile `} 
      id={tileId.current}
      ref={tileRef}
      onClick={mouseDownHandler}
      onMouseOver={() => {
        if (mouseState.current) mouseDownHandler();
      }}
    ></div>
  );
};
export default GridTile;
