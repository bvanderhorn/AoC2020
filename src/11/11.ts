import * as h from '../helpers';
var printSeats = (seats: number[][], sub: number[] | number = 0) => seats.mape(s => s == 0 ? "L" : s == 1 ? "#" : ".").printc(t => t == "#", "r", "", "\n", sub);
var seats: number[][] = h.read(11, "seats.txt").split('').mape(s => s == "L" ? 0 : s == "#" ? 1 : -1);
printSeats(seats, [10, 10]);
