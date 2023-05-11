import * as h from '../helpers';
var tiles = h.read(20, "tiles.txt").map((l:string[]) => {
    return {
        id: +l[0].match(/\d+/)![0],
        tile: l.slice(1).split('')
    }
});
// h.print(h.stringify(tiles.slice(0,2)));
type Tyle = {id: number, tile: string[][]};
var getBorders = (tile:string[][]) : string[] => {
    var borders = [tile[0], tile.last(), tile.col(0), tile.col(tile[0].length-1)].map(b => b.join(''));
    return borders.concat(borders.map((b:string) => b.split('').reverse().join('')));
}
var borders = tiles.map(t => getBorders(t.tile)).flat();
h.print(borders.unique().map(b => borders.count(b)).unique());
// ^^ every border is occurring a max of 2 times => if 2 borders match, their tiles MUST be adjacent
// also: corner tiles have only 2 borders that match any other border
var cornerTiles = tiles.filter(t => getBorders(t.tile).filter(b => borders.count(b) == 2).length == 4);
h.print("part 1:",cornerTiles.map(t => t.id),", product:", cornerTiles.map(t => t.id).prod());
// h.print(borders);

