import * as h from '../helpers';
var playGame = (decks: number[][]) : number[][] => {
    var [deck1, deck2] = decks.copy();
    var seen = new Set<string>();
    while (deck1.length > 0 && deck2.length > 0) {
        if (part == 2 && seen.has(deck1.join(',') + '|' + deck2.join(','))) return [deck1, []];
        seen.add(deck1.join(',') + '|' + deck2.join(','));
        var card1 = deck1.shift();
        var card2 = deck2.shift();

        if (part == 2 && deck1.length >= card1 && deck2.length >= card2) {
            var result = playGame([deck1.slice(0,card1), deck2.slice(0,card2)]);
            if (result[0].length > 0) deck1.push(card1, card2);
            else deck2.push(card2, card1);
        } else {
            if (card1 > card2) deck1.push(card1, card2);
            else deck2.push(card2, card1);
        }
    }
    return [deck1, deck2];
} 
var decks = h.read(22, 'decks.txt').map(d => d.slice(1)).tonum();
h.print(decks);

var part = 2;
var result = playGame(decks);
var winner = result[0].length > 0 ? result[0] : result[1];
h.print(winner);
h.print("part ",part,":", [winner.reverse(), h.range(1, winner.length+1)].prod0().sum());
