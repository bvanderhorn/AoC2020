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

// ---- flip/crop tiles ----
var getFlips = (tile:Tile) : string[][][] => {
    var flips = [0,1,2,3].map(i => tile.tile.rotate(i));
    return flips.concat(flips.map(t => t.reverse()));
}
var tileFieldCropped: string[][][][] = tileField.mapij((i:number,j:number,t:Tile) => {
    for (const flip of getFlips(t)) {
        if ( (i == 0 || tileField[i-1][j].borders.includes(flip[0].join(''))) &&
             (i == tileField.length-1 || tileField[i+1][j].borders.includes(flip.last().join(''))) &&
             (j == 0 || tileField[i][j-1].borders.includes(flip.col(0).join(''))) &&
             (j == tileField[0].length-1 || tileField[i][j+1].borders.includes(flip.col(flip[0].length-1).join(''))) 
            ) return flip.slice(1, flip.length-1).map(l => l.slice(1,l.length-1));
    }
});

// stitch tiles together
var tileFieldStitched: string[] = tileFieldCropped.map(line => {
    var stitchedLine: string[] = [];
    for (var i = 0; i < line[0].length; i++) {
        stitchedLine.push(line.map(t => t[i].join('')).join(''));
    }
    return stitchedLine;
}).flat();
h.print("tileFieldStitched:",tileFieldStitched);