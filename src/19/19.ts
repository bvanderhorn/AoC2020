import * as h from '../helpers';
var [rulesRaw, messages] = h.read(19, "data.txt", "ex");
var rules = new Map<number, string>();
rulesRaw.match(/(\d+)\:\s+([^\n]+)/, true).map((r:string[]) => rules.set(+r[0], r[1]));

h.print(rules);
h.print(messages.slice(0,3));