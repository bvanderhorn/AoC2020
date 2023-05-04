import * as h from '../helpers';
type State = {
    pos: number[],
    dir: string
}
var act = (state: State, instruction: string[]) : State => {
    var dirs = "NESW";
    var vecs = [[-1, 0], [0, 1], [1, 0], [0, -1]];
    var turns = "LR";
    var turnvecs = [-1, 1];
    var op = instruction[0];
    var val = +instruction[1];
    return {
        pos: dirs.includes(op) 
            ? state.pos.plusEach(vecs[dirs.indexOf(op)].times(val)) 
            : op == "F" 
                ? state.pos.plusEach(vecs[dirs.indexOf(state.dir)].times(val)) 
                : state.pos,
        dir: turns.includes(op) ? dirs.get(dirs.indexOf(state.dir) + turnvecs[turns.indexOf(op)]*val/90 ) : state.dir
    }
}
var instructions = h.read(12, "instructions.txt").match(/(\w)(\d+)/, true);
h.print(instructions.slice(0,5));

var state0 : State = {
    pos: [0,0],
    dir: "E"
}
var state = {pos: state0.pos, dir: state0.dir};
for (const instruction of instructions) {
    state = act(state, instruction);
}
h.print("part 1: ", state.pos.manhattan().sum());