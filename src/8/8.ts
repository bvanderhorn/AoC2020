import * as h from '../helpers';
type State = {
    valid: boolean,
    value: number,
    reason: string,
    visited: number[]
}
var doRun = (instructions: string[][]) : State => {
    var value = 0;
    var visited: number[] = [];
    var i = 0;
    while (!visited.includes(i) && i < instructions.length) {
        visited.push(i);
        var instruction = instructions[i];
        value += instruction[0] == "acc" ? +instruction[1] : 0;
        i += instruction[0] == "jmp" ? +instruction[1] : 1;
    }
    return {
        valid: i == instructions.length,
        value: value,
        reason: i == instructions.length ? "success" : i < instructions.length ? "loop" : ("out of bounds: " + i),
        visited: visited
    };
}

var instructions = h.read(8, "boot.txt").split(/\s+/);
var state1 = doRun(instructions);
h.print("part 1: ", state1.value, " (after ",state1.visited.length," instructions)");

var possibleFaultyInstructions = state1.visited.filter(i => ["jmp", "nop"].includes(instructions[i][0]));
h.print("possible faulty instructions: ", possibleFaultyInstructions.length);
var state2: State;
var faultyInstruction = -1;
for (const i of possibleFaultyInstructions) {
    var newInstructions = instructions.copy();
    newInstructions[i][0] = newInstructions[i][0] == "jmp" ? "nop" : "jmp";
    state2 = doRun(newInstructions);
    // h.print("fixing instruction ",i," => valid: ", state2.valid,", value: ", state2.value,", reason: ", state2.reason, ", (after ",state2.visited.length," instructions)");
    if (state2.valid) {
        faultyInstruction = i;
        break;
    }
}
h.print("part 2: ", state2!.value, " (fixed instruction ",faultyInstruction,", after ", state2!.visited.length," instructions)");