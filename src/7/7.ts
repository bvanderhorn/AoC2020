import * as h from '../helpers';
var rules = h.read(7, "rules.txt").split(/contains?/).split(",").replace(/bag.*$/,'').trim();
h.print(rules.slice(0,2));