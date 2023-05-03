import * as h from '../helpers';
var rules = h.read(7, "rules.txt").split(/contains?/).split(",").replace(/bag.*$/,'').trim().match(/(\d+)?\s*(.*)\s*/, true);
h.print(h.stringify(rules.slice(0,2)));