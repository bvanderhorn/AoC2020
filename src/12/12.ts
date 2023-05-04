import * as h from '../helpers';
var instructions = h.read(12, "instructions.txt").match(/(\w)(\d+)/, true);
h.print(instructions.slice(0,5));
var dirs = "NESW";
var vecs = [[-1, 0], [0, 1], [1, 0], [0, -1]];
var turns = "LR";
var turnvecs = [-1, 1];

// part 1
type State = {
    pos: number[],
    dir: string
}
var act = (state: State, instruction: string[]) : State => {
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
var state0 : State = {
    pos: [0,0],
    dir: "E"
}
var state = {pos: state0.pos, dir: state0.dir};
for (const instruction of instructions) {
    state = act(state, instruction);
}
h.print("part 1: ", state.pos.manhattan().sum());

// part 2
type State2 = {
    pos: number[],
    waypoint: number[]
}
var rotate = (waypoint: number[], turns: number) : number[] => {
    var w = waypoint;
    for (let i = 0; i < Math.abs(turns); i++) {
        w = turns >= 0 ? [w[1], -w[0]] : [-w[1], w[0]];
    }
    return w;
}
var act2 = (state: State2, instruction: string[]) : State2 => {
    var op = instruction[0];
    var val = +instruction[1];
    return {
        pos: op == "F" ? state.pos.plusEach(state.waypoint.times(val)) : state.pos,
        waypoint: dirs.includes(op) 
            ? state.waypoint.plusEach(vecs[dirs.indexOf(op)].times(val)) 
            : op == "F" 
                ? state.waypoint 
                : rotate(state.waypoint,turnvecs[turns.indexOf(op)]*val/90)
    }
}
var state0_2 : State2 = {
    pos: [0,0],
    waypoint: [-1, 10]
}
var state2 = {pos: state0_2.pos, waypoint: state0_2.waypoint};
for (const instruction of instructions) {
    state2 = act2(state2, instruction);
}
h.print("part 2: ", state2.pos.manhattan().sum());