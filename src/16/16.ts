import * as h from '../helpers';
var [rulesRaw, myTicketRaw, ticketsRaw] = h.read(16, "scan.txt");
var rules = rulesRaw.match(/([^\:]+)\:\s+(\d+\-\d+) or (\d+\-\d+)/, true);
var myTicket = myTicketRaw[1].split(',').tonum();
var tickets = ticketsRaw.slice(1).split(',').tonum();

h.print(rules);
h.print(myTicket);
h.print(tickets.slice(0,2));

// part 1
var allIntervals = rules.map((r:string[]) => r.slice(1)).split('-').tonum().flat();
var combinedIntervals = h.mergeIntervals(allIntervals);
h.print(combinedIntervals);
h.print("part 1:", tickets.flat().filter((n:number) => !h.isInIntervals(combinedIntervals,n)).sum());

// part 2
var validFields = (tickets: number[][], rule: string[]) => {
    var intervals = rule.slice(1).split('-').tonum();
    return tickets[0].map((_,i) => tickets.map((t:number[]) => t[i]).every((n:number) => h.isInIntervals(intervals,n)) ? i : -1).filter((n:number) => n != -1);
}
var validTickets = tickets.filter((t:number[]) => t.every((n:number) => h.isInIntervals(combinedIntervals,n)));
h.print(validTickets.length);
var possibleFields = rules.map((r:string[]) => validFields(validTickets,r));
h.print(possibleFields.map((x:number[]) => JSON.stringify(x)));
var solved = h.simpleSolve(possibleFields);
h.print(solved);
h.print("all solved:", solved.every((n:number) => n != -1));
var departureFields = solved.filter((_,i) => rules[i][0].startsWith("departure"));
h.print("part 2:", departureFields.map((i:number) => myTicket[i]).prod());