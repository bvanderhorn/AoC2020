import * as h from '../helpers';
var [rulesRaw, messages] = h.read(19, "data.txt");
var rules = rulesRaw.match(/(\d+)\:\s+([^\n]+)/, true);

h.print(rules.slice(0,3));
h.print(messages.slice(0,3));