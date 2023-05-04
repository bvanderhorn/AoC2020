import * as h from '../helpers';
var [t0, buses] = h.read(13, "schedule.txt");
buses = buses.split(',').filter((b:string) => b != 'x').tonum();
h.print(t0, buses);
var firstBus = buses.map((b:number) => [b, b - (t0 % b)]).sort((a:number[], b:number[]) => a[1] - b[1])[0];
h.print("part 1: first bus is ", firstBus[0], " in ", firstBus[1], " minutes, answer is ", firstBus[0] * firstBus[1]);