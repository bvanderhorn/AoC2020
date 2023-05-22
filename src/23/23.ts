import * as h from '../helpers';
var input = '712643589'.split('').tonum();
var applyMove = (input:number[], curCup:number) => {
    var pickUp : number[] = [];
    for (let i=1;i<=3;i++) {
        const curIndex = input.findIndex(el => el == curCup);
        pickUp.push(...input.splice((curIndex+1)%input.length,1));
    }
    h.print('pick up:', pickUp.join(', '));
    const sortedInput = input.copy().sort();
    const destination = sortedInput.filter(el => el > curCup).concat(sortedInput.filter(el => el < curCup)).reverse()[0];
    h.print('destination:', destination);
    const destinationIndex = input.findIndex(el => el == destination);
    h.print('destination index:', destinationIndex);
    input.splice(destinationIndex+1,0,...pickUp);
    return input;
}

// part 1
var rounds = 100;
var curCup:number = input[0];
for (let i=0;i<rounds;i++) {
    h.print('--- move', i+1, '---');
    h.print('cups:', input.map(el => el == curCup ? '('+el+')' : el).join(' '));
    input = applyMove(input, curCup);
    curCup = input.get(input.findIndex(el => el == curCup)+1);
}
h.print("part 1:",input.join('').split('1').reverse().join(''));