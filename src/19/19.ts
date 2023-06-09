import * as h from '../helpers';
var [rulesRaw, messages] = h.read(19, "data.txt");
var rules = new Map<number, string>();
rulesRaw.match(/(\d+)\:\s+([^\n]+)/, true).map((r:string[]) => rules.set(+r[0], r[1]));

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

// var strings = getStringsFromRule(0, rules);
// h.print("part 1:", messages.filter((m:string) => strings.includes(m)).length);

// new way
// 0 = 8 11 = 42 42 31 (pt1) = 42^N1 42^N2 31^N2 (pt2)
var s42 = getStringsFromRule(42, rules);
var s31 = getStringsFromRule(31, rules);
h.print("42:",s42.length,", lengths:",s42.map((s:string) => s.length).unique());
h.print("31:",s31.length,", lengths:",s31.map((s:string) => s.length).unique());

// ^^ 42 and 31 are all 8 chars long
var potentialMessages = messages.filter((m:string) => m.length % 8 == 0).filter((m:string) => m.length/8 >= 3);
h.print("part 1:", potentialMessages.filter((m:string) => 
    m.length/8 == 3 && 
    s42.includes(m.slice(0,8)) && 
    s42.includes(m.slice(8,16)) && 
    s31.includes(m.slice(16)) ).length);
h.print("part 2:", potentialMessages.filter((m:string) => {
    var m2 = m.match(/.{1,8}/g)!;
    // count s42 starts and s31 ends
    var s42Count = 0;
    var s31Count = 0;
    while (m2.length > 0) {
        var s = m2.shift()!;
        if (s42.includes(s)) {
            s42Count++;
            if (s31Count > 0) return false;
        }
        else if (s31.includes(s)) s31Count++;
        else return false;
    }
    return s31Count < s42Count && s31Count > 0;
}).length);