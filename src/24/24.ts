import * as h from '../helpers';

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
    // x = e, y = ne
    var dirs = new Map<string, number[]>([ ['e', [1,0]], ['w', [-1,0]], ['ne', [0,1]], ['sw', [0,-1]], ['nw', [-1,1]], ['se', [1,-1]]]);
    var coor = [0,0];
    for (const dir of flipLine) coor = coor.plusEach(dirs.get(dir) ?? [0,0]);
    return coor;
}

var flips = h.read(24, "flips.txt");
h.print(dissect(flips[0]));

var blackTiles = new Set<string>();
for (const flipLine of flips) {
    var coor = getCoor(dissect(flipLine)).toString();
    if (blackTiles.has(coor)) blackTiles.delete(coor);
    else blackTiles.add(coor);
}

h.print("part 1: ", blackTiles.size);