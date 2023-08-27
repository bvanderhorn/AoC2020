import { test } from 'node:test';
import * as h from '../helpers';

// neighbours (x = e, y = ne)
var nbstr = ['e','w','ne','sw','nw','se'];
var nbs = [[1,0],[-1,0],[0,1],[0,-1],[-1,1],[1,-1]];
var getNbCoor = (str: string) : number[] => nbs[nbstr.indexOf(str)];

var dissect = (input: string) : string[] => {
    var leftOver = input;
    var result: string[] = [];
    while (leftOver.length > 0) {
        var len = (leftOver[0] == 'e' || leftOver[0] == 'w') ? 1 : 2;
        result.push(leftOver.slice(0, len));
        leftOver = leftOver.slice(len);
    }
    return result;
}

var getCoor = (flipLine: string[]) : number[] => {    
    var coor = [0,0];
    for (const dir of flipLine) coor = coor.plusEach(getNbCoor(dir) ?? [0,0]);
    return coor;
}

var toCoor = (tile: string) : number[] => eval(`[${tile}]`);
var getNbsFromTile = (tile: string) : string[] => nbs.map(nb => toCoor(tile).plusEach(nb).toString());
var getAllTilesToConsider = (blackTiles: Set<string>) : Set<string> => {
    var allTiles = new Set<string>();
    blackTiles.forEach(bt => {
        allTiles.add(bt);
        getNbsFromTile(bt).forEach(x => allTiles.add(x));
    })
    return allTiles;
}
var getBlackNbCount = (tile:string, blackTiles: Set<string>) : number => 
    getNbsFromTile(tile).filter(nb => blackTiles.has(nb.toString())).length;

// execute
var flips = h.read(24, "flips.txt");

var blackTiles = new Set<string>();
for (const flipLine of flips) {
    var coor = getCoor(dissect(flipLine)).toString();
    if (blackTiles.has(coor)) blackTiles.delete(coor);
    else blackTiles.add(coor);
}
h.print("part 1: ", blackTiles.size);

var rounds = 100;
for (const round of h.range(0, rounds)){
    h.progress(round, rounds-1, 10);
    var allTiles = getAllTilesToConsider(blackTiles);
    var newBlackTiles = new Set<string>();
    for (const tile of allTiles) {
        var isBlack = blackTiles.has(tile);
        var blackNbCount = getBlackNbCount(tile, blackTiles);

        if ((isBlack && [1,2].includes(blackNbCount)) || (!isBlack && blackNbCount == 2)) newBlackTiles.add(tile);
    }
    blackTiles = newBlackTiles;
}
h.print("part 2: ", blackTiles.size);