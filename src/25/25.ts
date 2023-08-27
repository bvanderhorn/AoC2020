import * as h from '../helpers';

var divider = 20201227;
var transform = (subject: number, loopsize: number) : number => {
    var value = 1;
    for (const i of h.range(0, loopsize)) {
        value *= subject;
        value %= divider;
    }
    return value;
}

var loops7 = () : h.MultiMap<number, number> => {
    var subject = 7;
    var value = 1;
    var loops = new h.MultiMap<number, number>();
    loops.set(value, 0);

    for (const i of h.range(1, divider + 1)) {
        value *= subject;
        value %= divider;
        if (loops.has(value)) break;
        loops.set(value, i);
    };
    
    return loops;
}

// execute
console.time("day 25");
var keys = h.read(25, "publickeys.txt").tonum();
var loopSet = loops7();
h.print('loops size:',loopSet.size());
var loops = keys.map(k => loopSet.get(k)?? -1);
var secrets = keys.map((k,i) => transform(k, loops[1-i]));
console.timeEnd("day 25");

h.print("part 1:", secrets);
