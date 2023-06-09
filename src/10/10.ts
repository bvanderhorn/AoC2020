import * as h from '../helpers';
var adapters = h.read(10, "adapters.txt").tonum().sort((a,b) => a-b);
adapters.unshift(0);
adapters.push(adapters.last()+3);

// part 1
var diff = adapters.slice(1).map((a,i) => a - adapters[i]);
h.print("part 1: ",diff.count(1)*diff.count(3));

// part 2
var isMandatory = (adapters: number[], i: number) => [0, adapters.length -1].includes(i) || adapters[i] - adapters[i-1] == 3 || adapters[i+1] - adapters[i] == 3;
var getActualPermutations = (group: number[]) : number[][] => {
    var actualPermutations : number[][] = [[group[0]]];
    for (const member of group.slice(1,group.length -1)) {
        actualPermutations = actualPermutations.flatMap(p => [p, [...p, member]]);
    }
    actualPermutations.map(p => p.push(group.last()));
    return actualPermutations;
}
var validPermutations = (group: number[]) : number => {
    var p = getActualPermutations(group);
    return p.filter(p => p.slice(1).map((a,i) => a - p[i]).every(d => d <= 3)).length;
}
h.print("\nmandatory adapters @@rin red/@:")
adapters.printc(a => isMandatory(adapters, adapters.indexOf(a)), "r", ", ");
var mandatory = h.range(0, adapters.length).filter(i => isMandatory(adapters, i));
var groupIndices = mandatory.slice(0, mandatory.length -1).filter((m,i) => mandatory[i+1] !== m+1).map(m => [m, mandatory[mandatory.indexOf(m)+1]]);
var groups = groupIndices.map(g => adapters.slice(g[0], g[1]+1));
h.print("part 2: ", groups.map(g => validPermutations(g)).prod());