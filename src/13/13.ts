import * as h from '../helpers';
var [rawt0, rawbuses] = h.read(13, "schedule.txt").split(',');
var t0 = +rawt0[0];
var buses = rawbuses.filter((b:string) => b != 'x').tonum();
h.print(t0, buses);
var firstBus = buses.map((b:number) => [b, b - (t0 % b)]).sort((a:number[], b:number[]) => a[1] - b[1])[0];
h.print("part 1: first bus is ", firstBus[0], " in ", firstBus[1], " minutes, answer is ", firstBus[0] * firstBus[1]);

// part 2
var buses2 : number[][] = rawbuses.map((b,i) => [i,b]).filter(b => b[1] != 'x').map(b => [b[0], +b[1]]);
h.print(buses2);