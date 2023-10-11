import Tile from "../Models/Tile";

export class Node {
  val: Tile;
  priority: any;
  constructor(val: any, priority: any) {
    this.val = val;
    this.priority = priority;
  }
}

export class PQ {
  data: Node[] = [];

  enqueue(val: Tile, priority: any) {
    let newNode = new Node(val, priority);
    this.data.push(newNode);
    let index = this.data.length - 1;
    const current = this.data[index];

    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      let parent = this.data[parentIndex];

      if (parent.priority > current.priority) {
        this.data[parentIndex] = current;
        this.data[index] = parent;
        index = parentIndex;
      } else break;
    }
  }
  dequeue() {
    const min = this.data[0];
    const end = this.data.pop();
    if (!this.data.length) {
      return min;
    }
    this.data[0] = end!;

    let index = 0;
    const length = this.data.length;
    const current = this.data[0];
    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let leftChild, rightChild;
      let swap = null;

      if (leftChildIndex < length) {
        leftChild = this.data[leftChildIndex];
        if (leftChild.priority < current.priority) swap = leftChildIndex;
      }
      if (rightChildIndex < length) {
        rightChild = this.data[rightChildIndex];
        if (
          (swap === null && rightChild.priority < current.priority) ||
          (swap !== null && rightChild.priority < leftChild!.priority)
        )
          swap = rightChildIndex;
      }

      if (swap === null) break;
      this.data[index] = this.data[swap];
      this.data[swap] = current;
      index = swap;
    }

    return min;
  }
}
