import * as h from '../helpers';
var adapters = h.read(10, "adapters.txt").tonum().sort((a,b) => a-b);
adapters.unshift(0);
adapters.push(adapters.last()+3);
var diff = adapters.slice(1).map((a,i) => a - adapters[i]);
h.print("part 1: ",diff.count(1)*diff.count(3));