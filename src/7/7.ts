import * as h from '../helpers';
var getContaining = (rule: string[][][]) : string => rule[0][0][1];
var getContained = (rule: string[][][]) : string[][] => rule[1].filter((r) => r[1] != "no other");
var rules = h.read(7, "rules.txt").split(/contains?/).split(",").replace(/bag.*$/,'').trim().match(/(\d+)?\s*(.*)\s*/, true);
h.print(h.stringify(rules.slice(0,2)));
h.print("containing: " ,getContaining(rules[1]), "contained: " ,getContained(rules[1]));
var checkBag = "shiny gold";

// part 1
var containing: string[] = [];
var remaining = [checkBag];
while (remaining.length > 0 ) {
    var current = remaining.shift();
    var containingCurrent = rules.filter((r) => getContained(r).map(c => c[1]).includes(current!)).map((r) => getContaining(r));
    containing = containing.concat(containingCurrent);
    remaining = remaining.concat(containingCurrent);
}
h.print("part 1: ", containing.unique().length);

// part 2
var contained : number = 0;
type Bag = {
    name: string,
    multiplier : number
}
var remaining2 : Bag[] = [{
    name: checkBag,
    multiplier: 1
}];
while (remaining2.length > 0 ) {
    var currentBag = remaining2.shift();
    var containedCurrent = rules.filter((r) => getContaining(r) == currentBag!.name).map((r) => getContained(r))[0];
    contained += containedCurrent.map((r) => parseInt(r[0])).sum()*currentBag!.multiplier;
    remaining2 = remaining2.concat(containedCurrent.map((r) => {
        return {
            name: r[1],
            multiplier: parseInt(r[0])*currentBag!.multiplier
        };
    }));
}
h.print("part 2: ", contained);