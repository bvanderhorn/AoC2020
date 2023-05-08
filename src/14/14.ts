import * as h from '../helpers';
type Member = {
    loc: number,
    value: number
}
var applyMask = (mask: string, value: number) : number => {
    var maskR = mask.split('').reverse();
    var newbin = h.dec2bin(value).padStart(36,'0').split('').map((b:string, i:number) => mask[i] == 'X' ? b : mask[i]).join('');
    return h.bin2dec(newbin);
}
var program = h.read(14, "program.txt");
var mask: string = "";
var mem : Member[] = [];
for (const instruction of program) {
    var m = instruction.match(/mask = (\w+)$/);
    var v = instruction.match(/mem\[(\d+)\] \= (\d+)$/);
    if (m !== null) {
        mask = m[1];
        continue;
    }
    var loc = +v[1];
    var existing = mem.findIndex(m => m.loc == loc);
    if (existing >= 0) mem[existing].value = applyMask(mask, +v[2]);
    else mem.push({loc: loc, value: applyMask(mask, +v[2])});
}
h.print("part 1: ", mem.map(m => m.value).sum());