import * as h from '../helpers';
var occurs = (s: string, sub:string) : number => (s.match(new RegExp(sub, "g")) || []).length;
var passwords = h.read(2, "passwords.txt").match(/(\d+)\-(\d+)\s+(\w+)\:\s+(\w+)/);
var valid = passwords.map(pw => +(occurs(pw[4], pw[3]) >= pw[1] && occurs(pw[4], pw[3]) <= pw[2])).sum();
h.print(valid);