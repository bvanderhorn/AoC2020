import * as h from '../helpers';
var printTrees = (trees: boolean[][], sub:number|number[] = 0) => trees.mape(t => t ? "#" : ".").printc(t => t == "#", "r", "", "\n", sub);
var traverse = (trees: boolean[][], slope:number[]) : boolean[] => {
    var len = Math.ceil(trees.length / slope[1]);
    return h.range(0,len).map(i => trees[i * slope[1]][(i * slope[0]) % trees[0].length]);
}
var trees = h.read(3, "trees.txt").split("").mape(s => s == "#");
printTrees(trees, [10,31]);
h.print("part 1: " + traverse(trees, [3,1]).filter(t => t).length);
var slopes : number[][] = [[1,1],[3,1],[5,1],[7,1],[1,2]];
h.print("part 2: " + slopes.map(s => traverse(trees, s).filter(t => t).length).prod());