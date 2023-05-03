import * as h from '../helpers';
var isValid = (numbers: number[], target: number, pre:number) : boolean => {
    if (target < pre) return true;
    var check = numbers.slice(target-pre, target);
    return check.map(i => check.map(j => i==j ? -1 : i+j)).flat().includes(numbers[target]);
}
var numbers = h.read(9, "numbers.txt").tonum();
h.print(numbers.slice(-10,-1));
for (const i of h.range(25, numbers.length)) {
    if (!isValid(numbers, i, 25)) {
        h.print("part 1: index ",i, ", value ", numbers[i]);
        break;
    }
}