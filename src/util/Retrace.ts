import Tile from "./Tile";

const retrace = (start: Tile, end: Tile, db: any) => {
    const colors = {
    bakgroundMainColor: "#262b2b",
    bakgroundColor: "#2d3636",
    accentGoldColor: "#eab354",
    accentGreyColor: "#5f787b",
    accentGreenColor: "#66ff66",
    accentRedColor: "#cc2900",
  };
    const path: Tile[] = [];
    let current: Tile = end;
    while (current !== start) {
        path.push(current);
        if (current.previusTile) current = current.previusTile;
    }
    path.push(start);
    path.reverse();
    path.forEach((tile: Tile, index: number) => {
        setTimeout(() => {
            db[tile.id].classList.add('path')
        }, 10 * index);
    });
};

export default retrace;