import * as h from '../helpers';
var decks = h.read(22, 'decks.txt').map(d => d.slice(1)).tonum();
h.print(decks);

// part 1
var deck1 = decks[0].copy();
var deck2 = decks[1].copy();
while (deck1.length > 0 && deck2.length > 0) {
    var card1 = deck1.shift();
    var card2 = deck2.shift();
    if (card1 > card2) deck1.push(card1, card2);
    else deck2.push(card2, card1);
}
var winner = deck1.length > 0 ? deck1 : deck2;
h.print(winner);
h.print("part 1:", [winner.reverse(), h.range(1, winner.length+1)].prod0().sum());