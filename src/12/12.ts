import * as h from '../helpers';
type State = {
    pos: number[],
    dir: string
}
var act = (state: State, instruction: string[]) : State => {
    
}
var instructions = h.read(12, "instructions.txt").match(/(\w)(\d+)/, true);
h.print(instructions.slice(0,5));

var dirs = "NESW";
var vecs = [[-1, 0], [0, 1], [1, 0], [0, -1]];
var dir = "E";
var pos = [0,0];
