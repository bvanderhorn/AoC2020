import * as h from '../helpers';
var [rawt0, rawbuses] = h.read(13, "schedule.txt").split(',');
var t0 = +rawt0[0];
var buses = rawbuses.filter((b:string) => b != 'x').tonum();
h.print(t0, buses);
var firstBus = buses.map((b:number) => [b, b - (t0 % b)]).sort((a:number[], b:number[]) => a[1] - b[1])[0];
h.print("part 1: first bus is ", firstBus[0], " in ", firstBus[1], " minutes, answer is ", firstBus[0] * firstBus[1]);

// part 2
var firstXMatches = (bus1: number[], bus2: number[], nofMatches: number) : number[][] => {
    var matches : number[][] = [];
    var n1 = 1;
    while(true) {
        var x = n1*bus1[1] - bus1[0] + bus2[0];
        if (x % bus2[1] == 0) matches.push([n1, x/bus2[1]]);
        if (matches.length >= nofMatches) return matches;
        n1++;
    }
}
var checkMatches = (matches: number[][], bus1: number[], bus2: number[]) : void => {
    matches.forEach(m => {
        var x1 = m[0]*bus1[1] - bus1[0];
        var x2 = m[1]*bus2[1] - bus2[0];
        h.print("check match", m, "with buses" , bus1, ",", bus2, ": => ", x1, x2, x1 == x2)
    });
}
var buses2 : number[][] = rawbuses.map((b,i) => [i,b]).filter(b => b[1] != 'x').map(b => [b[0], +b[1]]).sort((a,b) => b[1] - a[1]);
h.print(buses2);
var matches = firstXMatches(buses2[0], buses2[1], 10);
checkMatches(matches, buses2[0], buses2[1]);
var deltas = matches.slice(1).map((m,i) => [m[0] - matches[i][0], m[1] - matches[i][1]]);
h.print(deltas);