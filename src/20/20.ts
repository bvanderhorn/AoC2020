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

var borders = tiles.map(t => getBorders(t.tile)).flat();
h.print(borders.unique().map(b => borders.count(b)).unique());
// ^^ every border is occurring a max of 2 times => if 2 borders match, their tiles MUST be adjacent
// also: corner tiles have only 2 borders that match any other border
var cornerTiles = tiles.filter(t => getBorders(t.tile).filter(b => borders.count(b) == 2).length == 4);
h.print("part 1:",cornerTiles.map(t => t.id),", product:", cornerTiles.map(t => t.id).prod());

// part 2
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