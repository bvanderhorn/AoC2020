import * as h from '../helpers';
type State = {
    input: number[],
    curCup: number,
    leftNext: number,
    rightNext: number
}
var input = '712643589'.split('').tonum();
var getDestination = (state: State) : number => {
    var destination = state.curCup;
    while (true) {
        destination--;
        if (part == 1) {
            if (destination < state.input.min()) return state.input.max();
            if (state.input.includes(destination)) return destination;
        } else {
            if (destination < state.input.min()) {
                if (state.input.max() < state.leftNext) {
                    state.input.unshift(state.leftNext);
                    h.printVerbose(v,'added', state.leftNext, 'to LEFT of input: ', state.input);
                    return state.leftNext--;
                } else {
                    return state.input.max();
                }
            } else {
                if (state.input.includes(destination)) return destination;
            }
        }
        
    }
}
var applyMove = (state: State): State => {
    var pickUp : number[] = [];
    var iLength = state.input.length;
    for (let i=1;i<=3;i++) {
        const curIndex = state.input.findIndex(el => el == state.curCup);
        var push = (part == 1 || curIndex < state.input.length -1) ? state.input.splice((curIndex+1)%state.input.length,1)[0] : iLength++; 
        pickUp.push(push);
    }
    h.printVerbose(v,'pick up:', pickUp.join(', '));
    var destination = getDestination(state);
    h.printVerbose(v,'destination:', destination);
    //h.print(' new state:', JSON.stringify(state));
    const destinationIndex = state.input.findIndex(el => el == destination);
    h.printVerbose(v,'destination index:', destinationIndex);
    state.input.splice(destinationIndex+1,0,...pickUp);
    //h.print(' end of move state:', JSON.stringify(state));

    return state;
}

// part 1
var part = 2;
var v = false;
var rounds = 1000;
var initialState : State = {
    input: input,
    curCup: input[0],
    leftNext: 1000000,
    rightNext: 10
}
var state = {
    input: initialState.input.copy(),
    curCup: initialState.curCup,
    leftNext: initialState.leftNext,
    rightNext: initialState.rightNext
}
for (let i=0;i<rounds;i++) {
    h.progress(i, rounds, 10);
    h.printVerbose(v,'--- move', i+1, '---');
    h.printVerbose(v,'cups:', state.input.map(el => el == state.curCup ? '('+el+')' : el).join(' '));
    state = applyMove(state);
    state.curCup = state.input.get(state.input.findIndex((el:number) => el == state.curCup)+1);
}
h.print('--- final state: ', JSON.stringify(state));
if (part == 1) h.print("part 1:",state.input.join('').split('1').reverse().join(''));
else h.print("part 2:", state.input[state.input.findIndex(el => el == 1)+1] * state.input[state.input.findIndex(el => el == 1)+2]);