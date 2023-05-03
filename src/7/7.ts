import * as h from '../helpers';
var getContaining = (rule: string[][][]) : string => rule[0][0][1];
var getContained = (rule: string[][][]) : string[] => rule[1].map((r) => r[1]);
var rules = h.read(7, "rules.txt").split(/contains?/).split(",").replace(/bag.*$/,'').trim().match(/(\d+)?\s*(.*)\s*/, true);
h.print(h.stringify(rules.slice(0,2)));
h.print("containing: " ,getContaining(rules[1]), "contained: " ,getContained(rules[1]));
var checkBag = "shiny gold";
var contained: string[] = [];
var remaining = [checkBag];
while (remaining.length > 0 ) {
    var current = remaining.shift();
    var containing = rules.filter((r) => getContained(r).includes(current!)).map((r) => getContaining(r));
    contained = contained.concat(containing);
    remaining = remaining.concat(containing);
}
h.print("part 1: ", contained.unique().length);