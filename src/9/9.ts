import * as h from '../helpers';
var isValid = (numbers: number[], target: number, pre:number) : boolean => {
    if (target < pre) return true;
    var check = numbers.slice(target-pre, target);
    return check.map(i => check.map(j => i==j ? -1 : i+j)).flat().includes(numbers[target]);
}
var numbers = h.read(9, "numbers.txt").tonum();

// part 1
h.print(numbers.slice(-10,-1));
var invalidIndex = -1;
for (const i of h.range(25, numbers.length)) {
    if (!isValid(numbers, i, 25)) {
        h.print("part 1: index ",i, ", value ", numbers[i]);
        invalidIndex = i;
        break;
    }
}

// part 2
for (const i of h.range(0, numbers.length)) {
    var sum = numbers[i];
    var j = i+1;
    while (sum < numbers[invalidIndex]) {
        sum += numbers[j];
        j++;
    }
    if (sum == numbers[invalidIndex]) {
        h.print("part 2: indices ",i, " through ",j-1,": min value ", numbers.slice(i,j).min(), " + max value ",numbers.slice(i,j).max(), " = ", (numbers.slice(i,j).min() + numbers.slice(i,j).max()));
        break;
    }
}