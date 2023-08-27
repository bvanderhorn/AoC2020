import * as h from '../helpers';
var input = '389125467'.split('').tonum(); // example: 389125467, mine: 712643589

class State {
    private readonly _dict = new Map<number, number>;
    private readonly _part : number;
    private _curCup : number;

    public constructor(input: number[], curCup: number, part : number) {
        this._curCup = curCup;
        this._part = part;
        this.setDict(input);
    }

    public getNb(num : number) : number {
        // get right-neighbouring number: if not in dict, return num+1 (to allow for part 2)
        return this._dict.get(num) ?? num + 1;
    }

    public setNb(num : number, val : number) : void {
        this._dict.set(num, val);
    }

    public get curCup() : number {
        return this._curCup;
    }

    public set curCup(val : number) {
        this._curCup = val;
    }

    private setDict(input : number[]) : void {
        // set intermediate values
        for (const i of h.range(0,input.length-1)) {
            this._dict.set(input[i], input[i+1]);
        }
        if (this._part == 1) {
            // cyclic: last => first input value
            this._dict.set(input[input.length-1], input[0]);
        }
        else {
            // cyclic with 1E6 values: last => 10, 1E6 => first
            this._dict.set(input[input.length-1], input.length + 1);
            this._dict.set(1E6, input[0]);
        }
    }

    private getRightThree() : number[] {
        var rightThree : number[] = [];
        var cur = this._curCup;
        for (let i=0;i<3;i++) {
            cur = this.getNb(cur);
            rightThree.push(cur);
        }
        return rightThree;
    }

    private getDestination() : number {
        var max = (this._part == 1) ? 9 : 1E6;
        var rightThree = this.getRightThree();
        var destination = this._curCup == 1 ? max : this._curCup - 1;
        while (rightThree.includes(destination)) {
            destination = destination == 1 ? max : destination - 1;
        }
        return destination;
    }

    private move() : void {
        var destination = this.getDestination();
        var rightThree = this.getRightThree();

        var destinationNext = this.getNb(destination);
        var rightThreeNext = this.getNb(rightThree[2]);

        this.setNb(this._curCup, rightThreeNext);
        this.setNb(rightThree[2], destinationNext);
        this.setNb(destination, rightThree[0]);

        this._curCup = this.getNb(this._curCup);
    }

    public moves(n : number) : State {
        for (let i=0;i<n;i++) this.move();
        return this;
    }

    public printSolution() : void {
        if (this._part == 1) {
            var solution = '';
            var cur = 1;
            for (const i of h.range(1,input.length)) {
                cur = this.getNb(cur);
                solution += cur;
            }
            h.print('solution part 1:', solution);
        }
        else {
            var oneNext = this.getNb(1);
            var oneNextNext = this.getNb(oneNext);
            h.print('solution part 2:', oneNext, '*', oneNextNext, '=', oneNext*oneNextNext);
        }
    }

    public print() : void {
        h.print('cups:')
        h.print(this._dict)
        h.print('current cup:', this._curCup)
        h.print('right three:', this.getRightThree())
        h.print('destination:', this.getDestination())
    }
}

// execute
new State(input, input[0], 1).moves(100).printSolution();
new State(input, input[0], 2).moves(1E7).printSolution();