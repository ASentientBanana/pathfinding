import Tile from './Tile'

export const moveStartColor = (startTile: Tile, db: any, isAdditive: boolean = false) => {
    if (isAdditive) db[startTile.id].classList.add('startTile')
    else db[startTile.id].classList.remove('startTile')
}
export const moveStartNode = (graph: Tile[][], startNode: Tile, x: number, y: number, startPos: number[]) => {
    startPos[0] = y;
    startPos[1] = x;
    if (graph) startNode = graph[startPos[0]][startPos[1]]
}
export const moveEndColor = (endTile: Tile, db: any, isAdditive: boolean = false) => {
    if (isAdditive) db[endTile.id].classList.add('startTile')
    else db[endTile.id].classList.remove('startTile')
}
export const moveEndNode = (graph: Tile[][], endNode: Tile, x: number, y: number, endPos: number[]) => {
    endPos[0] = y;
    endPos[1] = x;
    if (graph) endNode = graph[endPos[0]][endPos[1]]
}


// const colors = {
  //   bakgroundMainColor: "#262b2b",
  //   bakgroundColor: "#2d3636",
  //   accentGoldColor: "#eab354",
  //   accentGreyColor: "#5f787b",
  //   accentGreenColor: "#66ff66",
  //   accentRedColor: "#cc2900",
  // };