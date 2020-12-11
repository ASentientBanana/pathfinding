import React, { useState, useEffect, createRef } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect'
import './GridTile.css';
import Tile from '../../util/Tile';
interface style {
    backgroundColor: string
}
interface prop {
    mouseState: any,
    tile: Tile,
    rowTileCount: number,
    tileSize: number,
    close: Function,
    saveRef: Function,
}
const GridTile = ({ tile, tileSize, saveRef, close, mouseState }: prop) => {
    // {`${tile.isVisited}`}
    const tileRef = createRef<HTMLDivElement>();
    const [tileId, setTileId] = useState<string>(`node-${tile.y}-${tile.x}`);
    const [obsticle, setObsticle] = useState<string>('null')
    useEffect(() => {
        resizeTiles()
        if (tile) tile.setId(tileId);
        if (tileRef.current) saveRef(tileRef, tile);
    }, [])
    const resizeTiles = () => {
        if (tileRef.current) {
            const tile: HTMLDivElement = tileRef.current;
            tile.style.height = `${tileSize}px`
            tile.style.width = `${tileSize}px`
        }
    }
    const setObsticleOnMouseDown = () => {
        tile.setWalkable();
        close(tile)//evoooo
        if (obsticle === 'null') setObsticle('obsticle')
        else setObsticle('null')
        console.log(tile.isWalkable);
    }

    return <div className={`grid-tile ${obsticle}`} id={tileId} ref={tileRef} onClick={setObsticleOnMouseDown}
        onMouseOver={() => {
            if (mouseState.current) setObsticleOnMouseDown()
        }}
    >{tile.isWalkable}</div>
}
export default GridTile

