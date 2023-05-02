import * as h from '../helpers';
var answers = h.read(6, "answers.txt");
h.print("part 1: " + answers.map(g => g.join('').split('').unique().length).sum());
h.print("part 2: " + answers.split('').map(g => g.presentInAll().length).sum());