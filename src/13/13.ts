import * as h from '../helpers';
var [t0, buses] = h.read(13, "schedule.txt");
buses = buses.split(',').filter((b:string) => b != 'x').tonum();
h.print(t0, buses);