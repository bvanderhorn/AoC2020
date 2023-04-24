import * as h from '../helpers';
var expenses = h.read(1, "expenses.txt");
h.print(expenses.slice(0,10));