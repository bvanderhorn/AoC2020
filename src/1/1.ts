import * as h from '../helpers';
var expenses = h.read(1, "expenses.txt").tonum();
expenses.map((e1, i1) => expenses.slice(i1+1).map((e2, i2 ) => e1 + e2 == 2020 ? h.print("part 1: " + (e1 * e2)) : expenses.slice(i2+1).map(e3 => e1 + e2 + e3 == 2020 ? h.print("part 2: " + (e1 * e2 * e3)) : null)));