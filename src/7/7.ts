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
var remaining = [checkBag];
while (remaining.length > 0 ) {
    var current = remaining.shift();
    var containedCurrent = rules.filter((r) => getContaining(r) == current).map((r) => getContained(r))[0];
    contained += containedCurrent.map((r) => parseInt(r[0])).sum();
    remaining = remaining.concat(containedCurrent.map((r) => r[1]));
}
h.print("part 2: ", contained);