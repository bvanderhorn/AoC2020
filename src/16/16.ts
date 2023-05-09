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
var validTickets = tickets.filter((t:number[]) => t.every((n:number) => h.isInIntervals(combinedIntervals,n)));
h.print(validTickets.length);