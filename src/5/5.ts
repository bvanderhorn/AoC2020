import * as h from '../helpers';
var getId = (s: string) : number => h.bin2dec(s.replace(/F|L/g, "0").replace(/B|R/g, "1"));
var seats = h.read(5, "seats.txt");
var ids = seats.map(getId);
h.print("part 1: " + ids.max());
h.print("part 2: " +  (ids.filter(s => !ids.includes(s+1) && ids.includes(s+2))[0]+1));