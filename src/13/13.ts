import * as h from '../helpers';
var [rawt0, rawbuses] = h.read(13, "schedule.txt").split(',');
var t0 = +rawt0[0];
var buses = rawbuses.filter((b:string) => b != 'x').tonum();
h.print(t0, buses);
var firstBus = buses.map((b:number) => [b, b - (t0 % b)]).sort((a:number[], b:number[]) => a[1] - b[1])[0];
h.print("part 1: first bus is ", firstBus[0], " in ", firstBus[1], " minutes, answer is ", firstBus[0] * firstBus[1]);

// part 2
type Multiplier = {
    bus: number[],
    Initial: number,
    Interval: number
}
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
var getAllowedMultipliers = (bus1: number[], bus2: number[]) : Multiplier[] => {
    var matches = firstXMatches(bus1, bus2, 2);
    return [0,1].map(i => ({bus: i==0? bus1 : bus2, Initial: matches[0][i], Interval: matches[1][i] - matches[0][i]}));
}
var getAllMultiplierCouples = (buses: number[][]) : Multiplier[] => {
    var multipliers : Multiplier[] = [];
    for (const i of h.range(0, buses.length -1)) multipliers.push(...getAllowedMultipliers(buses[i], buses[i+1]));
    return multipliers;
}
var buses2 : number[][] = rawbuses.map((b,i) => [i,b]).filter(b => b[1] != 'x').map(b => [b[0], +b[1]]).sort((a,b) => b[1] - a[1]);
h.print(buses2);
var matches = firstXMatches(buses2[0], buses2[1], 3);
checkMatches(matches, buses2[0], buses2[1]);
var deltas = matches.slice(1).map((m,i) => [m[0] - matches[i][0], m[1] - matches[i][1]]);
h.print(deltas);
// h.print(h.stringify(getAllowedMultipliers(buses2[0], buses2[1])));
h.print(h.stringify(getAllMultiplierCouples(buses2)));