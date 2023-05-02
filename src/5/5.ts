import * as h from '../helpers';
var getId = (s: string) : number => h.bin2dec(s.replace(/F|L/g, "0").replace(/B|R/g, "1"), 2);
var seats = h.read(5, "seats.txt");
h.print("part 1: " + seats.map(getId).max());