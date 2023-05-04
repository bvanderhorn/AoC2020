import * as h from '../helpers';
var instructions = h.read(12, "instructions.txt").match(/(\w)(\d+)/, true);
h.print(instructions.slice(0,5));