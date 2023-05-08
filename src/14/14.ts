import * as h from '../helpers';
type Member = {
    loc: number,
    value: number
}
var applyMask = (mask: string, value: number) : number => h.bin2dec(h.dec2bin(value).padStart(36,'0').split('').map((b:string, i:number) => mask[i] == 'X' ? b : mask[i]).join(''));
var applyMask2 = (mask: string, address: number) : number[] => {
    var addressBin = h.dec2bin(address).padStart(36,'0').split('');
    var addresses : number[] = [];
    var floatingBits = mask.split('').map((b:string, i:number) => b == 'X' ? i : -1).filter(i => i >= 0);
    var nofAddresses = 2**floatingBits.length;
    for (const i of h.range(0, nofAddresses)) {
        var floatingBitsValues = h.dec2bin(i).padStart(floatingBits.length,'0').split('');
        var newAddress = addressBin.map((b:string, i:number) => floatingBits.includes(i) ? floatingBitsValues[floatingBits.indexOf(i)] : mask[i] == '1' ? '1' : b).join('');
        addresses.push(h.bin2dec(newAddress));
    }
    return addresses;
}
var program = h.read(14, "program.txt");
var part = 2;
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
    if (part == 1){
        var existing = mem.findIndex(m => m.loc == loc);
        if (existing >= 0) mem[existing].value = applyMask(mask, +v[2]);
        else mem.push({loc: loc, value: applyMask(mask, +v[2])});
    } else {
        var addresses = applyMask2(mask, loc);
        for (const address of addresses) {
            var existing = mem.findIndex(m => m.loc == address);
            if (existing >= 0) mem[existing].value = +v[2];
            else mem.push({loc: address, value: +v[2]});
        }
    }
}
h.print("part ", part, ": ", mem.map(m => m.value).sum());