import * as h from '../helpers';
var [rulesRaw, messages] = h.read(19, "data.txt", "ex");
var rules = new Map<number, string>();
rulesRaw.match(/(\d+)\:\s+([^\n]+)/, true).map((r:string[]) => rules.set(+r[0], r[1]));

h.print(rules);
h.print(messages.slice(0,3));

// part 1
var getStringsFromRule = (rule:number, rules:Map<number,string>) : string[] => {
    var ruleString = rules.get(rule) + "";
    if (ruleString.startsWith('"')) return [ruleString.match(/\"([a-z]+)\"/)![1]];
    var parts = ruleString.split(' | ');
    var result: string[] = [];
    for (const part of parts) {
        var subRules = part.split(' ').tonum();
        var subStrings = subRules.map((r:number) => getStringsFromRule(r, rules));
        var subResult = subStrings.cartesianProduct();
        result = result.concat(subResult.map((r:string[]) => r.join('')));
    }
    return result;
}

h.print([['a', 'b'], ['c', 'd'], ['e','f']].cartesianProduct());