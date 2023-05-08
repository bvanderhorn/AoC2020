import * as h from '../helpers';
type Spoken = {
    number: number,
    indices: number[]
}
var numbers = h.read(15, "numbers.txt")[0].split(',').map((n:string) => +n);
var spoken : Spoken[] = numbers.slice(0, numbers.length-1).map((n:number,i:number) => ({number: n, indices: [i]}));
var last = numbers[numbers.length-1];
var inOrder = numbers;
for (const i of h.range(numbers.length, 2020)) {
    var lastSpoken = spoken.find(s => s.number == last);
    if (lastSpoken === undefined) {
        spoken.push({number: last, indices: [i-1]});
        last = 0;
    } else {
        lastSpoken.indices.push(i-1);
        last = lastSpoken.indices[lastSpoken.indices.length-1] - lastSpoken.indices[lastSpoken.indices.length-2];
    }
    inOrder.push(last);
}

h.print("part 1: ", inOrder[2019]);
h.write(15, 'spokenInOrder.txt', inOrder.join('\n'));
var zeroIndices = spoken.find(s => s.number == 0)!.indices;
h.write(15, 'zeroIndices.txt', zeroIndices!.slice(1).map((x, i) => x - zeroIndices![i]).join('\n'));