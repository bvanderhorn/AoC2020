import * as h from '../helpers';
type Tile = {id: number, tile: string[][], borders: string[], neighbors: Tile[]};
var getBorders = (tile:string[][]) : string[] => {
    var borders = [tile[0], tile.last(), tile.col(0), tile.col(tile[0].length-1)].map(b => b.join(''));
    return borders.concat(borders.map((b:string) => b.split('').reverse().join('')));
}
var getNeighbors = (tile:Tile, tiles:Tile[]) : Tile[] => tiles.filter(t => t.id != tile.id && t.borders.intersect(tile.borders).length > 0);
var remove = (tiles:Tile[], tile:Tile) : void => {tiles.splice(tiles.findIndex(t => t.id == tile.id),1);};
var includes = (tiles:Tile[], tile:Tile) : boolean => tiles.findIndex(t => t.id == tile.id) > -1;
var isBorderTile = (tile:Tile) : boolean => tile.neighbors.length < 4;
var tiles: Tile[] = h.read(20, "tiles.txt").map((l:string[]) => {
    return {
        id: +l[0].match(/\d+/)![0],
        tile: l.slice(1).split(''),
        borders: getBorders(l.slice(1).split('')),
        neighbors: []
    }
});
tiles = tiles.map(t => {t.neighbors = getNeighbors(t,tiles); return t;});

var borders = tiles.map(t => t.borders).flat();
h.print(borders.unique().map(b => borders.count(b)).unique());
// ^^ every border is occurring a max of 2 times => if 2 borders match, their tiles MUST be adjacent
// also: corner tiles have only 2 borders that match any other border
var cornerTiles = tiles.filter(t => t.borders.filter(b => borders.count(b) == 2).length == 4);
h.print("part 1:",cornerTiles.map(t => t.id),", product:", cornerTiles.map(t => t.id).prod());

// part 2
// ---- construct tile field ----
// (0,0)
var tileField: Tile[][] = [[cornerTiles[0]]]; 
var remainingTiles = tiles.filter(t => t.id != cornerTiles[0].id);
// (0,1)
var tile01 = cornerTiles[0].neighbors[0];
tileField[0].push(tile01);
remove(remainingTiles, tile01);
// first row
while (true) {
    var nextTile = tileField[0].last().neighbors.find((t:Tile) => includes(remainingTiles,t) && isBorderTile(t));
    h.print("next tile:", nextTile.id);
    tileField[0].push(nextTile);
    remove(remainingTiles, nextTile);
    if (nextTile.neighbors.length == 2) break;
}
// next rows
while (remainingTiles.length > 0) {
    h.print("line",tileField.length, ", remaining tiles:", remainingTiles.length)
    var nextLine: Tile[] = [];

    for (var i = 0; i < tileField[0].length; i++) {
        var nextTile = tileField.last()[i].neighbors.find((t:Tile) => 
            includes(remainingTiles,t) && ( i == 0 || nextLine.last().neighbors.includes(t) ) );
        nextLine.push(nextTile);
        remove(remainingTiles, nextTile);
    }
    tileField.push(nextLine);
}
h.print("tileField:",tileField.length,"x",tileField[0].length);
// h.print(tileField[0].map(t => t.tile.map(l => l.join(''))));

// ---- flip/crop tiles ----
var getFlips = (tile:Tile) : string[][][] => getFlipsRaw(tile.tile);
var getFlipsRaw = (array:any[][]) : any[][][] => {
    var flips = [0,1,2,3].map(i => array.rotate(i));
    return flips.concat(flips.map(t => t.transpose()));
}
var tileFieldCropped: string[][][][] = tileField.mapij((i:number,j:number,t:Tile) => {
    for (const flip of getFlips(t)) {
        if ( ((i == 0) || tileField[i-1][j].borders.includes(flip[0].join(''))) &&
             ((i == tileField.length-1) || tileField[i+1][j].borders.includes(flip.last().join(''))) &&
             ((j == 0) || tileField[i][j-1].borders.includes(flip.col(0).join(''))) &&
             ((j == tileField[0].length-1) || tileField[i][j+1].borders.includes(flip.col(flip[0].length-1).join(''))) 
            ) return flip.slice(1, flip.length-1).map(l => l.slice(1,l.length-1).join(''));
    }
});
// h.print(tileFieldCropped[0]);

// stitch tiles together
var tileFieldStitched: string[][] = tileFieldCropped.map(line => {
    var stitchedLine: string[] = [];
    for (var i = 0; i < line[0].length; i++) {
        stitchedLine.push(line.map(t => t[i]).flat().join(''));
    }
    return stitchedLine;
}).flat().split('');
h.print("tileFieldStitched:");
tileFieldStitched.printc(x => x == '#');

// seamonster relative coordinates
var getSeamonsterCoordinates = (seamonsterRaw: string[][]) : number[][] => seamonsterRaw.mapij((i,j,x) => x == '#' ? [i,j] : null).flat().filter(x => x != null);
var seamonsterRaw = h.read(20, "seamonster.txt").split('');
seamonsterRaw.print();
var seamonster: number[][] = getSeamonsterCoordinates(seamonsterRaw);
h.print(seamonster);

// search
var searchTileField = (tileField:string[][], seamonster: number[][]) : number => {
    // return all distinct coordinates of '#' which belong to a seamonster
    var result:number[][] = [];
    for (var i =0; i < tileField.length - seamonster.map(s => s[0]).max() ; i++){
        for (var j=0; j < tileField[0].length - seamonster.map(s => s[1]).max(); j++) {
            var sm = seamonster.map(s => tileField[i+s[0]][j+s[1]]);
            if (!sm.includes('.')) result = result.concat(seamonster.map(s => [i+s[0], j+s[1]]));
        }
    }
    return result.unique().length;
}

// search for all 8 seamonster flips
var total = tileFieldStitched.flat().count('#');
var scorePerFlip: number[] = getFlipsRaw(seamonsterRaw).map(f => searchTileField(tileFieldStitched, getSeamonsterCoordinates(f)));
h.print(scorePerFlip);
h.print("part 2:",total - scorePerFlip.max());