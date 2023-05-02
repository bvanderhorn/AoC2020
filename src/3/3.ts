import * as h from '../helpers';
var printTrees = (trees: boolean[][]) => trees.mape(t => t ? "#" : ".").printc(t => t == "#");
var trees = h.read(3, "trees.txt").split("").mape(s => s == "#");
printTrees(trees);
