import * as h from '../helpers';
var expenses = h.read(1, "expenses.txt").tonum();
expenses.map((e1, i1) => expenses.slice(i1+1).map((e2, _) => e1 + e2 == 2020 ? h.print(e1 * e2) : null));