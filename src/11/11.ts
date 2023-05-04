import * as h from '../helpers';
var printSeats = (seats: number[][], sub: number[] | number = 0) => seats.mape(s => s == 0 ? "L" : s == 1 ? "#" : ".").printc(t => t == "#", "r", "", "\n", sub);
var seats: number[][] = h.read(11, "seats.txt").split('').mape(s => s == "L" ? 0 : s == "#" ? 1 : -1);

// part 1
var getSeatedAdjacent = (seats: number[][], y: number, x: number) : number => 
    h.getnb([y,x], seats.length-1, seats[0].length-1, '8').map(p => seats[p[0]][p[1]]).filter(s => s == 1).length;
var applyMove = (seats: number[][]) : number[][] =>  seats.mapij((y,x,s:number) => {
        var adj = getSeatedAdjacent(seats, y,x);
        return (s == 0 && adj == 0) ? 1 : (s == 1 && adj >= 4) ? 0 : s;
    });
var oldSeats = seats;
var newSeats = applyMove(seats);
var moves = 1;
while (!h.equals2(oldSeats, newSeats)) {
    moves++;
    oldSeats = newSeats;
    newSeats = applyMove(oldSeats);
}
printSeats(newSeats);
h.print("part 1: " + newSeats.flat().filter(s => s == 1).length, " occupied seats after ", moves, " moves");