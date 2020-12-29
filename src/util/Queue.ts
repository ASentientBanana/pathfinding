import Tile from "./Tile";

class Queue<T>{
    items:T[] = [];
    constructor(){
        this.items = []
    }
     isEmpty() {
        if(this.items.length === 0) return true;
        else return false;

    }
    pop(){
       return this.items.pop();
    }
    push(item:T){
        this.items.push(item)
    }
    shift(){
        return this.items.shift()
    }

}


export default Queue;