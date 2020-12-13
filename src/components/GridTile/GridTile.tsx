import React, { useState, useEffect, createRef, useRef } from 'react';
import './GridTile.css';
import Tile from '../../util/Tile';
interface style {
    backgroundColor: string
}
interface prop {
    mouseState: any,
    tile: Tile,
    close: Function,
    saveRef: Function,
    startTilleState: boolean,
    endTileState: boolean
}
const GridTile = ({ tile, saveRef, close, mouseState, startTilleState, endTileState }: prop) => {
    // {`${tile.isVisited}`}
    const tileRef = createRef<HTMLDivElement>();
    const tileId = useRef<string>(`node-${tile.y}-${tile.x}`);
    const [obsticle, setObsticle] = useState<string>('null')
    useEffect(() => {
        console.log('tile render');
        resizeTiles()
        if (tile) tile.setId(tileId.current);
        if (tileRef.current) saveRef(tileRef, tile);
    }, [tile.f])
    const resizeTiles = () => {
        if (tileRef.current) {
            const tile: HTMLDivElement = tileRef.current;
            tile.style.height = `${25}px`
            tile.style.width = `${25}px`
        }
    }
    const setObsticleOnMouseDown = () => {
        if (startTilleState) {

        } else if (endTileState) {

        }
        else {
            tile.setWalkable();
            close(tile)
            if (obsticle === 'null') setObsticle('obsticle')
            else setObsticle('null')
        }

    }
    let colorStart: string = "";
    return <div className={`grid-tile ${obsticle}`} id={tileId.current} ref={tileRef} onClick={setObsticleOnMouseDown}
        onMouseOver={() => {
            if (mouseState.current) setObsticleOnMouseDown()
        }}
        style={{ backgroundColor: colorStart }}
    ></div>
}
export default GridTile

