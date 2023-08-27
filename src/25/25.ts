import * as h from '../helpers';

var transform = (subject: number, loopsize: number) : number => {
    var value = 1;
    for (const i of h.range(0, loopsize)) {
        value *= subject;
        value %= 20201227;
    }
    return value;
}

var loops7 = (max: number = 100000000) : Map<number, number> => {
    var subject = 7;
    var value = 1;
    var loops = new Map<number, number>();
    loops.set(value, 0);

    for (const i of h.range(1, max)) {
        value *= subject;
        value %= 20201227;
        if (loops.has(value)) break;
        loops.set(value, i);
    };
    
    return loops;
}

// execute
var keys = h.read(25, "publickeys.txt").tonum();
var loopSet = loops7(1E7);
var loops = keys.map(k => loopSet.get(k)?? -1);
var secrets = keys.map((k,i) => transform(k, loops[1-i]));

h.print("part 1:", secrets);