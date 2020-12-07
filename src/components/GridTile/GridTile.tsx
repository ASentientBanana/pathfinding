import React, { useState, useEffect } from 'react';
import './GridTile.css';

const GridTile = ({ row , col ,callback,tile}: any) => {
    let isBarier: boolean = false;
    useEffect(()=>{
        
    },[isBarier]);
    const checkNeighbours = () => {
        callback(row,col);
        isBarier= true;
    }
return  <div id="grid-tile" onClick={checkNeighbours}>{tile}</div>
}
export default GridTile