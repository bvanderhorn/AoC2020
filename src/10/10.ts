import * as h from '../helpers';
var adapters = h.read(10, "adapters.txt").tonum().sort((a,b) => a-b);
adapters.unshift(0);
adapters.push(adapters.last()+3);
h.print(adapters.printc(a => {
    var i = adapters.indexOf(a);
    return i == 0 || adapters[i+1] - a == 3 || a - adapters[i-1] == 3;
}, "r", ", "));
var diff = adapters.slice(1).map((a,i) => a - adapters[i]);
h.print("part 1: ",diff.count(1)*diff.count(3));