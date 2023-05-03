import * as h from '../helpers';
var numbers = h.read(9, "numbers.txt").tonum();
h.print(numbers.slice(-10,-1));