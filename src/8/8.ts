import * as h from '../helpers';
var instructions = h.read(8, "boot.txt").split(/\s+/);
h.print(instructions.slice(0,5));

// part 1
var value = 0;
var visited: number[] = [];
var i = 0;
while (!visited.includes(i)) {
    visited.push(i);
    var instruction = instructions[i];
    h.print("instruction ",i,": ", instruction);
    value += instruction[0] == "acc" ? +instruction[1] : 0;
    i += instruction[0] == "jmp" ? +instruction[1] : 1;
}
h.print("part 1: ", value);