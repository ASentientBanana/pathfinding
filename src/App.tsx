import React,{useRef} from 'react';
import Grid from './components/Grid/Grid';
import Tile from './components/GridTile/GridTile';
import './App.css'
function App() {
  const startNode = useRef<Tile>();
  const endNode = useRef<Tile>();
  const obsticlePositionArray = useRef<Tile[]>([])
  const classDatabase = {}
  const fullClearboard = ()=> {
    console.log('test 1');
    console.log(obsticlePositionArray);
    obsticlePositionArray.current = []
    console.log(obsticlePositionArray);
    console.log('test 2');
  }
  
  return (
    <div className="app">
      <Grid startTile ={startNode} endTile={endNode}  obsticlePos={obsticlePositionArray} classDatabase ={classDatabase} fullClear={fullClearboard}/>
    </div>
  );

}

export default App;
