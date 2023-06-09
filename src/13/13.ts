import * as h from '../helpers';
var [rawt0, rawbuses] = h.read(13, "schedule.txt").split(',');
var t0 = +rawt0[0];
var buses = rawbuses.filter((b:string) => b != 'x').tonum();
h.print(t0, buses);
var firstBus = buses.map((b:number) => [b, b - (t0 % b)]).sort((a:number[], b:number[]) => a[1] - b[1])[0];
h.print("part 1: first bus is ", firstBus[0], " in ", firstBus[1], " minutes, answer is ", firstBus[0] * firstBus[1]);

// part 2
type Multiplier = {
    parents?: Multiplier[],
    Initial: number,
    Interval: number
}
var firstXMatches = (m1: Multiplier, m2: Multiplier, nofMatches: number) : number[][] => {
    var matches : number[][] = [];
    var n1 = 1;
    while(true) {
        var x = n1*m1.Interval + m1.Initial - m2.Initial;
        if (x % m2.Interval == 0) matches.push([n1, x/m2.Interval]);
        if (matches.length >= nofMatches) return matches;
        n1++;
    }
}
var checkMatches = (matches: number[][], m1: Multiplier, m2: Multiplier) : void => {
    matches.forEach(m => {
        var x1 = m[0]*m1.Interval + m1.Initial;
        var x2 = m[1]*m2.Interval + m2.Initial;
        h.print("check match", m, "with multipliers" , m1, ",", m2, ": => ", x1, x2, x1 == x2)
    });
}
var addToParents = (m: Multiplier) : Multiplier[] => (m.parents == null ? [] : m.parents).concat([{Initial: m.Initial, Interval: m.Interval}]);
var getAllowedMultipliers = (m1: Multiplier, m2: Multiplier) : Multiplier[] => {
    var matches = firstXMatches(m1, m2, 2);
    return [0,1].map(i => ({parents: i==0? addToParents(m1) : addToParents(m2), Initial: matches[0][i], Interval: matches[1][i] - matches[0][i]}));
}
var getReducedMultipliersOfFirst = (multipliers: Multiplier[]) : Multiplier[] => {
    var reducedMultipliers : Multiplier[] = [];
    for (const i of h.range(1, multipliers.length)) reducedMultipliers.push(getAllowedMultipliers(multipliers[0], multipliers[i])[0]);
    return reducedMultipliers.sort((a,b) => b.Interval - a.Interval);
}
var getNFromRemainingMultipliers = (multipliers: Multiplier[]) : number => {
    if (multipliers.length == 1) return multipliers[0].Initial;
    var reduced = getReducedMultipliersOfFirst(multipliers);
    var N = getNFromRemainingMultipliers(reduced);
    return N * multipliers[0].Interval + multipliers[0].Initial;
}

var buses2 : Multiplier[] = rawbuses.map((b,i) => [i,b]).filter(b => b[1] != 'x').map(b => ({Initial: -b[0], Interval: +b[1]})).sort((a,b) => b.Interval - a.Interval);
h.print(buses2);
var matches = firstXMatches(buses2[0], buses2[1], 3);
checkMatches(matches, buses2[0], buses2[1]);
var deltas = matches.slice(1).map((m,i) => [m[0] - matches[i][0], m[1] - matches[i][1]]);
h.print(deltas);
// h.print(h.stringify(getAllowedMultipliers(buses2[0], buses2[1])));
var reducedBuses = getReducedMultipliersOfFirst(buses2);
var evenMoreReducedBuses = getReducedMultipliersOfFirst(reducedBuses);
h.print(h.stringify(evenMoreReducedBuses));
h.print("part 2: ",getNFromRemainingMultipliers(buses2));