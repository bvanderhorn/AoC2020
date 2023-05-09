import * as h from '../helpers';
var cubes0 = h.read(17, "cubes.txt").map((l:string) => l.split('')).mapij((i:number, j:number, c:string) => c == '#' ? [i,j,0] : null).flat().filter((c:number[]) => c != null);
h.print(cubes0);

var part = 2;
var cycles = 6;
var dims = part == 1 ? 3 : 4;
var neighbors = h.getnbDim(dims);
var getNbSum = (cube:number[], cubes:number[][], neighbors: number[][]) : number => neighbors.map((n:number[]) => cube.plusEach(n)).filter((c:number[]) => cubes.includes2(c)).length;
var getInterestingCubes = (cubes:number[][], neighbors: number[][]) : number[][] => cubes.flatMap((c:number[]) => neighbors.map((n:number[]) => c.plusEach(n))).concat(cubes).unique();

var cubes = cubes0.map((c:number[]) => part == 1 ? c : c.concat([0]));
for (var c = 0; c < cycles; c++) {
    var interestingCubes = getInterestingCubes(cubes, neighbors);
    h.print("cycle ",c+1,": # cubes to check:", interestingCubes.length);
    var newCubes = [];
    for (const cube of interestingCubes) {
        var nbSum = getNbSum(cube, cubes, neighbors);
        if (cubes.includes2(cube)) {
            if ([2,3].includes(nbSum)) newCubes.push(cube);
        }
        else if (nbSum == 3) newCubes.push(cube); 
    }
    h.print(" -> active cubes:", newCubes.length);
    cubes = newCubes;
}
h.print("part ",part,":", cubes.length);