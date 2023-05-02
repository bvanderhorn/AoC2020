import * as h from '../helpers';
var passwords = h.read(2, "passwords.txt").match(/(\d+)\-(\d+)\s+(\w+)\:\s+(\w+)/);
h.print(passwords[0]);