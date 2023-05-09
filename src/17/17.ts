import * as h from '../helpers';
var cubes0 = h.read(17, "cubes.txt").map((l:string) => l.split('')).mapij((i:number, j:number, c:string) => c == '#' ? [i,j,0] : null).flat().filter((c:number[]) => c != null);
h.print(cubes0);

// part 1
var neighbors = h.getndb3d();
var getNbSum = (cube:number[], cubes:number[][]) : number => neighbors.map((n:number[]) => cube.plusEach(n)).filter((c:number[]) => cubes.includes2(c)).length;
var getOuterBoundaries = (cubes:number[][]) : number[][] => [0,1,2].map((i:number) => [Math.min(...cubes.map((c:number[]) => c[i]))-1, Math.max(...cubes.map((c:number[]) => c[i]))+1]);
h.print(getOuterBoundaries(cubes0));
var cycles = 6;
var cubes = cubes0.copy();
for (var c = 0; c < cycles; c++) {
    var outerBoundaries = getOuterBoundaries(cubes);
    var newCubes = [];
    for (var i = outerBoundaries[0][0]; i <= outerBoundaries[0][1]; i++) {
        for (var j = outerBoundaries[1][0]; j <= outerBoundaries[1][1]; j++) {
            for (var k = outerBoundaries[2][0]; k <= outerBoundaries[2][1]; k++) {
                var cube = [i,j,k];
                var nbSum = getNbSum(cube, cubes);
                if (cubes.includes2(cube)) {
                    if ([2,3].includes(nbSum)) newCubes.push(cube);
                }
                else if (nbSum == 3) newCubes.push(cube);
            }
        }
    }
    h.print("cycle ",c+1,": ", newCubes.length);
    cubes = newCubes;
}