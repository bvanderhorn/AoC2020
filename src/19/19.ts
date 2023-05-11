import * as h from '../helpers';
var [rulesRaw, messages] = h.read(19, "data.txt");
var rules = new Map<number, string>();
rulesRaw.match(/(\d+)\:\s+([^\n]+)/, true).map((r:string[]) => rules.set(+r[0], r[1]));
// h.print(messages.slice(0,3));

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

var strings = getStringsFromRule(0, rules);
h.print("part 1:", messages.filter((m:string) => strings.includes(m)).length);

// part 2
var s42 = getStringsFromRule(42, rules);
var s31 = getStringsFromRule(31, rules);
h.print("42:",s42.length,"\n",s42);
h.print(s42.map((s:string) => s.length).unique());
h.print("31:",s31.length,"\n",s31);
h.print(s31.map((s:string) => s.length).unique());

// ^^ 42 and 31 are all 8 chars long
var potentialMessages = messages.filter((m:string) => m.length % 8 == 0);
