import * as h from '../helpers';
var printSeats = (seats: number[][], sub: number[] | number = 0) => seats.mape(s => s == 0 ? "L" : s == 1 ? "#" : ".").printc(t => t == "#", "r", "", "\n", sub);
var isDirectionOccupied = (seats: number[][], y: number, x: number, dir: number[]) : boolean => {
    var pos = [y,x];
    while (true) {
        pos = [pos[0]+dir[0], pos[1]+dir[1]];
        if (pos[0] < 0 || pos[0] >= seats.length || pos[1] < 0 || pos[1] >= seats[0].length) return false;
        if (seats[pos[0]][pos[1]] != -1) return seats[pos[0]][pos[1]] == 1;
    }
}
var getSeatedAdjacent = (seats: number[][], y: number, x: number, part: number) : number => {
    if (part == 1) return h.getnb([y,x], seats.length-1, seats[0].length-1, '8').map(p => seats[p[0]][p[1]]).filter(s => s == 1).length;
    var directions : number[][] = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
    return directions.map(d => +isDirectionOccupied(seats, y,x,d)).sum();
}
var applyMove = (seats: number[][], part: number) : number[][] =>  seats.mapij((y,x,s:number) => {
        var adj = getSeatedAdjacent(seats, y,x, part);
        return (s == 0 && adj == 0) ? 1 : (s == 1 && adj >= (part == 1 ? 4 : 5)) ? 0 : s;
    });
type State = {
    seats: number[][],
    moves: number
}
var getFinalState = (seats: number[][], part: number = 1) : State => {
    var oldSeats = seats;
    var newSeats = applyMove(seats, part);
    var moves = 1;
    while (!h.equals2(oldSeats, newSeats)) {
        moves++;
        oldSeats = newSeats;
        newSeats = applyMove(oldSeats, part);
    }
    return {seats: newSeats, moves: moves};
}

var seats: number[][] = h.read(11, "seats.txt").split('').mape(s => s == "L" ? 0 : s == "#" ? 1 : -1);

// part 1
var state1 = getFinalState(seats, 1);
printSeats(state1.seats);
h.print("part 1: ", state1.seats.flat().filter(s => s == 1).length, " occupied seats after ", state1.moves, " moves");

// part 2
var state2 = getFinalState(seats, 2);
h.print("");
printSeats(state2.seats);
h.print("part 2: ", state2.seats.flat().filter(s => s == 1).length, " occupied seats after ", state2.moves, " moves");