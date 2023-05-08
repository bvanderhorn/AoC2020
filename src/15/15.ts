import * as h from '../helpers';
var part = 2;
var numbers = h.read(15, "numbers.txt")[0].split(',').map((n:string) => +n);
var spoken = new Map<number, number>();
numbers.slice(0, numbers.length-1).map((n:number,i:number) => spoken.set(n, i));
var last = numbers[numbers.length-1];
for (const i of h.range(numbers.length, part == 1 ? 2020 : 30000000)) {
    h.progress(i, 30000000, 100);
    var previous = spoken.get(last);
    spoken.set(last, i-1);
    if (previous === undefined) last = 0;
    else last= i-1- previous;
}
h.print("part ",part,": ", last);