import * as h from '../helpers';
var getContaining = (rule: string[][][]) : string => rule[0][0][1];
var getContained = (rule: string[][][]) : string[] => rule[1].map((r) => r[1]);
var rules = h.read(7, "rules.txt").split(/contains?/).split(",").replace(/bag.*$/,'').trim().match(/(\d+)?\s*(.*)\s*/, true);
h.print(h.stringify(rules.slice(0,2)));
h.print("containing: " ,getContaining(rules[1]), "contained: " ,getContained(rules[1]));